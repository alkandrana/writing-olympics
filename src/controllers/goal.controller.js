import { prisma } from '../../lib/prisma.js';
import { formatDate } from '../../lib/dateLib.js'

const goalClient = prisma.goal;

// /goals
export const getAllGoals = async (req, res) => {
	try {
		const allGoals = await goalClient.findMany({
			include: {
				sessions: true
			},
		});
    console.log(allGoals);
    res.render("goals/index", { goals: allGoals })
	} catch (e) {
		console.log(e);
	}
};

// get unique
// /goals/id
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
        console.log(goal);
		res.render("goals/details", { goal: goal });
	} catch (e) {
		console.log(e);
	}
};
// goals/edit/id
export const editGoal = async (req, res) => {
    const goalId = parseInt(req.params.id);
    if (isNaN(goalId)) {
        return res.status(400).send("Invalid Goal ID");
    }

    try {
        const goal = await goalClient.findUnique({
            where: {
                id: goalId,
            }
        });
        // format dates
        let dates = [goal.start, goal.stop];
        for (let i= 0; i < dates.length; i++) {
            let year = dates[i].getFullYear();
            let day = String(dates[i].getDate()).padStart(2, "0");
            let month = String(dates[i].getMonth() + 1).padStart(2, "0");
            dates[i] =  `${year}-${month}-${day}`;
        }
        goal.start = dates[0];
        goal.stop = dates[1];

        res.render("goals/edit", { goal: goal});
    } catch (e) {
        console.log(e);
    }
};

// add
// goals/add/
export const createGoal = async (req, res) => {
	let target = parseInt(req.body.target);
    if (isNaN(target)){
        return res.render("add", { goal: req.body, message: "Target must be a nonnegative whole number."});
    } else {
        req.body.target = target;
    }
    let startDate = formatDate(req.body.start);
    let endDate = formatDate(req.body.stop);
    // validate dates
    if (startDate === "Invalid date" || endDate === "Invalid date") {
        return res.redirect('add', {
            goal: req.body,
            message: "Invalid date. Make sure dates are in the format: 'YYYY-MM-DD'"
        });
    } else {
        // convert date properties to proper format
        req.body.start = startDate;
        req.body.stop = endDate;
        req.body.target = target;
    }
    console.log(req.body);
    try {
		const goalData = req.body
		const goal = await goalClient.create({
			data: goalData,
		});

		res.redirect("/goals");

	} catch (e) {
		console.log(e);
	}
};

// update
export const updateGoal = async (req, res) => {
    const goalId = parseInt(req.params.id);
    let target = parseInt(req.body.target);
	if (isNaN(goalId) || isNaN(target)) {
		return res.status(400).send('Not  a number');
	}

    let startDate = formatDate(req.body.start);
    let endDate = formatDate(req.body.stop);
    // validate dates
    if (startDate === "Invalid date" || endDate === "Invalid date") {
        return res.redirect('goals/edit', {
            goal: req.body,
            message: "Invalid date. Make sure dates are in the format: 'YYYY-MM-DD'"
        });
    } else {
        // convert date properties to proper format
        req.body.start = startDate;
        req.body.stop = endDate;
        req.body.target = target;
    }

    try {
        const goalData = req.body;
        const goal = await goalClient.update({
            where: {
                id: goalId,
            },
            data: goalData,
        });
    } catch (e) {
        console.log(e);
    }
    res.redirect(`/goals/${goalId}`);
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
