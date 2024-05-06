import { db } from '../../../db/db';
import type {RequestEvent} from "@sveltejs/kit";
import type {ApiResponse} from '../types';
import { links } from '../../../db/schema';

import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent) {
		let url = new URL(event.request.url)
		let userID = url.searchParams.get("userid")

		if (!userID) {
			const rpMessage: ApiResponse = {
					type: "error",
					message: "User is required",
					data: null
			}
			return new Response( JSON.stringify(rpMessage),{ status: 400 });
		}

		try {
			const result = await db.select().from(links).where(eq(links.userId, parseInt(userID))).execute();

			if (result.length === 0) {
				const rpMessage: ApiResponse = {
					type: "error",
					message: "No user or links found with the provided user id",
					data: null
				};
				return new Response(JSON.stringify(rpMessage), { status: 404 });
			}

			const rpMessage: ApiResponse = {
				type: "success",
				message: "User found",
				data: result
			};
			return new Response(JSON.stringify(rpMessage), { status: 200 });
		} catch (error) {
			console.error('Database query failed:', error);
			const rpMessage: ApiResponse = {
				type: "error",
				message: "Internal Server Error",
				data: null
			};
			return new Response(JSON.stringify(rpMessage), { status: 500 });
		}
}

export async function POST(event: RequestEvent) {

}