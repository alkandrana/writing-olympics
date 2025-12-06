import { Router } from "express";

import { 
	getAllGoals, 
	getGoalById,
	createGoal, //post
	updateGoal, // put
  editGoal, //get
  confirmDelete, //get
	deleteGoal // post
} from "../controllers/goal.controller.js";

const goalRouter = Router();

goalRouter.get("/", getAllGoals);
goalRouter.get("/:id", getGoalById);
goalRouter.get("/edit/:id", editGoal);
goalRouter.get("/delete/:id", confirmDelete);
goalRouter.post("/add", createGoal);
goalRouter.post("/edit/:id", updateGoal);
goalRouter.post("/delete/:id", deleteGoal);


export default goalRouter;
