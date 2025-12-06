import { prisma } from '../../lib/prisma.js';
import { formatDate } from '../../lib/dateLib.js'

const sessionClient = prisma.session;
const goalClient = prisma.goal;

// /sessions by goal
export const getSessionsByGoal = async (req, res) => {
	try {
		const allSessions = await sessionClient.findMany({
      where: {
        goalId: req.id,
			}
		});
    console.log(allSessions);
    res.render(`goals/details/${req.id}`, { sessions: allSessions })
	} catch (e) {
		console.log(e);
	}
};

// get add form 
// /sessions/add
export const addSession = async (req, res) => {
	try {
		const goals = await goalClient.findMany({});
    // console.log(goal);
    console.log(goals);
		res.render("sessions/add", { goals: goals });
	} catch (e) {
		console.log(e);
	}
};

// goals/edit/id
export const editSession = async (req, res) => {
    const sessionId = parseInt(req.params.id);
    if (isNaN(sessionId)) {
        return res.status(400).send("Invalid Session ID");
    }

    try {
        const session = await sessionClient.findUnique({
            where: {
                id: sessionId,
            }
        });
        res.render("goals/edit", { goal: goal});
    } catch (e) {
        console.log(e);
    }
};

// add
// goals/add/
export const createSession = async (req, res) => {
	let words = parseInt(req.body.words);
  let goalId = parseInt(req.body.goalId);
  if (isNaN(words)){
      return res.status(400).send("Words must be a nonnegative whole number.");
  } else {
        req.body.words = words;
        req.body.goalId = goalId;
    }
    let startTime = new Date(req.body.start);
    let endTime = new Date(req.body.stop);
    // validate dates
    if (startTime === "Invalid Date" || endTime === "Invalid Date") {
        return res.status(400).send("Invalid date. Make sure dates are in the format: 'YYYY-MM-DD'");
    } else {
        // convert date properties to proper format
        req.body.start = startTime;
        req.body.stop = endTime;
        req.body.words = words;
    }
    console.log(req.body);
    try {
      const sessionData = req.body
      const session = await sessionClient.create({
        data: sessionData,
		});

		res.redirect("/sessions");

	} catch (e) {
		console.log(e);
	}
};

// update
export const updateSession = async (req, res) => {
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
export const deleteSession = async (req, res) => {
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
