/*
  Warnings:

  - You are about to drop the column `escolariedade` on the `cadastros` table. All the data in the column will be lost.
  - Added the required column `instituicao` to the `cadastros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cadastros` DROP COLUMN `escolariedade`,
    ADD COLUMN `instituicao` VARCHAR(60) NOT NULL;
