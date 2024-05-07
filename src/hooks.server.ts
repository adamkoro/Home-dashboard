import { adminAuth } from '$lib/server/firebaseAdmin';
import { type Handle, redirect } from '@sveltejs/kit';

export const handle = (async ({event, resolve}) => {
	const sessionCookie = event.cookies.get('__session');
	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
		event.locals.userToken = decodedClaims
		event.locals.email = decodedClaims.email;
	} catch (e) {
		event.locals.email = undefined;
		if (event.url.pathname !== '/login' && !event.url.pathname.startsWith('/api/')) {
			redirect(301, "/login")
		}

	}
	return resolve(event);
}) satisfies Handle;