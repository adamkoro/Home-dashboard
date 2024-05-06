import { adminAuth } from '$lib/server/firebaseAdmin';
import type { RequestEvent } from "@sveltejs/kit";
import { db } from '../../../db/db';
import { links } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent): Promise<Response> {
	const token = event.request.headers.get('Authorization')?.split('Bearer ')[1];

	if (!token) {
		return new Response(JSON.stringify({ type: "error", message: "Authorization token is required" }), { status: 401 });
	}

	try {
		// Verify the Firebase ID token
		const decodedToken = await adminAuth.verifyIdToken(token);
		const userEmail = decodedToken.email;

		if (!userEmail) {
			return new Response(JSON.stringify({ type: "error", message: "Invalid token" }), { status: 401 });
		}

		// Proceed with your original logic
		let url = new URL(event.request.url);
		let email = url.searchParams.get("email");

		if (!email || email !== userEmail) {
			return new Response(JSON.stringify({ type: "error", message: "Email parameter is required and must match the authenticated user" }), { status: 400 });
		}

		const result = await db.select().from(links).where(eq(links.email, email)).execute();

		if (result == null) {
			return new Response(JSON.stringify({ type: "error", message: "No email or links found with the provided email address" }), { status: 404 });
		}

		return new Response(JSON.stringify({ type: "success", message: "User found", data: result }), { status: 200 });

	} catch (error) {
		console.error('Error verifying Firebase ID token:', error);
		return new Response(JSON.stringify({ type: "error", message: "Internal Server Error" }), { status: 500 });
	}
}
