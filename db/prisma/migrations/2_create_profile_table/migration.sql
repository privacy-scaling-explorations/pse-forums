CREATE TABLE "profile" (
  "id" INTEGER NOT NULL,
  "about" TEXT,
  "created_at" TIMESTAMPTZ(6) NOT NULL,
  "username" TEXT NOT NULL,
  "url" TEXT,
  CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

ALTER TABLE "profile"
ADD
  CONSTRAINT "profile_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- on signup, copy id, created_at and username to public profiles table
create function handle_new_user() returns trigger language plpgsql security definer
set search_path = 'public'
as $$ begin
insert into profile (id, created_at, username)
values (new.id, new.created_at, new.username);
return new;
end;
$$;

create trigger on_user_created
after
insert
  on "user" for each row execute procedure handle_new_user();
