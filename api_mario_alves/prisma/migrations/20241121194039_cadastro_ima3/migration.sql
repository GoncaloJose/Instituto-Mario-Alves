/*
  Warnings:

  - You are about to drop the column `clienteId` on the `cadastros` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cadastros` DROP FOREIGN KEY `cadastros_clienteId_fkey`;

-- AlterTable
ALTER TABLE `cadastros` DROP COLUMN `clienteId`;

-- CreateTable
CREATE TABLE `_ClienteTocadastro` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteTocadastro_AB_unique`(`A`, `B`),
    INDEX `_ClienteTocadastro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClienteTocadastro` ADD CONSTRAINT `_ClienteTocadastro_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteTocadastro` ADD CONSTRAINT `_ClienteTocadastro_B_fkey` FOREIGN KEY (`B`) REFERENCES `cadastros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
