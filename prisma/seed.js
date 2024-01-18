import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const admin = await prisma.user.create({
		data: {
			name: 'Frank',
			role: 'admin',
			password: 'Aquas123$'
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
