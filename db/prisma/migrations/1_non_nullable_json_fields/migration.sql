/*
  Making the JSON fields non-nullable is necessary because of prisma-client-rust bug
  https://github.com/Brendonovich/prisma-client-rust/issues/297
*/
/*
  Warnings:

  - Made the column `payload` on table `audit_log_entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `web_authn_session_data` on table `mfa_challenges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `web_authn_credential` on table `mfa_factors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attribute_mapping` on table `saml_providers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `raw_app_meta_data` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `raw_user_meta_data` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "auth"."audit_log_entries" ALTER COLUMN "payload" SET NOT NULL,
ALTER COLUMN "payload" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "auth"."mfa_challenges" ALTER COLUMN "web_authn_session_data" SET NOT NULL,
ALTER COLUMN "web_authn_session_data" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "auth"."mfa_factors" ALTER COLUMN "web_authn_credential" SET NOT NULL,
ALTER COLUMN "web_authn_credential" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "auth"."saml_providers" ALTER COLUMN "attribute_mapping" SET NOT NULL,
ALTER COLUMN "attribute_mapping" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "auth"."users" ALTER COLUMN "raw_app_meta_data" SET NOT NULL,
ALTER COLUMN "raw_app_meta_data" SET DEFAULT '{}',
ALTER COLUMN "raw_user_meta_data" SET NOT NULL,
ALTER COLUMN "raw_user_meta_data" SET DEFAULT '{}';
