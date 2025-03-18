/*
  Warnings:

  - You are about to drop the column `adminId` on the `livros` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `livros` DROP FOREIGN KEY `livros_adminId_fkey`;

-- AlterTable
ALTER TABLE `livros` DROP COLUMN `adminId`;

-- CreateTable
CREATE TABLE `_AdminToLivro` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AdminToLivro_AB_unique`(`A`, `B`),
    INDEX `_AdminToLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AdminToLivro` ADD CONSTRAINT `_AdminToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToLivro` ADD CONSTRAINT `_AdminToLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
