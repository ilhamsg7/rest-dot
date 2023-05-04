-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `base` VARCHAR(191) NOT NULL,
    `founded` VARCHAR(191) NULL,
    `chasis` VARCHAR(191) NOT NULL,
    `entryYear` INTEGER NOT NULL,
    `power_unit_id` VARCHAR(191) NOT NULL,
    `principal_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Team_id_key`(`id`),
    UNIQUE INDEX `Team_power_unit_id_key`(`power_unit_id`),
    UNIQUE INDEX `Team_principal_id_key`(`principal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PowerUnit` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PowerUnit_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Principal` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Principal_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `place_of_birth` VARCHAR(191) NOT NULL,
    `date_of_birth` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `team_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Driver_id_key`(`id`),
    UNIQUE INDEX `Driver_team_id_key`(`team_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_power_unit_id_fkey` FOREIGN KEY (`power_unit_id`) REFERENCES `PowerUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_principal_id_fkey` FOREIGN KEY (`principal_id`) REFERENCES `Principal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
