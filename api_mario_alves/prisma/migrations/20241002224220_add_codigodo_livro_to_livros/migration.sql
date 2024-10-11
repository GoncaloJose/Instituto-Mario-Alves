/*
  Warnings:

  - You are about to drop the column `codigo` on the `livros` table. All the data in the column will be lost.
  - Added the required column `codigodoLivro` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `livros` DROP COLUMN `codigo`,
    ADD COLUMN `codigodoLivro` VARCHAR(191) NOT NULL;
