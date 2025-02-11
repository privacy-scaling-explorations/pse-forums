ALTER TABLE "post" ADD COLUMN     "gid" INTEGER;
comment on column "post"."gid" is 'Optional group ID; null for posts that are not part of a group';

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

ALTER TABLE "post" ADD CONSTRAINT "post_gid_fkey" FOREIGN KEY ("gid") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."membership" ADD CONSTRAINT "membership_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."membership" ADD CONSTRAINT "membership_gid_fkey" FOREIGN KEY ("gid") REFERENCES "public"."group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE FUNCTION add_creator_to_group()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO membership (uid, gid)
  VALUES (NEW.aid, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_creator_to_group
AFTER INSERT ON "group"
FOR EACH ROW EXECUTE FUNCTION add_creator_to_group();
