-- Tahap 3: jalankan SATU KALI pada proyek Supabase BARU.
-- Auth Supabase menyediakan auth.users, auth.uid(), anon, authenticated.
-- Tidak mengubah akun, kredensial, atau tabel Auth milik Supabase.
begin;

do $$ begin
  if to_regclass('public.profiles') is not null then
    raise exception 'Database sudah memiliki profiles. Hentikan: migration ini khusus proyek baru; jangan menimpa skema lama.';
  end if;
end $$;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Petualang Cilik' check (length(btrim(display_name)) between 1 and 24),
  role text not null default 'student' check (role in ('student', 'tutor', 'admin')),
  grade smallint not null default 1 check (grade between 1 and 6),
  avatar text not null default 'fox' check (avatar in ('fox', 'panda', 'rabbit', 'tiger')),
  total_xp integer not null default 0 check (total_xp >= 0),
  level integer generated always as (total_xp / 100 + 1) stored,
  created_at timestamptz not null default now()
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) between 1 and 80),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text not null default '',
  is_active boolean not null default true
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null check (length(btrim(title)) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  grade smallint not null check (grade between 1 and 6),
  phase text not null check (phase in ('A', 'B', 'C')),
  chapter text not null default 'Bab 1',
  difficulty text not null default 'dasar' check (difficulty in ('dasar', 'sedang', 'lanjut')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  duration smallint not null default 5 check (duration between 1 and 180),
  content jsonb not null default '{"summary":"","video_url":null,"blocks":[]}'::jsonb,
  created_at timestamptz not null default now(),
  check (phase = case when grade <= 2 then 'A' when grade <= 4 then 'B' else 'C' end),
  check (jsonb_typeof(content) = 'object' and content ? 'blocks' and jsonb_typeof(content->'blocks') = 'array')
);

-- Tabel publik hanya memuat teks soal/opsi. Siswa mengaksesnya melalui RPC sesi.
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  prompt text not null check (length(btrim(prompt)) between 1 and 2000),
  options jsonb not null,
  difficulty text not null default 'dasar' check (difficulty in ('dasar', 'sedang', 'lanjut')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) = 4),
  check (jsonb_typeof(options->0) = 'string' and jsonb_typeof(options->1) = 'string' and jsonb_typeof(options->2) = 'string' and jsonb_typeof(options->3) = 'string'),
  check (length(btrim(options->>0)) > 0 and length(btrim(options->>1)) > 0 and length(btrim(options->>2)) > 0 and length(btrim(options->>3)) > 0)
);
create table private.question_keys (
  question_id uuid primary key references public.questions(id) on delete cascade,
  correct_option smallint not null check (correct_option between 0 and 3),
  explanation text not null check (length(btrim(explanation)) between 1 and 3000)
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id),
  started_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  completed_at timestamptz,
  score smallint check (score between 0 and 100),
  correct_count smallint check (correct_count between 0 and 10),
  total_questions smallint not null check (total_questions between 5 and 10),
  xp_earned smallint not null default 0 check (xp_earned between 0 and 105),
  check (correct_count is null or correct_count <= total_questions),
  check ((completed_at is null and score is null and correct_count is null) or (completed_at is not null and score is not null and correct_count is not null))
);
-- Snapshot menjaga soal, opsi, kunci, dan pembahasan sesi tidak berubah di tengah pengerjaan.
create table private.quiz_session_questions (
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid not null,
  position smallint not null check (position between 1 and 10),
  prompt text not null,
  options jsonb not null,
  correct_option smallint not null check (correct_option between 0 and 3),
  explanation text not null,
  selected_option smallint check (selected_option between 0 and 3),
  primary key (attempt_id, question_id),
  unique (attempt_id, position)
);

create table public.xp_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in ('read_lesson', 'quiz_first', 'quiz_remedial', 'assignment_graded')),
  event_key text not null,
  reference_id uuid not null,
  amount smallint not null check (amount between 1 and 105),
  created_at timestamptz not null default now(),
  unique (student_id, event_key)
);

-- Struktur kelas disiapkan di Tahap 3; mutasi kelas/tugas dibuka lewat RPC Tahap 7.
create table public.classes (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.profiles(id),
  name text not null check (length(btrim(name)) between 1 and 80),
  grade smallint not null check (grade between 1 and 6),
  join_code text not null unique check (join_code ~ '^[A-Z0-9]{6}$'),
  created_at timestamptz not null default now()
);
create table public.class_members (
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, student_id)
);
create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id),
  title text not null check (length(btrim(title)) between 1 and 120),
  instructions text not null check (length(btrim(instructions)) between 1 and 3000),
  due_at timestamptz not null,
  created_at timestamptz not null default now()
);
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  answer text not null check (length(btrim(answer)) between 1 and 3000),
  score smallint check (score between 0 and 100),
  feedback text,
  submitted_at timestamptz not null default now(),
  graded_at timestamptz,
  unique (assignment_id, student_id)
);

create index lessons_catalog_idx on public.lessons (grade, status, subject_id);
create index questions_lesson_idx on public.questions (lesson_id, status, difficulty);
create index attempts_student_lesson_idx on public.quiz_attempts (student_id, lesson_id, started_at desc);
create index classes_tutor_idx on public.classes (tutor_id);
create index members_student_idx on public.class_members (student_id, class_id);
create index assignments_class_idx on public.assignments (class_id);
create index submissions_student_idx on public.submissions (student_id);

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare v_grade smallint := 1; v_avatar text := 'fox'; v_name text;
begin
  if coalesce(new.raw_user_meta_data->>'grade', '') ~ '^[1-6]$' then
    v_grade := (new.raw_user_meta_data->>'grade')::smallint;
  end if;
  if new.raw_user_meta_data->>'avatar' in ('fox', 'panda', 'rabbit', 'tiger') then
    v_avatar := new.raw_user_meta_data->>'avatar';
  end if;
  v_name := left(coalesce(nullif(btrim(new.raw_user_meta_data->>'display_name'), ''), 'Petualang Cilik'), 24);
  insert into public.profiles (id, display_name, role, grade, avatar)
    values (new.id, v_name, 'student', v_grade, v_avatar);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create function private.my_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = auth.uid()
$$;
create function private.owns_class(p_class_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.classes where id = p_class_id and tutor_id = auth.uid())
$$;
create function private.is_member(p_class_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.class_members where class_id = p_class_id and student_id = auth.uid())
$$;

-- Internal saja: tidak diberi EXECUTE kepada klien, termasuk akun admin.
create function private.award_xp(p_student uuid, p_type text, p_key text, p_reference uuid, p_amount integer)
returns integer language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
  insert into public.xp_events(student_id, event_type, event_key, reference_id, amount)
    values (p_student, p_type, p_key, p_reference, p_amount)
    on conflict (student_id, event_key) do nothing returning id into v_id;
  if v_id is null then return 0; end if;
  update public.profiles set total_xp = total_xp + p_amount where id = p_student;
  return p_amount;
end $$;

create function public.complete_lesson_reading(p_lesson_id uuid) returns integer
language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null or private.my_role() is distinct from 'student' then raise exception 'Akses siswa diperlukan'; end if;
  if not exists(select 1 from public.lessons l join public.subjects s on s.id = l.subject_id where l.id = p_lesson_id and l.status = 'published' and s.is_active) then raise exception 'Materi tidak tersedia'; end if;
  perform 1 from public.profiles where id = v_user for update;
  return private.award_xp(v_user, 'read_lesson', 'read:' || p_lesson_id, p_lesson_id, 5);
end $$;

create function public.get_lesson_quiz(p_lesson_id uuid, p_limit integer default 10) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid(); v_attempt uuid; v_total integer; v_questions jsonb;
begin
  if v_user is null or private.my_role() is distinct from 'student' then raise exception 'Akses siswa diperlukan'; end if;
  if p_limit is null or p_limit not between 5 and 10 then raise exception 'Jumlah soal harus 5 sampai 10'; end if;
  if not exists(select 1 from public.lessons l join public.subjects s on s.id = l.subject_id where l.id = p_lesson_id and l.status = 'published' and s.is_active) then raise exception 'Materi tidak tersedia'; end if;
  perform 1 from public.profiles where id = v_user for update;
  select id into v_attempt from public.quiz_attempts
    where student_id = v_user and lesson_id = p_lesson_id and completed_at is null and expires_at > now()
    order by started_at desc limit 1;
  if v_attempt is null then
    if (select count(*) from public.quiz_attempts where student_id = v_user and started_at > now() - interval '1 hour') >= 20 then raise exception 'Batas sesi tercapai. Coba lagi nanti'; end if;
    select least(count(*)::integer, p_limit) into v_total from public.questions q
      join private.question_keys k on k.question_id = q.id where q.lesson_id = p_lesson_id and q.status = 'published';
    if v_total < 5 then raise exception 'Minimal lima soal published diperlukan'; end if;
    insert into public.quiz_attempts(student_id, lesson_id, total_questions) values(v_user, p_lesson_id, v_total) returning id into v_attempt;
    insert into private.quiz_session_questions(attempt_id, question_id, position, prompt, options, correct_option, explanation)
      select v_attempt, q.id, row_number() over ()::smallint, q.prompt, q.options, k.correct_option, k.explanation
      from (select * from public.questions where lesson_id = p_lesson_id and status = 'published' and exists(select 1 from private.question_keys where question_id = public.questions.id) order by random() limit p_limit) q
      join private.question_keys k on k.question_id = q.id;
  end if;
  select jsonb_agg(jsonb_build_object('id', question_id, 'lesson_id', p_lesson_id, 'prompt', prompt, 'options', options) order by position)
    into v_questions from private.quiz_session_questions where attempt_id = v_attempt;
  return jsonb_build_object('attempt_id', v_attempt, 'lesson_id', p_lesson_id, 'questions', v_questions);
end $$;

create function private.quiz_result(p_attempt_id uuid) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('attempt_id', a.id, 'lesson_id', a.lesson_id, 'score', a.score,
    'correct_count', a.correct_count, 'total_questions', a.total_questions, 'xp_earned', a.xp_earned,
    'details', (select jsonb_agg(jsonb_build_object('question_id', q.question_id, 'prompt', q.prompt, 'options', q.options,
      'selected_option', q.selected_option, 'correct_option', q.correct_option,
      'is_correct', q.selected_option = q.correct_option, 'explanation', q.explanation) order by q.position)
      from private.quiz_session_questions q where q.attempt_id = a.id))
  from public.quiz_attempts a where a.id = p_attempt_id and a.student_id = auth.uid() and a.completed_at is not null
$$;

-- Berbeda dari contoh awal PRD: wajib ID SESI, bukan hanya ID materi.
create function public.submit_quiz_answers(p_attempt_id uuid, p_answers jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_user uuid := auth.uid(); v_attempt public.quiz_attempts; v_item jsonb;
  v_correct integer; v_score integer; v_xp integer := 0; v_replayed boolean;
begin
  if v_user is null or private.my_role() is distinct from 'student' then raise exception 'Akses siswa diperlukan'; end if;
  perform 1 from public.profiles where id = v_user for update;
  select * into v_attempt from public.quiz_attempts where id = p_attempt_id and student_id = v_user for update;
  if not found then raise exception 'Sesi kuis tidak tersedia'; end if;
  if jsonb_typeof(p_answers) is distinct from 'array' then raise exception 'Jawaban harus berupa array'; end if;
  if jsonb_array_length(p_answers) <> v_attempt.total_questions then raise exception 'Jawab semua soal tepat satu kali'; end if;
  for v_item in select value from jsonb_array_elements(p_answers) loop
    if jsonb_typeof(v_item) is distinct from 'object'
      or jsonb_typeof(v_item->'question_id') is distinct from 'string'
      or (v_item->>'question_id') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      or jsonb_typeof(v_item->'selected_option') is distinct from 'number'
      or (v_item->>'selected_option') !~ '^[0-3]$'
    then raise exception 'Format jawaban tidak valid'; end if;
    if not exists(select 1 from private.quiz_session_questions where attempt_id = p_attempt_id and question_id = (v_item->>'question_id')::uuid) then raise exception 'Soal bukan bagian sesi ini'; end if;
  end loop;
  if (select count(distinct (value->>'question_id')::uuid) from jsonb_array_elements(p_answers)) <> v_attempt.total_questions then raise exception 'Jawaban duplikat tidak diizinkan'; end if;
  v_replayed := v_attempt.completed_at is not null;
  if v_replayed then
    if exists(select 1 from jsonb_array_elements(p_answers) x join private.quiz_session_questions q on q.attempt_id = p_attempt_id and q.question_id = (x->>'question_id')::uuid where q.selected_option <> (x->>'selected_option')::smallint) then raise exception 'Sesi sudah dikumpulkan; jawaban tidak dapat diubah'; end if;
  else
    if v_attempt.expires_at <= now() then raise exception 'Sesi sudah kedaluwarsa. Mulai latihan baru'; end if;
    if not exists(select 1 from public.lessons l join public.subjects s on s.id = l.subject_id where l.id = v_attempt.lesson_id and l.status = 'published' and s.is_active) then raise exception 'Materi tidak tersedia'; end if;
    update private.quiz_session_questions q set selected_option = (x.value->>'selected_option')::smallint
      from jsonb_array_elements(p_answers) x where q.attempt_id = p_attempt_id and q.question_id = (x.value->>'question_id')::uuid;
    select count(*) filter (where selected_option = correct_option) into v_correct from private.quiz_session_questions where attempt_id = p_attempt_id;
    v_score := round(100.0 * v_correct / v_attempt.total_questions);
    if not exists(select 1 from public.quiz_attempts where student_id = v_user and lesson_id = v_attempt.lesson_id and completed_at is not null) then
      v_xp := private.award_xp(v_user, 'quiz_first', 'quiz:' || v_attempt.lesson_id, p_attempt_id, v_correct * 10 + 5);
    elsif v_score < 60 then
      v_xp := private.award_xp(v_user, 'quiz_remedial', 'remedial:' || (now() at time zone 'Asia/Jakarta')::date, p_attempt_id, 3);
    end if;
    update public.quiz_attempts set score = v_score, correct_count = v_correct, xp_earned = v_xp, completed_at = now() where id = p_attempt_id;
  end if;
  return private.quiz_result(p_attempt_id) || jsonb_build_object('xp_granted_now', v_xp, 'replayed', v_replayed);
end $$;

create function public.get_quiz_result(p_attempt_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_result jsonb;
begin
  if auth.uid() is null or private.my_role() is distinct from 'student' then raise exception 'Akses siswa diperlukan'; end if;
  v_result := private.quiz_result(p_attempt_id);
  if v_result is null then raise exception 'Hasil belum tersedia'; end if;
  return v_result;
end $$;

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.xp_events enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table private.question_keys enable row level security;
alter table private.quiz_session_questions enable row level security;

create policy profiles_read on public.profiles for select to authenticated using (id = (select auth.uid()) or (select private.my_role()) = 'admin');
create policy profiles_edit on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy subjects_read on public.subjects for select to anon, authenticated using (is_active or (select private.my_role()) = 'admin');
create policy lessons_read on public.lessons for select to anon, authenticated using (
  (status = 'published' and exists(select 1 from public.subjects where id = subject_id and is_active))
  or (author_id = (select auth.uid()) and (select private.my_role()) = 'tutor') or (select private.my_role()) = 'admin');
create policy questions_editor_read on public.questions for select to authenticated using ((select private.my_role()) = 'admin' or (author_id = (select auth.uid()) and (select private.my_role()) = 'tutor'));
create policy attempts_read on public.quiz_attempts for select to authenticated using (student_id = (select auth.uid()));
create policy xp_read on public.xp_events for select to authenticated using (student_id = (select auth.uid()));
create policy classes_read on public.classes for select to authenticated using (private.owns_class(id) or private.is_member(id));
create policy members_read on public.class_members for select to authenticated using (student_id = (select auth.uid()) or private.owns_class(class_id));
create policy assignments_read on public.assignments for select to authenticated using (private.owns_class(class_id) or private.is_member(class_id));
create policy submissions_read on public.submissions for select to authenticated using (student_id = (select auth.uid()) or exists(select 1 from public.assignments a where a.id = assignment_id and private.owns_class(a.class_id)));

revoke all on public.profiles, public.subjects, public.lessons, public.questions, public.quiz_attempts, public.xp_events, public.classes, public.class_members, public.assignments, public.submissions from public, anon, authenticated;
revoke all on private.question_keys, private.quiz_session_questions from public, anon, authenticated;
grant select on public.subjects, public.lessons to anon;
grant select on public.profiles, public.subjects, public.lessons, public.questions, public.quiz_attempts, public.xp_events, public.classes, public.class_members, public.assignments, public.submissions to authenticated;
grant update (display_name, grade, avatar) on public.profiles to authenticated;

revoke all on all functions in schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated;
grant execute on function private.my_role() to anon, authenticated;
grant execute on function private.owns_class(uuid), private.is_member(uuid) to authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.complete_lesson_reading(uuid), public.get_lesson_quiz(uuid, integer), public.submit_quiz_answers(uuid, jsonb), public.get_quiz_result(uuid) from public, anon, authenticated;
grant execute on function public.complete_lesson_reading(uuid), public.get_lesson_quiz(uuid, integer), public.submit_quiz_answers(uuid, jsonb), public.get_quiz_result(uuid) to authenticated;

commit;
