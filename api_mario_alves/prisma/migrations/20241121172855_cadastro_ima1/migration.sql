/*
  Warnings:

  - You are about to drop the `logreservas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `logreservas`;

-- CreateTable
CREATE TABLE `cadastros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `confirmaSenha` VARCHAR(60) NOT NULL,
    `nome` VARCHAR(60) NOT NULL,
    `escolaridade` VARCHAR(60) NOT NULL,
    `telefone` VARCHAR(60) NOT NULL,
    `escolariedade` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    UNIQUE INDEX `cadastros_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cadastros` ADD CONSTRAINT `cadastros_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
