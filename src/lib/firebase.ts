import { initializeApp, } from "firebase/app";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { writable, } from 'svelte/store';


const firebaseConfig = {
	// This is not the best implementation I know, but for the demo, this is required
	apiKey: "AIzaSyCZbF5Rgm9-f3sHlvvLjzDmbskdDSWqpTQ",
	authDomain: "home-dashboard-b46e5.firebaseapp.com",
	projectId: "home-dashboard-b46e5",
	storageBucket: "home-dashboard-b46e5.appspot.com",
	messagingSenderId: "572961206401",
	appId: "1:572961206401:web:46263c158839ee9faa9d80"
};

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