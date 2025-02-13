-- 1 is the default (first) group id
alter table post add column gid integer not null default 1;

CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "aid" INTEGER NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[],

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."membership" (
    "uid" INTEGER NOT NULL,
    "gid" INTEGER NOT NULL,

    CONSTRAINT "membership_pkey" PRIMARY KEY ("uid","gid")
);

CREATE INDEX "membership_uid_idx" ON "public"."membership"("uid");
CREATE INDEX "membership_gid_idx" ON "public"."membership"("gid");

ALTER TABLE "post" ADD CONSTRAINT "post_gid_fkey" FOREIGN KEY ("gid") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "group" ADD CONSTRAINT "group_aid_user_fkey" FOREIGN KEY ("aid") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."membership" ADD CONSTRAINT "membership_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."membership" ADD CONSTRAINT "membership_gid_fkey" FOREIGN KEY ("gid") REFERENCES "public"."group"("id") ON DELETE CASCADE ON UPDATE CASCADE;


CREATE FUNCTION add_admin_to_group_fn()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO membership (uid, gid)
  VALUES (NEW.aid, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_admin_to_group_trigger
AFTER INSERT ON "group"
FOR EACH ROW EXECUTE FUNCTION add_admin_to_group_fn();
