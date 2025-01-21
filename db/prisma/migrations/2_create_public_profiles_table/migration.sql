-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "about" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "public"."profiles"("username");

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, about, username, url)
  values (new.id,
          new.raw_user_meta_data ->> 'about',
          new.raw_user_meta_data ->> 'username',
          new.raw_user_meta_data ->> 'url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
