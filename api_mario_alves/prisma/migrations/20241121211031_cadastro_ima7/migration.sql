/*
  Warnings:

  - You are about to drop the `_clientetocadastro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_clientetocadastro` DROP FOREIGN KEY `_ClienteTocadastro_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetocadastro` DROP FOREIGN KEY `_ClienteTocadastro_B_fkey`;

-- DropTable
DROP TABLE `_clientetocadastro`;

-- CreateTable
CREATE TABLE `_CadastroToCliente` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CadastroToCliente_AB_unique`(`A`, `B`),
    INDEX `_CadastroToCliente_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CadastroToCliente` ADD CONSTRAINT `_CadastroToCliente_A_fkey` FOREIGN KEY (`A`) REFERENCES `cadastros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CadastroToCliente` ADD CONSTRAINT `_CadastroToCliente_B_fkey` FOREIGN KEY (`B`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
