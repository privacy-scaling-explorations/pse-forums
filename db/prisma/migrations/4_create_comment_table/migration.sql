-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "rid" INTEGER,
    "pid" INTEGER NOT NULL,
    "uid" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "comment" ADD CONSTRAINT "comment_rid_fkey" FOREIGN KEY ("rid") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "comment" ADD CONSTRAINT "comment_pid_fkey" FOREIGN KEY ("pid") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "comment" ADD CONSTRAINT "comment_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

comment on column comment.pid is 'post id';
comment on column comment.rid is 'Id of comment being replied to';
comment on column comment.uid is 'Optional user id, null for anonymous comments';
