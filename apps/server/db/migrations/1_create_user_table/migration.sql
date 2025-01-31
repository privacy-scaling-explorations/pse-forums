CREATE TABLE "user" (
  "id" SERIAL NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "email" TEXT NOT NULL,
  "email_confirmed" BOOLEAN NOT NULL DEFAULT false,
  "encrypted_password" TEXT NOT NULL,
  "salt" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  constraint valid_email check (
    email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
  ),
  CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

comment on table "user" is 'Private user data';
comment on column "user".encrypted_password is 'Hex encoded encrypted password';
comment on column "user".salt is 'Hex encoded salt used to hash the password';
