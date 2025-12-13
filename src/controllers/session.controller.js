import { prisma } from '../../lib/prisma.js';
import { formatDate } from '../../lib/dateLib.js'

const sessionClient = prisma.session;
const goalClient = prisma.goal;

// /sessions by goal
export const getSessionsByGoal = async (req, res) => {
	try {
		const allSessions = await sessionClient.findMany({
      where: {
        goalId: req.idTime
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
      const goals = await goalClient.findMany({});
      console.log(session);
      const options = {
        hour12: false
      };
      let startTime = session.start.toLocaleTimeString('en-us', options);
      let stopTime = session.stop.toLocaleTimeString('en-us', options);
      let date = session.start.toISOString().split('T')[0];
     
      const formSession = {
        id: session.id,
        date: date,
        start: startTime, 
        stop: stopTime,
        words: session.words.toLocaleString(),
        sceneId: session.sceneId,
        goalId: session.goalId
      }
      res.render("sessions/edit", { session: formSession, goals: goals});
    } catch (e) {
        console.log(e);
    }
};

// add
// goals/add/
export const createSession = async (req, res) => {
	let words = parseInt(req.body.words);
  let goalId = parseInt(req.body.goalId);
  const sessionData = {};
  if (isNaN(words)){
      return res.status(400).send("Words must be a nonnegative whole number.");
  }

  let startTime = new Date(`${req.body.date}, ${req.body.start}`);
  let endTime = new Date(`${req.body.date}, ${req.body.stop}`);
  // validate dates
  if (startTime === "Invalid Date" || endTime === "Invalid Date") {
      return res.status(400).send("Invalid date. Make sure dates are in the format: 'YYYY-MM-DD'");
  } else {
    sessionData.start = startTime;
    sessionData.stop = endTime;
    sessionData.words = words;
    sessionData.sceneId = req.body.sceneId;
    sessionData.goalId = goalId;
  }
  console.log("Saving the session: ")
  console.log(sessionData);
  try {
    const session = await sessionClient.create({
      data: sessionData,
    });
    console.log("Session saved successfully.")
    res.redirect(`/goals/${session.goalId}`);

	} catch (e) {
		console.log(e);
	}
};

// update
export const updateSession = async (req, res) => {
  console.log("Session Object from Form:");
  console.log(req.body);
  const goalId = parseInt(req.body.goalId);
  const sessionId = parseInt(req.params.id);
  let words = parseInt(req.body.words);
	if (isNaN(sessionId) || isNaN(words) || isNaN(goalId)) {
		return res.status(400).send('Not  a number');
	}
  const sessionData = {
    start: new Date(`${req.body.date} ${req.body.start}`),
    stop: new Date(`${req.body.date} ${req.body.stop}`),
    words: words,
    sceneId: req.body.sceneId,
    goalId: goalId
  } 
  console.log("Session Object to Update:")
  console.log(sessionData);
  try {
    const session = await sessionClient.update({
      where: {
        id: sessionId,
      },
      data: sessionData,
    });
    console.log("Session successfully updated");
    res.redirect(`/goals/${session.goalId}`);
  } catch (e) {
    console.log(e);
  }
};

export const confirmDelete = async (req, res) => {
  const sessionId = parseInt(req.params.id);
  if (isNaN(sessionId)){
    return res.status(400).send('Invalid session ID');
  }

  try {
    const session = await sessionClient.findUnique({
      where: {
        id: sessionId,
      },
    });
    res.render(`sessions/delete`, { session: session });
  } catch (e){
      console.log(e);
  }
}

// delete
export const deleteSession = async (req, res) => {
	const sessionId = parseInt(req.params.id);
	if (isNaN(sessionId)){
		return res.status(400).send('Invalid session ID');
	}

	try {
		const session = await sessionClient.delete({
			where: {
				id: sessionId,
			},
		});
    console.log("Session successfully deleted.");
		res.redirect(`/goals/${session.goalId}`);
	} catch (e) {
		console.log(e);
	}
};
