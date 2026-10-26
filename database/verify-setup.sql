-- Pemeriksaan baca-saja setelah migration aktif dipasang pada Supabase.
-- Tidak membuat akun, memublikasikan konten, atau mengubah data.
do $$
declare v_count integer;
begin
  select count(*) into v_count from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind = 'r' and c.relrowsecurity
      and c.relname in ('profiles','subjects','lessons','questions','quiz_attempts','xp_events','classes','class_members','assignments','submissions');
  if v_count <> 10 then raise exception 'Pemeriksaan gagal: sepuluh tabel publik harus tersedia dengan RLS aktif'; end if;
  if to_regprocedure('public.handle_new_user()') is null
    or to_regprocedure('public.get_lesson_quiz(uuid,integer)') is null
    or to_regprocedure('public.submit_quiz_answers(uuid,jsonb)') is null
    or to_regprocedure('public.complete_lesson_reading(uuid)') is null
    or to_regprocedure('public.get_quiz_result(uuid)') is null then
    raise exception 'Pemeriksaan gagal: fungsi Tahap 3 belum lengkap';
  end if;
  if has_column_privilege('authenticated','public.profiles','role','UPDATE')
    or has_column_privilege('authenticated','public.profiles','total_xp','UPDATE') then
    raise exception 'Pemeriksaan gagal: klien masih bisa mengubah role/XP';
  end if;
  if has_table_privilege('authenticated','private.question_keys','SELECT')
    or has_table_privilege('anon','private.question_keys','SELECT')
    or has_table_privilege('authenticated','private.quiz_session_questions','SELECT') then
    raise exception 'Pemeriksaan gagal: tabel kunci/snapshot bisa dibaca klien';
  end if;
  if has_function_privilege('anon','public.get_lesson_quiz(uuid,integer)','EXECUTE')
    or has_function_privilege('authenticated','private.award_xp(uuid,text,text,uuid,integer)','EXECUTE') then
    raise exception 'Pemeriksaan gagal: izin RPC terlalu luas';
  end if;
end $$;

select 'Struktur dan izin dasar Tahap 3 lulus' as result,
  (select count(*) from public.subjects) as subjects,
  (select count(*) from public.lessons) as lessons,
  (select count(*) from public.questions) as questions,
  (select count(*) from public.lessons where status = 'draft') as draft_lessons;

select n.nspname as schema_name, p.proname as function_name, p.prosecdef as security_definer,
  p.proconfig as settings
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where (n.nspname = 'public' and p.proname in ('handle_new_user','get_lesson_quiz','submit_quiz_answers','complete_lesson_reading','get_quiz_result'))
  or (n.nspname = 'private' and p.proname in ('my_role','owns_class','is_member','award_xp','quiz_result'))
order by schema_name, function_name;
