import { prisma } from './lib/prisma.js'

async function main() {
	const goal = await prisma.goal.create({
		data: {
			title: 'RDC 2025',
			start: '2025-11-01T00:00:00.000-08:00',
			stop: '2025-11-30T00:00:00.000-08:00',
			target: 40000,
			sessions: {
				create: {
					start: '2025-11-01T12:48:00.000-08:00',
					stop: '2025-11-01T13:23:00.000-08:00',
					words: 1808
				},
			},
		},
		include: {
			sessions: true,
		},
	})
	console.log('Created goal:', goal)

	// Fetch all users with their posts
	const allGoals = await prisma.goal.findMany({
		include: {
			sessions: true,
		},
	})
	console.log('All goals:', JSON.stringify(allGoals, null, 2))
}

main()
.then(async () => {
	await prisma.$disconnect()
})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
