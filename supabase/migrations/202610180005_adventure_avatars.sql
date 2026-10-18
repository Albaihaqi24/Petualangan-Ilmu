-- Tambah avatar tanpa mengubah profil/progres yang sudah ada.
begin;
alter table public.profiles drop constraint if exists profiles_avatar_check;
alter table public.profiles add constraint profiles_avatar_check
  check (avatar in ('fox','panda','rabbit','tiger','kiki','momo','piko'));

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare v_grade smallint := 1; v_avatar text := 'fox'; v_name text;
begin
  if coalesce(new.raw_user_meta_data->>'grade', '') ~ '^[1-6]$' then
    v_grade := (new.raw_user_meta_data->>'grade')::smallint;
  end if;
  if new.raw_user_meta_data->>'avatar' in ('fox','panda','rabbit','tiger','kiki','momo','piko') then
    v_avatar := new.raw_user_meta_data->>'avatar';
  end if;
  v_name := left(coalesce(nullif(btrim(new.raw_user_meta_data->>'display_name'), ''), 'Petualang Cilik'), 24);
  insert into public.profiles (id, display_name, role, grade, avatar)
    values (new.id, v_name, 'student', v_grade, v_avatar);
  return new;
end $$;
commit;
