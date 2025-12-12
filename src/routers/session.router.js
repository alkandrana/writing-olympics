import { Router } from "express";

import { 
	getSessionsByGoal, 
  addSession, // get
	createSession, //post
	updateSession, // post
  editSession, //get
  confirmDelete, // get
	deleteSession // post
} from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.get("/", getSessionsByGoal);
sessionRouter.get("/edit/:id", editSession);
sessionRouter.get("/add", addSession);
sessionRouter.get("/delete/:id", confirmDelete);
sessionRouter.post("/add", createSession);
sessionRouter.post("/edit/:id", updateSession);
sessionRouter.post("/delete/:id", deleteSession);


export default sessionRouter;
