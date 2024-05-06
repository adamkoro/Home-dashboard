import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';

const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
