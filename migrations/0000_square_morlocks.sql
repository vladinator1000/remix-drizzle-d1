CREATE TABLE `colors` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`hexCode` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `manufacturers` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`country` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`slug` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`currency` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`quantity` real NOT NULL,
	`quantityUnitType` text NOT NULL,
	`weightGrams` real NOT NULL,
	`colorId` integer NOT NULL,
	`manufacturerId` integer NOT NULL,
	`model` text NOT NULL,
	`content` text NOT NULL,
	`fiberQuantity` integer NOT NULL,
	`metersPer100gPer1Fiber` integer NOT NULL,
	`metersPer100gPerAllFibers` integer NOT NULL,
	FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `slugIndex` ON `products` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `nameIndex` ON `products` (`name`);