import type { PageServerLoad } from './$types';
import { adminAuth } from '$lib/server/firebaseAdmin';
import { redirect } from '@sveltejs/kit';

export const load = (async ({cookies}) => {
	const sessionCookie = cookies.get('__session');
	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
	} catch (e) {
			redirect(301, "/login")
	}
}) satisfies PageServerLoad;