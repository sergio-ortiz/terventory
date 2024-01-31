import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function genHash(input) {
	const salt = crypto.randomBytes(64).toString('hex');
	const hashedPassword = crypto.scryptSync(input, salt, 64).toString('hex');

	return `${salt}&${hashedPassword}`;
}

async function main() {
	const users = await prisma.user.createMany({
		data: [
			{ name: 'Frank', role: 'admin', password: genHash('Aquas123$') },
			{ name: 'Nico', role: 'employee', password: genHash('pass') },
		],
		skipDuplicates: true
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
