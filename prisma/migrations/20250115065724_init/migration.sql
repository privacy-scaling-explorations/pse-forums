/*
  Warnings:

  - Added the required column `pwd` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pwd" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL;
