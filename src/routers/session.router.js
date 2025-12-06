import { Router } from "express";

import { 
	getSessionsByGoal, 
  addSession, // get
	createSession, //post
	updateSession, // post
  editSession, //get
	deleteSession
} from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.get("/", getSessionsByGoal);
sessionRouter.get("/edit/:id", editSession);
sessionRouter.get("/add", addSession);
sessionRouter.post("/add", createSession);
sessionRouter.post("/edit/:id", updateSession);
sessionRouter.delete("/:id", deleteSession);


export default sessionRouter;
