/*
  Warnings:

  - The primary key for the `Rate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Rate_pkey" PRIMARY KEY ("score", "type", "authorId", "id");
