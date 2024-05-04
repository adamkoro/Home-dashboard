import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

export const DATABASE_HOST = process.env.DB_HOST;
export const DATABASE_PORT = process.env.DB_PORT;
export const DATABASE_USER = process.env.DB_USERNAME;
export const DATABASE_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE_NAME = process.env.DB_NAME;

if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME || !DATABASE_PORT) {
	throw new Error('Database configuration is missing, check the env variables');
}

export const connection = mysql.createConnection({
	host: DATABASE_HOST,
	user: DATABASE_USER,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
	port: DATABASE_PORT
});

export const db = drizzle(connection);
