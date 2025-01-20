create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  username text,

  primary key (id)
);

create unique index "profiles_username_key" on public.profiles("username");


create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
