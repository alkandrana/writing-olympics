import { prisma } from '../../lib/prisma.js';

const goalClient = prisma.goal;

// get all
export const getAllGoals = async (req, res) => {
	try {
		const allGoals = await goalClient.findMany({
			include: {
				sessions: true
			},
		});
		res.status(200).json({data: allGoals});
	} catch (e) {
		console.log(e);
	}
};

// get unique
export const getGoalById = async (req, res) => {
	const goalId = parseInt(req.params.id);
	if (isNaN(goalId)){
		return res.status(400).send('Invalid goal ID');
	}

	try {
		const goal = await goalClient.findUnique({
			where: {
				id: goalId,
			},
			include: {
				sessions: true,
			},
		});

		res.status(200).json({ data: goal });
	} catch (e) {
		console.log(e);
	}
};

// add
export const createGoal = async (req, res) => {
	try {
		const goalData = req.body
		const goal = await goalClient.create({
			data: goalData,
		});

		res.status(200).json({ data: goal });
	} catch (e) {
		console.log(e);
	}
};

// update
export const updateGoal = async (req, res) => {
	const goalId = parseInt(req.params.id);
	if (isNaN(goalId)){
		return res.status(400).send('Invalid goal ID');
	}

	try {
		const goalData = req.body;
		const goal = await goalClient.update({
			where: {
				id: goalId,
			},
			data: goalData,
		});

		res.status(200).json({ data: goal });
	} catch (e) {
		console.log(e);
	}
};

// delete
export const deleteGoal = async (req, res) => {
	const goalId = parseInt(req.params.id);
	if (isNaN(goalId)){
		return res.status(400).send('Invalid goal ID');
	}

	try {
		const goal = await goalClient.delete({
			where: {
				id: goalId,
			},
		});

		res.status(200).json({ data: {} });
	} catch (e) {
		console.log(e);
	}
};
