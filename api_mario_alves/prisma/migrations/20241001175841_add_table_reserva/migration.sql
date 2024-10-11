-- CreateTable
CREATE TABLE `reservas` (
    `id` VARCHAR(36) NOT NULL,
    `codigodoLivro` VARCHAR(191) NOT NULL,
    `datadaReserva` VARCHAR(10) NOT NULL,
    `datadaEntrega` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
