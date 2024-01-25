import { json } from '@sveltejs/kit';

export async function DELETE({ cookies }) {
	cookies.delete('signedIn', { path: '/' });
	
	return json(cookies.get('signedIn'));
}
