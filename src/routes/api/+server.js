import { json } from '@sveltejs/kit';

export async function DELETE({ cookies }) {
	cookies.delete('session', { path: '/' });

	return json(cookies.get('session'));
}
