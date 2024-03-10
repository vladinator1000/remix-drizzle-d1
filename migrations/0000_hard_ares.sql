CREATE TABLE `products` (
	`slug` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `slugIndex` ON `products` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `nameIndex` ON `products` (`name`);