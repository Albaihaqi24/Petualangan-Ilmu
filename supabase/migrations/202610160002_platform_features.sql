-- Tahap 4–8: jalankan setelah 202610160001_initial_schema.sql.
begin;

alter table public.submissions add column file_path text;
alter table public.classes drop constraint classes_tutor_id_fkey;
alter table public.classes add constraint classes_tutor_id_fkey foreign key (tutor_id) references public.profiles(id) on delete cascade;

create table private.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null, target_id uuid, created_at timestamptz not null default now()
);
create table private.join_attempts (
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index join_attempts_student_time_idx on private.join_attempts(student_id, created_at);
create table private.import_batches (
  id uuid primary key, actor_id uuid not null references public.profiles(id) on delete cascade,
  imported_count integer not null, created_at timestamptz not null default now()
);
create table public.account_deletion_requests (
  student_id uuid primary key references public.profiles(id) on delete cascade,
  requested_at timestamptz not null default now(),
  status text not null default 'pending' check(status in ('pending','processing','completed'))
);
alter table private.audit_events enable row level security;
alter table private.join_attempts enable row level security;
alter table private.import_batches enable row level security;
alter table public.account_deletion_requests enable row level security;
revoke all on private.audit_events, private.join_attempts, private.import_batches, public.account_deletion_requests from public, anon, authenticated;
grant select on public.account_deletion_requests to authenticated;
create policy deletion_requests_read on public.account_deletion_requests for select to authenticated
  using(student_id=(select auth.uid()) or (select private.my_role())='admin');

create function private.log_event(p_action text, p_target uuid) returns void
language sql security definer set search_path='' as $$
  insert into private.audit_events(actor_id,action,target_id) values(auth.uid(),p_action,p_target)
$$;

create function public.create_class(p_name text,p_grade integer) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_class public.classes; v_code text; v_try integer;
begin
  if auth.uid() is null or private.my_role() is distinct from 'tutor' then raise exception 'Akses tutor diperlukan'; end if;
  if p_name is null or length(btrim(p_name)) not between 1 and 80 or p_grade is null or p_grade not between 1 and 6 then raise exception 'Nama dan tingkat kelas tidak valid'; end if;
  perform 1 from public.profiles where id=auth.uid() for update;
  if (select count(*) from public.classes where tutor_id=auth.uid())>=100 then raise exception 'Batas jumlah kelas tercapai'; end if;
  for v_try in 1..10 loop
    v_code:=upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
    insert into public.classes(tutor_id,name,grade,join_code) values(auth.uid(),btrim(p_name),p_grade,v_code)
      on conflict(join_code) do nothing returning * into v_class;
    if v_class.id is not null then
      perform private.log_event('class.created',v_class.id);
      return to_jsonb(v_class);
    end if;
  end loop;
  raise exception 'Kode kelas belum dapat dibuat. Coba lagi';
end $$;

-- Kesalahan kode dikembalikan sebagai JSON agar percobaan gagal tetap tercatat.
create function public.join_class(p_code text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_class public.classes; v_grade integer;
begin
  if auth.uid() is null or private.my_role() is distinct from 'student' then raise exception 'Akses siswa diperlukan'; end if;
  select grade into v_grade from public.profiles where id=auth.uid() for update;
  if (select count(*) from private.join_attempts where student_id=auth.uid() and created_at>now()-interval '1 hour')>=10 then return jsonb_build_object('ok',false,'message','Batas percobaan kode tercapai. Coba lagi nanti'); end if;
  insert into private.join_attempts(student_id) values(auth.uid());
  select * into v_class from public.classes where join_code=upper(btrim(p_code));
  if not found then return jsonb_build_object('ok',false,'message','Kode kelas tidak ditemukan'); end if;
  if v_class.grade<>v_grade then return jsonb_build_object('ok',false,'message','Tingkat kelas belum sesuai dengan profilmu'); end if;
  insert into public.class_members(class_id,student_id) values(v_class.id,auth.uid()) on conflict do nothing;
  return jsonb_build_object('ok',true,'classroom',to_jsonb(v_class));
end $$;

create function public.create_assignment(p_class_id uuid,p_lesson_id uuid,p_title text,p_instructions text,p_due_at timestamptz) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_assignment public.assignments; v_grade integer;
begin
  if private.my_role() is distinct from 'tutor' or not private.owns_class(p_class_id) then raise exception 'Kelas tidak tersedia untuk tutor ini'; end if;
  select grade into v_grade from public.classes where id=p_class_id;
  if not exists(select 1 from public.lessons where id=p_lesson_id and grade=v_grade and status='published') then raise exception 'Pilih materi published dengan tingkat yang sama'; end if;
  if p_due_at is null or p_due_at<=now() then raise exception 'Tenggat harus berada di masa depan'; end if;
  insert into public.assignments(class_id,lesson_id,title,instructions,due_at)
    values(p_class_id,p_lesson_id,btrim(p_title),btrim(p_instructions),p_due_at) returning * into v_assignment;
  perform private.log_event('assignment.created',v_assignment.id);
  return to_jsonb(v_assignment);
end $$;

create function public.submit_assignment(p_assignment_id uuid,p_answer text,p_file_path text default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_assignment public.assignments; v_submission public.submissions;
begin
  if auth.uid() is null or private.my_role() is distinct from 'student' then raise exception 'Akses siswa diperlukan'; end if;
  perform 1 from public.profiles where id=auth.uid() for update;
  select * into v_assignment from public.assignments where id=p_assignment_id;
  if not found or not private.is_member(v_assignment.class_id) then raise exception 'Gabung kelas terlebih dahulu'; end if;
  if v_assignment.due_at<now() then raise exception 'Tenggat tugas sudah lewat'; end if;
  if p_file_path is not null and (split_part(p_file_path,'/',1)<>auth.uid()::text or split_part(p_file_path,'/',2)<>p_assignment_id::text or p_file_path like '%..%' or p_file_path !~ '^[a-zA-Z0-9/-]+\.(pdf|png|jpg|jpeg|webp)$') then raise exception 'Lokasi berkas tidak valid'; end if;
  insert into public.submissions(assignment_id,student_id,answer,file_path)
    values(p_assignment_id,auth.uid(),btrim(p_answer),p_file_path)
    on conflict(assignment_id,student_id) do update set answer=excluded.answer,file_path=excluded.file_path,submitted_at=now()
      where public.submissions.score is null returning * into v_submission;
  if v_submission.id is null then raise exception 'Tugas sudah dinilai; jawaban tidak dapat diubah'; end if;
  return to_jsonb(v_submission);
end $$;

create function public.grade_submission(p_submission_id uuid,p_score integer,p_feedback text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_student uuid; v_submission public.submissions; v_xp integer;
begin
  if private.my_role() is distinct from 'tutor' then raise exception 'Akses tutor diperlukan'; end if;
  if p_score is null or p_score not between 0 and 100 or p_feedback is null or length(btrim(p_feedback)) not between 1 and 2000 then raise exception 'Isi nilai 0–100 dan komentar yang valid'; end if;
  select s.student_id into v_student from public.submissions s join public.assignments a on a.id=s.assignment_id where s.id=p_submission_id and private.owns_class(a.class_id);
  if v_student is null then raise exception 'Kiriman tidak tersedia untuk tutor ini'; end if;
  perform 1 from public.profiles where id=v_student for update;
  update public.submissions set score=p_score,feedback=btrim(p_feedback),graded_at=now() where id=p_submission_id returning * into v_submission;
  v_xp:=private.award_xp(v_student,'assignment_graded','assignment:'||p_submission_id,p_submission_id,15);
  perform private.log_event('submission.graded',p_submission_id);
  return to_jsonb(v_submission)||jsonb_build_object('xp_granted_now',v_xp);
end $$;

create function public.get_class_students(p_class_id uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_result jsonb;
begin
  if private.my_role() is distinct from 'tutor' or not private.owns_class(p_class_id) then raise exception 'Kelas tidak tersedia untuk tutor ini'; end if;
  select coalesce(jsonb_agg(jsonb_build_object('id',p.id,'display_name',p.display_name,'grade',p.grade,
    'average_score',(select round(avg(a.score)) from public.quiz_attempts a join public.lessons l on l.id=a.lesson_id join public.classes c on c.id=p_class_id where a.student_id=p.id and a.completed_at is not null and l.grade=c.grade))), '[]'::jsonb)
    into v_result from public.class_members m join public.profiles p on p.id=m.student_id where m.class_id=p_class_id;
  return v_result;
end $$;

create function private.valid_content(p_content jsonb) returns boolean
language plpgsql immutable set search_path='' as $$
declare v_block jsonb; v_video text;
begin
  if jsonb_typeof(p_content) is distinct from 'object' or jsonb_typeof(p_content->'summary') is distinct from 'string' or jsonb_typeof(p_content->'blocks') is distinct from 'array' then return false; end if;
  if length(p_content->>'summary')>1500 or jsonb_array_length(p_content->'blocks')>100 then return false; end if;
  v_video:=p_content->>'video_url';
  if v_video is not null and v_video<>'' and v_video !~ '^https://(www\.)?(youtube\.com/(watch\?v=|embed/)|youtube-nocookie\.com/embed/|youtu\.be/)[a-zA-Z0-9_-]{11}([?&].*)?$' then return false; end if;
  for v_block in select value from jsonb_array_elements(p_content->'blocks') loop
    if v_block->>'type' in ('text','tip') then
      if jsonb_typeof(v_block->'body') is distinct from 'string' or length(v_block->>'body') not between 1 and 20000 then return false; end if;
    elsif v_block->>'type'='image' then
      if jsonb_typeof(v_block->'url') is distinct from 'string' or not (v_block->>'url' ~ '^https://[^[:space:]]+$' or (v_block->>'url' ~ '^/assets/[a-zA-Z0-9_./-]+$' and v_block->>'url' not like '%..%')) then return false; end if;
    else return false;
    end if;
  end loop;
  return true;
end $$;

create function public.save_lesson(p_document jsonb,p_lesson_id uuid default null) returns uuid
language plpgsql security definer set search_path='' as $$
declare v_role text:=private.my_role(); v_id uuid; v_grade integer; v_content jsonb;
begin
  if v_role is null or v_role not in ('tutor','admin') then raise exception 'Akses editor diperlukan'; end if;
  if not private.valid_content(p_document->'content') or coalesce(p_document->>'grade','') !~ '^[1-6]$' then raise exception 'Konten atau tingkat materi tidak valid'; end if;
  v_grade:=(p_document->>'grade')::integer;
  v_content:=((p_document->'content') - 'reviewed_at' - 'reviewed_by') || jsonb_build_object('review_status','needs_teacher_review','editorial_notice','Draf materi; menunggu review guru sebelum publikasi.');
  if p_lesson_id is null then
    insert into public.lessons(subject_id,author_id,title,slug,grade,phase,chapter,difficulty,content)
      values((p_document->>'subject_id')::uuid,auth.uid(),btrim(p_document->>'title'),p_document->>'slug',v_grade,
        case when v_grade<=2 then 'A' when v_grade<=4 then 'B' else 'C' end,coalesce(p_document->>'chapter','Bab 1'),coalesce(p_document->>'difficulty','dasar'),v_content) returning id into v_id;
  else
    update public.lessons set subject_id=(p_document->>'subject_id')::uuid,title=btrim(p_document->>'title'),slug=p_document->>'slug',grade=v_grade,
      phase=case when v_grade<=2 then 'A' when v_grade<=4 then 'B' else 'C' end,chapter=coalesce(p_document->>'chapter','Bab 1'),difficulty=coalesce(p_document->>'difficulty','dasar'),content=v_content,status='draft'
      where id=p_lesson_id and (v_role='admin' or (author_id=auth.uid() and status='draft')) returning id into v_id;
    if v_id is null then raise exception 'Materi tidak tersedia untuk editor ini'; end if;
  end if;
  perform private.log_event('lesson.saved_draft',v_id);
  return v_id;
end $$;

create function public.get_editor_questions(p_lesson_id uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_result jsonb;
begin
  if not exists(select 1 from public.lessons where id=p_lesson_id and (private.my_role()='admin' or (private.my_role()='tutor' and author_id=auth.uid()))) then raise exception 'Materi tidak tersedia untuk editor ini'; end if;
  select coalesce(jsonb_agg(to_jsonb(q)||jsonb_build_object('correct_option',k.correct_option,'explanation',k.explanation)),'[]'::jsonb)
    into v_result from public.questions q join private.question_keys k on k.question_id=q.id where q.lesson_id=p_lesson_id;
  return v_result;
end $$;

create function public.import_questions(p_items jsonb,p_batch_id uuid) returns integer
language plpgsql security definer set search_path='' as $$
declare v_item jsonb; v_id uuid; v_count integer:=0; v_existing private.import_batches; v_options jsonb;
begin
  if private.my_role() is distinct from 'admin' then raise exception 'Akses admin diperlukan'; end if;
  if p_batch_id is null or jsonb_typeof(p_items) is distinct from 'array' then raise exception 'Batch impor tidak valid'; end if;
  if jsonb_array_length(p_items) not between 1 and 200 or octet_length(p_items::text)>512000 then raise exception 'Batch maksimal 200 soal dan 500 KB'; end if;
  perform 1 from public.profiles where id=auth.uid() for update;
  select * into v_existing from private.import_batches where id=p_batch_id;
  if found then
    if v_existing.actor_id<>auth.uid() then raise exception 'ID batch sudah digunakan'; end if;
    return v_existing.imported_count;
  end if;
  for v_item in select value from jsonb_array_elements(p_items) loop
    v_options:=v_item->'options';
    if jsonb_typeof(v_item) is distinct from 'object' or jsonb_typeof(v_options) is distinct from 'array' then raise exception 'Soal dan opsi harus sesuai format'; end if;
    if jsonb_array_length(v_options)<>4 or (select count(distinct lower(btrim(value #>> '{}'))) from jsonb_array_elements(v_options))<>4 then raise exception 'Empat opsi berbeda wajib diisi'; end if;
    if exists(select 1 from jsonb_array_elements(v_options) x where jsonb_typeof(x) is distinct from 'string' or length(btrim(x #>> '{}')) not between 1 and 500) then raise exception 'Opsi teks tidak valid'; end if;
    if jsonb_typeof(v_item->'correct_option') is distinct from 'number' or coalesce(v_item->>'correct_option','') !~ '^[0-3]$' then raise exception 'Kunci harus bilangan bulat 0–3'; end if;
    if jsonb_typeof(v_item->'explanation') is distinct from 'string' or length(btrim(v_item->>'explanation')) not between 1 and 3000 then raise exception 'Pembahasan wajib diisi'; end if;
    if jsonb_typeof(v_item->'prompt') is distinct from 'string' then raise exception 'Pertanyaan wajib berupa teks'; end if;
    if not exists(select 1 from public.lessons where id=(v_item->>'lesson_id')::uuid) then raise exception 'Materi tidak ditemukan'; end if;
    insert into public.questions(lesson_id,author_id,prompt,options,difficulty,status) values((v_item->>'lesson_id')::uuid,auth.uid(),btrim(v_item->>'prompt'),v_options,coalesce(v_item->>'difficulty','dasar'),'draft') returning id into v_id;
    insert into private.question_keys(question_id,correct_option,explanation) values(v_id,(v_item->>'correct_option')::smallint,btrim(v_item->>'explanation'));
    v_count:=v_count+1;
  end loop;
  insert into private.import_batches(id,actor_id,imported_count) values(p_batch_id,auth.uid(),v_count);
  perform private.log_event('questions.imported',p_batch_id);
  return v_count;
end $$;

create function public.publish_lesson(p_lesson_id uuid,p_publish boolean,p_review_confirmed boolean default false) returns void
language plpgsql security definer set search_path='' as $$
begin
  if private.my_role() is distinct from 'admin' then raise exception 'Akses admin diperlukan'; end if;
  if p_publish is null then raise exception 'Status publikasi wajib diisi'; end if;
  if not exists(select 1 from public.lessons where id=p_lesson_id) then raise exception 'Materi tidak ditemukan'; end if;
  if p_publish then
    if p_review_confirmed is distinct from true then raise exception 'Konfirmasi tinjauan materi dan seluruh soal diperlukan'; end if;
    if (select count(*) from public.questions q join private.question_keys k on k.question_id=q.id where q.lesson_id=p_lesson_id)<5 then raise exception 'Minimal lima soal lengkap diperlukan'; end if;
    if not exists(select 1 from public.lessons where id=p_lesson_id and private.valid_content(content)) then raise exception 'Konten materi tidak valid'; end if;
    update public.questions set status='published' where lesson_id=p_lesson_id;
  end if;
  update public.lessons set status=case when p_publish then 'published' else 'draft' end,
    content=case when p_publish then (content - 'editorial_notice') || jsonb_build_object('review_status','review_confirmed_by_admin','reviewed_by',auth.uid(),'reviewed_at',now())
      else (content - 'reviewed_by' - 'reviewed_at') || jsonb_build_object('review_status','needs_teacher_review','editorial_notice','Draf materi; menunggu review guru sebelum publikasi.') end
    where id=p_lesson_id;
  perform private.log_event(case when p_publish then 'lesson.published' else 'lesson.unpublished' end,p_lesson_id);
end $$;

create function public.promote_tutor(p_user_id uuid) returns void
language plpgsql security definer set search_path='' as $$
begin
  if private.my_role() is distinct from 'admin' then raise exception 'Akses admin diperlukan'; end if;
  update public.profiles set role='tutor' where id=p_user_id and role='student';
  if not found then raise exception 'Pilih akun siswa yang akan menjadi tutor'; end if;
  perform private.log_event('profile.promoted_tutor',p_user_id);
end $$;

create function public.save_subject(p_name text,p_slug text,p_description text,p_is_active boolean,p_id uuid default null) returns uuid
language plpgsql security definer set search_path='' as $$
declare v_id uuid;
begin
  if private.my_role() is distinct from 'admin' then raise exception 'Akses admin diperlukan'; end if;
  if p_id is null then
    insert into public.subjects(name,slug,description,is_active) values(btrim(p_name),p_slug,coalesce(p_description,''),p_is_active) returning id into v_id;
  else
    update public.subjects set name=btrim(p_name),slug=p_slug,description=coalesce(p_description,''),is_active=p_is_active where id=p_id returning id into v_id;
    if not found then raise exception 'Mata pelajaran tidak ditemukan'; end if;
  end if;
  perform private.log_event('subject.saved',v_id);
  return v_id;
end $$;

create function public.get_audit_log() returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_result jsonb;
begin
  if private.my_role() is distinct from 'admin' then raise exception 'Akses admin diperlukan'; end if;
  select coalesce(jsonb_agg(to_jsonb(x)),'[]'::jsonb) into v_result from (select id,actor_id,action,target_id,created_at from private.audit_events order by id desc limit 100) x;
  return v_result;
end $$;

create function public.request_account_deletion() returns void
language plpgsql security definer set search_path='' as $$
begin
  if auth.uid() is null then raise exception 'Harus login'; end if;
  insert into public.account_deletion_requests(student_id) values(auth.uid()) on conflict do nothing;
  perform private.log_event('account.deletion_requested',auth.uid());
end $$;

revoke all on function private.log_event(text,uuid),private.valid_content(jsonb) from public,anon,authenticated;
revoke all on function public.create_class(text,integer),public.join_class(text),public.create_assignment(uuid,uuid,text,text,timestamptz),public.submit_assignment(uuid,text,text),public.grade_submission(uuid,integer,text),public.get_class_students(uuid),public.save_lesson(jsonb,uuid),public.get_editor_questions(uuid),public.import_questions(jsonb,uuid),public.publish_lesson(uuid,boolean,boolean),public.promote_tutor(uuid),public.save_subject(text,text,text,boolean,uuid),public.get_audit_log(),public.request_account_deletion() from public,anon,authenticated;
grant execute on function public.create_class(text,integer),public.join_class(text),public.create_assignment(uuid,uuid,text,text,timestamptz),public.submit_assignment(uuid,text,text),public.grade_submission(uuid,integer,text),public.get_class_students(uuid),public.save_lesson(jsonb,uuid),public.get_editor_questions(uuid),public.import_questions(jsonb,uuid),public.publish_lesson(uuid,boolean,boolean),public.promote_tutor(uuid),public.save_subject(text,text,text,boolean,uuid),public.get_audit_log(),public.request_account_deletion() to authenticated;
commit;
