import * as dotenv from 'dotenv';
import 'dotenv/config';
import type { Config } from 'drizzle-kit';

dotenv.config()
export default {
	schema: './src/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		host: process.env.SECRET_DB_HOST || "127.0.0.1",
		port: parseInt(process.env.SECRET_DB_PORT || "3306"),
		user: process.env.SECRET_DB_USERNAME || "dev",
		password: process.env.SECRET_DB_PASSWORD || "dev",
		database: process.env.SECRET_DB_NAME || "home_dashboard",
	},
} satisfies Config;