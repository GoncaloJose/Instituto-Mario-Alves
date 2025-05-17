/*
  Warnings:

  - You are about to drop the column `autor` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `editora` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `gereno` on the `livros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `livros` DROP COLUMN `autor`,
    DROP COLUMN `editora`,
    DROP COLUMN `gereno`;
