CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER,
    "title" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "content_min_length" CHECK (char_length(content) >= 10)
);

CREATE UNIQUE INDEX "post_uid_key" ON "post"("uid");

ALTER TABLE "post" ADD CONSTRAINT "post_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

comment on column post.uid is 'Optional user ID; null for anonymous posts';
