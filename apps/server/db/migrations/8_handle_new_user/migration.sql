-- on signup: copy user.{id,created_at,username} to public profiles and bandada.admins tables
create function handle_new_user() returns trigger
language plpgsql
security definer
as $$ begin
    insert into public.profile (id, created_at, username)
    values (new.id, new.created_at, new.username);

    insert into bandada.admins (id, created_at, updated_at, username)
    values (new.id, new.created_at, new.created_at, new.username);
return new;
end;
$$;

create trigger on_user_created
after
insert
  on "user" for each row execute procedure handle_new_user();
