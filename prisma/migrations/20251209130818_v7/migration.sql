/*
  Warnings:

  - The primary key for the `genreposterrel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `genreposterrel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `genreposterrel` DROP FOREIGN KEY `GenrePosterRel_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `genreposterrel` DROP FOREIGN KEY `GenrePosterRel_posterId_fkey`;

-- AlterTable
ALTER TABLE `genreposterrel` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`genreId`, `posterId`);

-- AddForeignKey
ALTER TABLE `genreposterrel` ADD CONSTRAINT `genreposterrel_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `genreposterrel` ADD CONSTRAINT `genreposterrel_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `Poster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
