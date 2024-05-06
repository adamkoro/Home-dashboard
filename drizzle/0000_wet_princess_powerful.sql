CREATE TABLE `links` (
	`id` int NOT NULL,
	`name` varchar(256),
	`url` text,
	`email` varchar(256),
	CONSTRAINT `links_id` PRIMARY KEY(`id`),
	CONSTRAINT `links_email_unique` UNIQUE(`email`)
);
