-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `reservas_livroId_fkey`;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
