export function load({ cookies }) {
	if (!cookies.get('admin')) {
		console.log('no admin cookie');
		cookies.set('admin', false, { path: '/' });
	}
}
