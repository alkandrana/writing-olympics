import express from 'express';
import goalRouter from "./routers/goal.router.js";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.json());

app.use("/goals", goalRouter);

app.get("/", (req, res) => {
	console.log("Here");
    res.render("index", {text: 'Log In Here'});
});

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
