begin;
create function public.save_draft_question(p_item jsonb) returns uuid
language plpgsql security definer set search_path='' as $$
declare v_id uuid; v_options jsonb:=p_item->'options'; v_role text:=private.my_role();
begin
  if v_role is null or v_role not in ('tutor','admin') then raise exception 'Akses editor diperlukan'; end if;
  if not exists(select 1 from public.lessons where id=(p_item->>'lesson_id')::uuid and (v_role='admin' or (author_id=auth.uid() and status='draft'))) then raise exception 'Materi draf tidak tersedia untuk editor ini'; end if;
  if jsonb_typeof(v_options) is distinct from 'array' then raise exception 'Opsi harus berupa array'; end if;
  if jsonb_array_length(v_options)<>4 or (select count(distinct lower(btrim(value #>> '{}'))) from jsonb_array_elements(v_options))<>4 then raise exception 'Empat opsi berbeda wajib diisi'; end if;
  if exists(select 1 from jsonb_array_elements(v_options) x where jsonb_typeof(x) is distinct from 'string' or length(btrim(x #>> '{}')) not between 1 and 500) then raise exception 'Opsi teks tidak valid'; end if;
  if jsonb_typeof(p_item->'correct_option') is distinct from 'number' or coalesce(p_item->>'correct_option','') !~ '^[0-3]$' then raise exception 'Kunci harus bilangan bulat 0–3'; end if;
  if jsonb_typeof(p_item->'explanation') is distinct from 'string' or length(btrim(p_item->>'explanation')) not between 1 and 3000 then raise exception 'Pembahasan wajib diisi'; end if;
  if jsonb_typeof(p_item->'prompt') is distinct from 'string' then raise exception 'Pertanyaan wajib berupa teks'; end if;
  insert into public.questions(lesson_id,author_id,prompt,options,difficulty,status) values((p_item->>'lesson_id')::uuid,auth.uid(),btrim(p_item->>'prompt'),v_options,coalesce(p_item->>'difficulty','dasar'),'draft') returning id into v_id;
  insert into private.question_keys(question_id,correct_option,explanation) values(v_id,(p_item->>'correct_option')::smallint,btrim(p_item->>'explanation'));
  perform private.log_event('question.saved_draft',v_id);
  return v_id;
end $$;
revoke all on function public.save_draft_question(jsonb) from public,anon,authenticated;
grant execute on function public.save_draft_question(jsonb) to authenticated;
commit;
