/*
  Warnings:

  - You are about to drop the `_editoratolivro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `editoraId` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_editoratolivro` DROP FOREIGN KEY `_EditoraToLivro_A_fkey`;

-- DropForeignKey
ALTER TABLE `_editoratolivro` DROP FOREIGN KEY `_EditoraToLivro_B_fkey`;

-- AlterTable
ALTER TABLE `livros` ADD COLUMN `editoraId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_editoratolivro`;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_editoraId_fkey` FOREIGN KEY (`editoraId`) REFERENCES `editoras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
