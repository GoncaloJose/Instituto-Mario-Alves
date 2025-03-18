/*
  Warnings:

  - The primary key for the `renovacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigodoLivro` on the `renovacoes` table. All the data in the column will be lost.
  - You are about to drop the column `datadaRenovacao` on the `renovacoes` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `renovacoes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.

*/
-- AlterTable
ALTER TABLE `renovacoes` DROP PRIMARY KEY,
    DROP COLUMN `codigodoLivro`,
    DROP COLUMN `datadaRenovacao`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
