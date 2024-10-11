-- CreateTable
CREATE TABLE `_ClienteToLivro` (
    `A` VARCHAR(36) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToLivro_AB_unique`(`A`, `B`),
    INDEX `_ClienteToLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClienteToLivro` ADD CONSTRAINT `_ClienteToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToLivro` ADD CONSTRAINT `_ClienteToLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
