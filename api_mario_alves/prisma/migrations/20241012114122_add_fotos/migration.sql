-- CreateTable
CREATE TABLE `fotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `autor` VARCHAR(191) NOT NULL,
    `codigoFoto` LONGTEXT NOT NULL,
    `livroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fotos_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
