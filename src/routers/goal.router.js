import { Router } from "express";

import { 
	getAllGoals, 
	getGoalById,
	createGoal,
	updateGoal,
	deleteGoal
} from "../controllers/goal.controller.js";

const goalRouter = Router();

goalRouter.get("/", getAllGoals);
goalRouter.get("/:id", getGoalById);
goalRouter.post("/", createGoal);
goalRouter.put("/:id", updateGoal);
goalRouter.delete("/:id", deleteGoal);


export default goalRouter;
