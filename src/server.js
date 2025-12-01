import express from 'express';
import goalRouter from "./routers/goal.router.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/goals", goalRouter);

app.get("/ping", (req, res) => {
	res.json({message: "pong" }).status(200);
});

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
