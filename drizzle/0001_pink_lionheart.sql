CREATE TABLE `users` (
	`id` int NOT NULL,
	`github_id` varchar(255),
	`username` varchar(255),
	`email` varchar(255),
	`access_token` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_github_id_unique` UNIQUE(`github_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `links` ADD `user_id` int;--> statement-breakpoint
ALTER TABLE `links` ADD CONSTRAINT `links_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;