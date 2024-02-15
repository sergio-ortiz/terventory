import crypto from 'crypto';
import { fail, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function load({ cookies }) {
	const session = cookies.get('session');

	if (session) {
		redirect(307, '/home');
	}
}

export const actions = {
	signin: async ({ cookies, request }) => {
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
				throw new Error('crypto timing safe equal returned false');
			}
		} catch (error) {
			console.log(error);

			return fail(422, {
				error: 'Incorrect username and password.'
			});
		}
	},
	signout: ({ cookies }) => {
		cookies.delete('session', { path: '/' });
	}
};
