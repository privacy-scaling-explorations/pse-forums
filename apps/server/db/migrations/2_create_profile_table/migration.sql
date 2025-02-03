CREATE TABLE "profile" (
  "id" INTEGER NOT NULL,
  "about" TEXT,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "username" TEXT NOT NULL,
  "url" TEXT,
  CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

ALTER TABLE "profile"
ADD
  CONSTRAINT "profile_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;
