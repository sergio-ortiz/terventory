export function load({ cookies }) {
	if (!cookies.get('admin')) {
		cookies.set('admin', false, { path: '/' });
	}
}
