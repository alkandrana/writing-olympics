import express from 'express';
import goalRouter from "./routers/goal.router.js";
import sessionRouter from "./routers/session.router.js";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;
// injection protection
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// sets the folder to display static files from
app.use(express.static("public"));
// interface between the server and the client-side webpages
app.set('view engine', 'ejs');
// html + css defaults for the website
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main');
// set endpoints for dynamic pages
app.use("/goals", goalRouter);
app.use("/sessions", sessionRouter);

app.get("/", (req, res) => {
	console.log("Here");
    res.render("index", {text: 'Log In Here'});
});

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
