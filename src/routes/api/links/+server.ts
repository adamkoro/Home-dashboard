import type { RequestEvent } from "@sveltejs/kit";
import { db } from '../../../db/db';
import { links } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent): Promise<Response> {
	try {

		if (!event.locals.email) {
			return new Response(JSON.stringify({ type: "error", message: "Invalid token" }), { status: 401 });
		}

		let url = new URL(event.request.url);
		let email = url.searchParams.get("email");

		if (!email || email !== event.locals.email) {
			return new Response(JSON.stringify({ type: "error", message: "Email parameter is required and must match the authenticated user" }), { status: 400 });
		}

		const result = await db.select().from(links).where(eq(links.email, email)).execute();

		if (result == undefined || result == null || result.length === 0) {
			return new Response(JSON.stringify({ type: "error", message: "No email or links found with the provided email address" }), { status: 404 });
		}

		return new Response(JSON.stringify({ type: "success", message: "User found", data: result }), { status: 200 });

	} catch (error) {
		console.error('Error verifying Firebase ID token:', error);
		return new Response(JSON.stringify({ type: "error", message: "Internal Server Error" }), { status: 500 });
	}
}
