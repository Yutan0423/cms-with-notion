/*
  Warnings:

  - You are about to drop the column `nickName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nickName",
ADD COLUMN     "nickname" TEXT;

-- DropTable
DROP TABLE "Task";
