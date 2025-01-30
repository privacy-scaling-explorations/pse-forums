CREATE TABLE "email_confirmation" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "token" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expires_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "email_confirmation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "email_confirmation_uid_key" ON "email_confirmation"("uid");
CREATE UNIQUE INDEX "email_confirmation_token_key" ON "email_confirmation"("token");

ALTER TABLE "email_confirmation" ADD CONSTRAINT "email_confirmation_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

comment on table email_confirmation is 'Email confirmation tokens for email verification on signup';
