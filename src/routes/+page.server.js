import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function load({ cookies }) {
	const session = cookies.get('session');

	if (session) {
		const { name, role } = await prisma.user.findUnique({
			where: { session },
			select: {
				name: true,
				role: true
			}
		});

		return {
			name,
			role
		};
	} else {
		redirect(302, '/login');
	}
}

export const actions = {
	default: ({ cookies }) => {
		cookies.delete('session', { path: '/' });
		redirect(302, '/login');
	}
};
