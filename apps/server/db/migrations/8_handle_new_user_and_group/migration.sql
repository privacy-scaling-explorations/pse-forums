-- on signup: copy user.{id,created_at,username} into public.profiles
create function create_profile_from_new_user_fn()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profile (id, username)
    values (new.id, new.username);
return new;
end;
$$;

create trigger create_profile_from_new_user_trigger
after insert on public."user"
for each row execute procedure create_profile_from_new_user_fn();


create function create_bandada_admin_from_new_group_fn()
returns trigger
language plpgsql
security definer
as $$
declare bandada_admin_user record;
begin
  -- check that user exist to avoid foreign key constraint violation
  if exists (select 1 from public."user" where id = new.aid) then
    insert into bandada.admins (id, username)
    select id, username  from public."user" where id = new.aid
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;

create trigger create_bandada_admin_from_new_group_trigger
-- need to insert before insert on public."group" because of foreign key constraint
before insert on public."group"
for each row execute procedure create_bandada_admin_from_new_group_fn();


create function maybe_create_bandada_group_from_new_group_fn()
returns trigger
language plpgsql
security definer
as $$
begin
    if new.anonymous is true then
      -- check that bandada admin exist to avoid foreign key constraint violation
      if exists (select 1 from bandada.admins where id = new.aid) then
        insert into bandada.groups (id, gid, name, description, admin_id)
        values (new.id::VARCHAR(32), new.id, new.name, new.description, new.aid);
      end if;
    end if;
return new;
end;
$$;

create trigger maybe_create_bandada_group_from_new_group_trigger
after insert on public."group"
for each row execute procedure maybe_create_bandada_group_from_new_group_fn();
