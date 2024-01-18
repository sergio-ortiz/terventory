import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
	const admin = await prisma.user.findUnique({
		where: {
			id: 1
		},
		select: {
			name: true
		}
	});

	return json(admin.name);
}
