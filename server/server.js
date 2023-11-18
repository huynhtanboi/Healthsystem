import "./config/dotenv.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./config/database.js";
import mysql from "mysql";
import session from "express-session";

const db = mysql.createConnection({
  user: "root",
  password: "boihuynh",
  host: "localhost",
  port: 3306,
  database: "health",
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3500", "*"], // Allow access from any origin
    credentials: true,
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else next("route");
}

app.get("/", async (req, res) => {
  console.log("session user: ", req.session.user);
  console.log("Hello World");
});

app.post(
  "/login",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    console.log("authenticating...");
    const { username, password } = req.body;
    const query = "SELECT * FROM patient WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
      if (err) {
        return res.send({ err: err });
      }
      if (result?.length > 0) {
        console.log(true);
        return res.send({ location: "/" });
        // req.session.regenerate(function (err) {
        //   if (err) next(err);

        //   // store user information in session, typically a user id
        //   req.session.user = req.body.user;

        //   // save the session before redirection to ensure page
        //   // load does not happen before session is saved
        //   // req.session.save(function (err) {
        //   //   if (err) return next(err);
        //   //   return res.redirect("/");
        //   // });
        // });
      } else {
        console.log(false);
        return res.send(false);
      }
    });
  }
);

app.listen(3600, () => {
  console.log("Server listening on port 3600");
});
