export function load({ cookies }) {
	const signedIn = cookies.get('signedIn');
	return {
		signedIn
	};	
}

export const actions = {
	default: async ({ cookies }) => {
		cookies.set('signedIn', true, { path: '/' });
	}
}
