import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const salt = crypto.randomBytes(64).toString('hex');
	const hashedPassword = crypto.scryptSync('Aquas123$', salt, 64).toString('hex');

	console.log(`${salt}&${hashedPassword}`)
	
	const admin = await prisma.user.create({
		data: {
			name: 'Frank',
			role: 'admin',
			password: `${salt}&${hashedPassword}`
		}
	});

	console.log(admin);
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
