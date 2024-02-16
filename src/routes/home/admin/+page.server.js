import crypto from 'crypto';
import { fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const password = data.get('password');
		const role = data.get('role');

		const salt = crypto.randomBytes(64).toString('hex');
		const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');

		const dbPass = `${salt}&${hashedPassword}`;

		try {
			const user = await prisma.user.create({
				data: {
					name,
					password: dbPass,
					role
				}
			});
			if (user) {
				return {
					success: 'User successfully created.'
				};
			}
		} catch (error) {
			if (error.code === 'P2002') {
				return fail(422, {
					error: 'Username already taken.'
				});
			}
		}
	}
};
