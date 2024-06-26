import { int, mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';

export const links = mysqlTable('links', {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", { length: 256 }),
	url: text("url"),
	email: varchar('email', { length: 256 })
});