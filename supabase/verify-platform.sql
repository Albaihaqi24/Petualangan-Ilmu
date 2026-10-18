-- Baca-saja; jalankan sesudah keempat migration. Tidak menyatakan Auth/Data API/konkurensi lulus.
do $$
declare v_function text;
begin
  foreach v_function in array array['create_class(text,integer)','join_class(text)','create_assignment(uuid,uuid,text,text,timestamp with time zone)','submit_assignment(uuid,text,text)','grade_submission(uuid,integer,text)','get_class_students(uuid)','save_lesson(jsonb,uuid)','get_editor_questions(uuid)','save_draft_question(jsonb)','import_questions(jsonb,uuid)','publish_lesson(uuid,boolean,boolean)','promote_tutor(uuid)','save_subject(text,text,text,boolean,uuid)','get_audit_log()','request_account_deletion()'] loop
    if to_regprocedure('public.'||v_function) is null then raise exception 'RPC belum terpasang: %',v_function; end if;
    if has_function_privilege('anon','public.'||v_function,'EXECUTE') or not has_function_privilege('authenticated','public.'||v_function,'EXECUTE') then raise exception 'Izin RPC tidak sesuai: %',v_function; end if;
  end loop;
  if not exists(select 1 from storage.buckets where id='student-submissions' and not public and file_size_limit=5242880) then raise exception 'Bucket privat belum sesuai'; end if;
  if (select count(*) from pg_policies where schemaname='storage' and tablename='objects' and policyname in ('pi_submissions_read','pi_submissions_upload','pi_submissions_remove_ungraded'))<>3 then raise exception 'Policy berkas belum lengkap'; end if;
  if has_table_privilege('authenticated','private.audit_events','SELECT') or has_table_privilege('authenticated','private.import_batches','INSERT') then raise exception 'Tabel privat terbuka'; end if;
end $$;
select 'Struktur platform dan bucket privat lulus' as result;
