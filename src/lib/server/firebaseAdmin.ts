import { SECRET_FIREBASE_ADMIN_PROJECT_ID, SECRET_FIREBASE_ADMIN_PRIVATE_KEY, SECRET_FIREBASE_ADMIN_CLIENT_EMAIL } from '$env/static/private';
import { getAuth } from 'firebase-admin/auth';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
			credential: pkg.credential.cert({
				projectId: SECRET_FIREBASE_ADMIN_PROJECT_ID,
				clientEmail: SECRET_FIREBASE_ADMIN_CLIENT_EMAIL,
				privateKey: SECRET_FIREBASE_ADMIN_PRIVATE_KEY,
			}),
		});
} catch (err) {
	console.error('Firebase Admin Error: ', err)
}

const adminAuth = getAuth();
export { adminAuth };