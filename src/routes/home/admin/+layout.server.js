import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	if (cookies.get('admin') === 'false') {
		redirect(307, '/home');
	}
}
