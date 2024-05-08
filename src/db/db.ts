import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();
if (!process.env.SECRET_DB_HOST || !process.env.SECRET_DB_PORT || !process.env.SECRET_DB_USERNAME || !process.env.SECRET_DB_PASSWORD || !process.env.SECRET_DB_NAME) {
	throw new Error('Database configuration is missing, check the env variables');
}

export const connection = mysql.createConnection({
	host: process.env.SECRET_DB_HOST,
	user: process.env.SECRET_DB_USERNAME,
	password: process.env.SECRET_DB_PASSWORD,
	database: process.env.SECRET_DB_NAME ,
	port: parseInt(process.env.SECRET_DB_PORT)
});

export const db = drizzle(connection);
