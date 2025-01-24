-- AlterTable
ALTER TABLE "post" ADD COLUMN     "gid" INTEGER;
comment on column "post"."gid" is 'Optional group ID; null for posts that are not part of a group';

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[],

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_gid_fkey" FOREIGN KEY ("gid") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
