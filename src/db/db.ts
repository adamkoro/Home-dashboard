import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import { SECRET_DB_HOST, SECRET_DB_PORT, SECRET_DB_USERNAME, SECRET_DB_PASSWORD, SECRET_DB_NAME } from '$env/static/private';

if (!SECRET_DB_HOST || !SECRET_DB_PORT || !SECRET_DB_USERNAME || !SECRET_DB_PASSWORD || !SECRET_DB_NAME) {
	throw new Error('Database configuration is missing, check the env variables');
}

export const connection = mysql.createConnection({
	host: SECRET_DB_HOST,
	user: SECRET_DB_USERNAME,
	password: SECRET_DB_PASSWORD,
	database: SECRET_DB_NAME ,
	port: parseInt(SECRET_DB_PORT)
});

export const db = drizzle(connection);
