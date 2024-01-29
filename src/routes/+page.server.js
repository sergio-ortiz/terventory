import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { fail } from "@sveltejs/kit";

const prisma = new PrismaClient();

export function load({ cookies }) {
	const signedIn = cookies.get('signedIn');
	return {
		signedIn
	};
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		try {
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					name: data.get('name'),
				},
				select: {
					password: true
				}
			});

			const [salt, hash] = user.password.split('&');

			const hashedQuery = crypto.scryptSync(data.get('password'), salt, 64)
			const passwordBuff = Buffer.from(hash, 'hex');

			if (crypto.timingSafeEqual(hashedQuery, passwordBuff)) {
				cookies.set('signedIn', true, { path: '/' });
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
