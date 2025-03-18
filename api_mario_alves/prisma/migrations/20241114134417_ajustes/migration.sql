/*
  Warnings:

  - The primary key for the `reservas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `reservas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.

*/
-- AlterTable
ALTER TABLE `reservas` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
