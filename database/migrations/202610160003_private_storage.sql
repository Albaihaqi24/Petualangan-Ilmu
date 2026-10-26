-- Memerlukan Supabase Storage (storage.buckets dan storage.objects).
begin;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('student-submissions','student-submissions',false,5242880,array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

create function private.can_access_submission_file(p_name text,p_write boolean) returns boolean
language plpgsql stable security definer set search_path='' as $$
declare v_student uuid; v_assignment_id uuid; v_assignment public.assignments;
begin
  if auth.uid() is null or p_name is null or p_name like '%..%' or p_name !~ '^[a-zA-Z0-9/-]+\.(pdf|png|jpg|jpeg|webp)$' then return false; end if;
  if split_part(p_name,'/',1) !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    or split_part(p_name,'/',2) !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then return false; end if;
  v_student:=split_part(p_name,'/',1)::uuid;
  v_assignment_id:=split_part(p_name,'/',2)::uuid;
  select * into v_assignment from public.assignments where id=v_assignment_id;
  if not found then return false; end if;
  if p_write then
    return private.my_role()='student' and v_student=auth.uid() and private.is_member(v_assignment.class_id)
      and v_assignment.due_at>now() and not exists(select 1 from public.submissions where assignment_id=v_assignment_id and student_id=v_student and score is not null);
  end if;
  return (v_student=auth.uid() and private.is_member(v_assignment.class_id)) or (private.my_role()='tutor' and private.owns_class(v_assignment.class_id));
end $$;
revoke all on function private.can_access_submission_file(text,boolean) from public,anon,authenticated;
grant execute on function private.can_access_submission_file(text,boolean) to authenticated;
create policy pi_submissions_read on storage.objects for select to authenticated
  using(bucket_id='student-submissions' and private.can_access_submission_file(name,false));
create policy pi_submissions_upload on storage.objects for insert to authenticated
  with check(bucket_id='student-submissions' and private.can_access_submission_file(name,true));
create policy pi_submissions_remove_ungraded on storage.objects for delete to authenticated
  using(bucket_id='student-submissions' and private.can_access_submission_file(name,true));
-- Tidak ada policy UPDATE: unggahan baru memakai nama acak, bukan menimpa berkas lama.
commit;
