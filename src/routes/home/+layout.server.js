import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function load({ cookies, url }) {
	const success = url.searchParams.has('success');
	const session = cookies.get('session');

	try {
		const { name, role } = await prisma.user.findUniqueOrThrow({
			where: { session },
			select: {
				name: true,
				role: true
			}
		});

		return {
			name,
			role,
			success
		};
	} catch (error) {
		redirect(302, '/');
	}
}
