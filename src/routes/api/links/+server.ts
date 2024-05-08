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
			return new Response(JSON.stringify({ type: "error", message: "No links found with the provided email address" }), { status: 404 });
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

		if (!requestData.email || requestData.email !== event.locals.email) {
			return new Response(JSON.stringify({ type: "error", message: "Must be an authenticated user" }), { status: 401 });
		}
		if (!requestData.name || !requestData.url ||!requestData.email) {
			return new Response(JSON.stringify({ type: "error", message: "Missing required fields" }), { status: 400 });
		}

        const result = await db.insert(links).values({
            name: requestData.name,
            url: requestData.url,
			email: requestData.email
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

export async function DELETE(event: RequestEvent): Promise<Response> {
	try {
		if (!event.locals.email) {
			return new Response(JSON.stringify({ type: "error", message: "Invalid token" }), { status: 401 });
		}

		let url = new URL(event.request.url);
		let linkId = url.searchParams.get("id");

		if (linkId === null) {
			return new Response(JSON.stringify({ type: "error", message: "Link ID is required" }), { status: 400 });
		}

		const result = await db.delete(links).where(eq(links.id,parseInt(linkId)));

		if (result == null) {
			return new Response(JSON.stringify({ type: "error", message: "No link found with the provided ID" }), { status: 404 });
		}
		
		return new Response(JSON.stringify({ type: "success", message: "Link deleted successfully" }), { status: 200 });

	} catch (error) {
		console.error('Error verifying Firebase ID token:', error);
		return new Response(JSON.stringify({ type: "error", message: "Internal Server Error" }), { status: 500 });
	}
}