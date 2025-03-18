/*
  Warnings:

  - You are about to drop the column `clienteId` on the `reservas` table. All the data in the column will be lost.
  - You are about to drop the column `livroId` on the `reservas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `reservas_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `reservas_livroId_fkey`;

-- AlterTable
ALTER TABLE `reservas` DROP COLUMN `clienteId`,
    DROP COLUMN `livroId`;

-- CreateTable
CREATE TABLE `_LivroToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LivroToReserva_AB_unique`(`A`, `B`),
    INDEX `_LivroToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClienteToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToReserva_AB_unique`(`A`, `B`),
    INDEX `_ClienteToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LivroToReserva` ADD CONSTRAINT `_LivroToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LivroToReserva` ADD CONSTRAINT `_LivroToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToReserva` ADD CONSTRAINT `_ClienteToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToReserva` ADD CONSTRAINT `_ClienteToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
