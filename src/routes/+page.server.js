import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { fail } from '@sveltejs/kit';

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
			session,
			name,
			role
		};
	} else {
		return {
			session
		};
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const password = data.get('password');

		try {
			const { password: dbHash } = await prisma.user.findUniqueOrThrow({
				where: { name },
				select: {
					password: true
				}
			});

			const [salt, hash] = dbHash.split('&');

			const hashedPassword = crypto.scryptSync(password, salt, 64);
			const hashBuff = Buffer.from(hash, 'hex');
			const match = crypto.timingSafeEqual(hashedPassword, hashBuff);

			if (match) {
				const { session } = await prisma.user.update({
					where: { name },
					data: { session: crypto.randomUUID() },
					select: { session: true }
				});

				cookies.set('session', session, { path: '/' });
			} else {
				throw new Error();
			}
		} catch (error) {
			return fail(422, {
				error: 'Incorrect username and password.'
			});
		}
	}
};
