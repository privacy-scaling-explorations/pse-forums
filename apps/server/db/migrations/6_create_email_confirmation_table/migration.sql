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

-- automatically confirm user on deletion of row that contains a valid, non expired token
CREATE FUNCTION confirm_user_on_valid_deletion_fn()
RETURNS TRIGGER AS $$
DECLARE
    token_exists BOOLEAN;
BEGIN
    -- Ensure the token is valid (not expired)
    SELECT EXISTS (
        SELECT 1 FROM email_confirmation
        WHERE uid = OLD.uid
          AND token = OLD.token
          AND expires_at > NOW()
    ) INTO token_exists;

    IF token_exists THEN
        UPDATE "user" SET email_confirmed = TRUE WHERE id = OLD.uid;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER confirm_user_on_valid_deletion_trigger
BEFORE DELETE ON email_confirmation
FOR EACH ROW
EXECUTE FUNCTION confirm_user_on_valid_deletion_fn();
