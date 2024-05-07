// See https://kit.svelte.dev/docs/types#app

import type { DecodedIdToken } from "firebase-admin/auth";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userToken: DecodedIdToken | undefined;
			email: string | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
