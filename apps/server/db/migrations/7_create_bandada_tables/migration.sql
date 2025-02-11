-- Original schema: https://github.com/bandada-infra/bandada/blob/main/database/seed.sql
-- With some slight changes:
-- Enabling API for all admins, generating automatically API keys as UUIDs
-- Automatically syncing admin with user table via psql trigger

CREATE SCHEMA IF NOT EXISTS "bandada";
comment on schema bandada is 'Tables required for self-hosted Bandada API (https://bandada.pse.dev/)';

CREATE TABLE "bandada"."admins" (
    "id" INTEGER NOT NULL,
    -- "address" VARCHAR NOT NULL DEFAULT 'unused',
    "username" TEXT NOT NULL,
    "api_key" UUID NOT NULL DEFAULT gen_random_uuid(),
    "api_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bandada"."groups" (
    "id" VARCHAR(32) NOT NULL,
    "gid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "tree_depth" INTEGER NOT NULL DEFAULT 16,
    "fingerprint_duration" INTEGER NOT NULL DEFAULT 3600,
    "credentials" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bandada"."invites" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR NOT NULL,
    "is_redeemed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "group_id" VARCHAR(32),

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bandada"."members" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
comment on column bandada.members.id is 'Semaphore ID commitment';

CREATE TABLE "bandada"."memberships" (
    "group" VARCHAR(32) NOT NULL,
    "member" VARCHAR NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("group","member")
);
comment on column bandada.memberships.member is 'Semaphore ID commitment';

CREATE TABLE "bandada"."oauth_accounts" (
    "accountHash" VARCHAR NOT NULL,
    "group_id" VARCHAR(32),

    CONSTRAINT "oauth_accounts_pkey" PRIMARY KEY ("accountHash")
);

CREATE UNIQUE INDEX "admins_api_key_key" ON "bandada"."admins"("api_key");
-- CREATE UNIQUE INDEX "admins_address_key" ON "bandada"."admins"("address");
CREATE UNIQUE INDEX "admins_username_key" ON "bandada"."admins"("username");
CREATE UNIQUE INDEX "groups_admin_id_key" ON "bandada"."groups"("admin_id");
CREATE UNIQUE INDEX "groups_gid_key" ON "bandada"."groups"("gid");
CREATE INDEX "memberships_member_idx" ON "bandada"."memberships"("member" text_ops);
CREATE INDEX "memberships_group_idx" ON "bandada"."memberships"("group" text_ops);
CREATE UNIQUE INDEX "oauth_accounts_accountHash_group_id_key" ON "bandada"."oauth_accounts"("accountHash", "group_id");

ALTER TABLE "public"."group" ADD CONSTRAINT "group_aid_user_fkey" FOREIGN KEY ("aid") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."group" ADD CONSTRAINT "group_aid_bandada_admin_fkey" FOREIGN KEY ("aid") REFERENCES "bandada"."admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "bandada"."admins" ADD CONSTRAINT "admins_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "bandada"."groups" ADD CONSTRAINT "groups_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "bandada"."admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "bandada"."groups" ADD CONSTRAINT "groups_gid_fkey" FOREIGN KEY ("gid") REFERENCES "public"."group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "bandada"."invites" ADD CONSTRAINT "invites_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "bandada"."groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "bandada"."memberships" ADD CONSTRAINT "memberships_group_fkey" FOREIGN KEY ("group") REFERENCES "bandada"."groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "bandada"."memberships" ADD CONSTRAINT "memberships_member_fkey" FOREIGN KEY ("member") REFERENCES "bandada"."members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "bandada"."oauth_accounts" ADD CONSTRAINT "oauth_accounts_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "bandada"."groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
