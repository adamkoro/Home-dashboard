import type { RequestEvent } from "@sveltejs/kit";
import { db } from '../../../db/db';
import { links } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import type { link } from "$lib/types";

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

export async function POST(event: RequestEvent): Promise<Response> {
	try {
		const requestData: link = await event.request.json();

		if (!requestData.name || !requestData.url) {
			return new Response(JSON.stringify({ type: "error", message: "Missing required fields" }), { status: 400 });
		}

		
        const result = await db.insert(links).values({
            name: requestData.name,
            url: requestData.url,
			email: event.locals.email
		});

        if (result) {
            return new Response(JSON.stringify({ type: "success", message: "Link created successfully", data: result }), { status: 201 });
        } else {
            return new Response(JSON.stringify({ type: "error", message: "Failed to create link" }), { status: 500 });
        }
    } catch (error) {
        console.error('Error handling POST request:', error);
        return new Response(JSON.stringify({ type: "error", message: "Internal Server Error" }), { status: 500 });
    }
}