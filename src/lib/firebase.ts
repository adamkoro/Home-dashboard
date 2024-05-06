import { initializeApp, } from "firebase/app";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { writable, } from 'svelte/store';
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';

const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CONFIG);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

function userStore() {
	let unsubscribe: () => void;
	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user)
		});
		return () => unsubscribe();
	});
	return {
		subscribe,
	}
}

export const user = userStore()