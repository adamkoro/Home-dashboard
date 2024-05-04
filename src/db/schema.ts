import { int, mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
	id: int('id').primaryKey(),
	githubId: varchar('github_id', { length: 255 }).unique(),
	username: varchar('username', { length: 255 }),
	email: varchar('email', { length: 255 }).unique(),
	accessToken: text('access_token')
});

export const links = mysqlTable('links', {
	id: int("id").primaryKey(),
	name: varchar("name", { length: 256 }),
	url: text("url"),
	userId: int('user_id').references(() => users.id)
});