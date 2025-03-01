CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER,
    "title" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "post" ADD CONSTRAINT "post_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

comment on column post.uid is 'Optional user ID; null for anonymous posts';

-- update user record on profile record update
CREATE FUNCTION update_user_username_fn()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public."user"
    SET username = NEW.username
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_username_trigger
AFTER UPDATE OF username ON public.profile
FOR EACH ROW
EXECUTE FUNCTION update_user_username_fn();
