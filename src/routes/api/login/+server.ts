import type { RequestEvent } from '@sveltejs/kit';
import { adminAuth } from '$lib/server/firebaseAdmin';

export async function POST(event: RequestEvent) {
	const requestBody = await event.request.json();
	const { idToken } = requestBody;
	const expiresIn = 60*60*24*7*1000;
	const decodedIdToken = await adminAuth.verifyIdToken(idToken);

	if (new Date().getTime()/ 1000 - decodedIdToken.auth_time < 5*60) {
		const cookie = await adminAuth.createSessionCookie(idToken,{expiresIn});
		const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/'};

		event.cookies.set('__session',cookie,options);

		return new Response(JSON.stringify({type: "success", message: "Successfully logged in" }), { status: 200 });
	} else {

		return new Response(JSON.stringify({type: "error", message: "Login is required" }), { status: 401 });
	}
}

export async function DELETE(event: RequestEvent) {
	event.cookies.delete('__session',{path: '/'});
	event.cookies.delete('userEmail',{path: '/',httpOnly: false});
	return new Response(JSON.stringify({ type: "success", message: "Successfully logged in" }), { status: 200 });
}