import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } from './src/db/db';

export default {
	schema: './src/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		user: DATABASE_USER,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME,
	},
} satisfies Config;