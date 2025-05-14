/*
  Warnings:

  - You are about to drop the column `ano` on the `editoras` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `editoras` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `editoras` table. All the data in the column will be lost.
  - You are about to drop the column `edicao` on the `editoras` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `editoras` DROP COLUMN `ano`,
    DROP COLUMN `cnpj`,
    DROP COLUMN `descricao`,
    DROP COLUMN `edicao`;
