import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
	try {
		if (!event.locals.email) {
			return new Response(JSON.stringify({ type: "error", message: "Invalid token" }), { status: 401 });
		}

		let url = new URL(event.request.url);
		let linkCheck = url.searchParams.get("url");

		if (!linkCheck) {
			return new Response(JSON.stringify({ type: "error", message: "Url parameter is required and must match the authenticated user" }), { status: 400 });
		}

		const response = await fetch(linkCheck, {
			method: 'GET'
		})

		if (!response.ok) {
			return new Response(JSON.stringify({ type: "error", message: "Link is not available" }), { status: 400 });
		}

		return new Response(JSON.stringify({ type: "success", message: "Link is available" }), { status: 200 });

	} catch (error) {
		console.error('Error verifying Firebase ID token:', error);
		return new Response(JSON.stringify({ type: "error", message: "Internal Server Error" }), { status: 500 });
	}
}