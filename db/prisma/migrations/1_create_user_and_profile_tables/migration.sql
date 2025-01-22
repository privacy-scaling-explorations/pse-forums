CREATE TABLE "user" (
  "id" SERIAL NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "email" TEXT NOT NULL,
  "encrypted_password" TEXT NOT NULL,
  "salt" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  constraint valid_email check (
    email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
  ),
  CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "profile" (
  "id" INTEGER NOT NULL,
  "about" TEXT,
  "created_at" TIMESTAMPTZ(6) NOT NULL,
  "username" TEXT NOT NULL,
  "url" TEXT,
  CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

ALTER TABLE "profile"
ADD
  CONSTRAINT "profile_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- on signup, copy id, created_at and username to public profiles table
create function handle_new_user() returns trigger language plpgsql security definer
set
  search_path = '' as $$ begin
insert into
  profiles (id, created_at, username)
values
  (new.id, new.created_at, new.username);
return new;
end;
$$;

create trigger on_auth_user_created
after
insert
  on "user" for each row execute procedure handle_new_user();

comment on table "user" is 'Private user data';
comment on column "user".encrypted_password is 'Hex encoded encrypted password';
comment on column "user".salt is 'Hex encoded salt used to hash the password';
