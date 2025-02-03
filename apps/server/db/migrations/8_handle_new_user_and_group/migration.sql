-- on signup: copy user.{id,created_at,username} into public.profiles
create function create_profile_from_new_user() returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profile (id, username)
    values (new.id, new.username);
return new;
end;
$$;

create trigger after_user_created
after insert on public."user"
for each row execute procedure create_profile_from_new_user();


create function maybe_create_bandada_admin_from_new_group() returns trigger
language plpgsql
security definer
as $$
declare bandada_admin_user record;
begin
  if new.bandada_admin_id is not null then
    insert into bandada.admins (id, username)
    select id, username
    from public."user"
    where id = new.bandada_admin_id
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

create trigger before_group_created
-- need to insert before insert on public."group" because of foreign key constraint
before insert on public."group"
for each row execute procedure maybe_create_bandada_admin_from_new_group();


create function create_bandada_group_from_new_group() returns trigger
language plpgsql
security definer
as $$
begin
    if new.bandada_admin_id is not null then
        insert into bandada.groups (id, gid, name, description, admin_id)
        values (new.id::VARCHAR(32), new.id, new.name, new.description, new.bandada_admin_id);
    end if;
return new;
end;
$$;

create trigger after_group_created
after insert on public."group"
for each row execute procedure create_bandada_group_from_new_group();
