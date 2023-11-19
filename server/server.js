import "./config/dotenv.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./config/database.js";
import mysql from "mysql";
import session from "express-session";
import cookieParser from "cookie-parser";

const db = mysql.createConnection({
  user: "root",
  password: "thanhtai",
  host: "localhost",
  port: 3306,
  database: "health",
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3500", "*"], // Allow access from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow methods
    credentials: true,
  })
);

// // On the server side (Node.js with Express)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // set secure to true when https
  })
);

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else next("route");
}

app.get("/", async (req, res) => {
  if (req.session.user) {
    console.log("session user: ", req.session.user);
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/signup", async (req, res) => {
  console.log("signing up...");
  const {
    firstname,
    lastname,
    middlename,
    ssn,
    age,
    gender,
    race,
    occupation,
    phone,
    address,
    medicalHistory,
    username,
    password,
  } = req.body;
  console.log(
    firstname,
    lastname,
    middlename,
    ssn,
    age,
    gender,
    race,
    occupation,
    phone,
    address,
    medicalHistory,
    username,
    password
  );
  const query =
    "INSERT INTO patient (Fname, Lname, MI, SSN, Age, Gender, Race, `Occupation Class`, `Medical History Description`, `Phone #`, Address, Username, Password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      firstname,
      lastname,
      middlename,
      ssn,
      age,
      gender,
      race,
      occupation,
      phone,
      address,
      medicalHistory,
      username,
      password,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send({ err: err });
      }
      console.log("true");
      return res.send(true);
    }
  );
});

app.post("/login", async (req, res) => {
  console.log("authenticating...");
  const { username, password } = req.body;
  const query = "SELECT * FROM patient WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      return res.send({ err: err });
    }
    if (result?.length > 0) {
      console.log(true);
      req.session.regenerate(function (err) {
        console.log("regenerating session...");
        if (err) next(err);

        // store user information in session, typically a user id
        req.session.user = username;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          console.log("saving session...");
          if (err) return next(err);
          return res.send({ loggedIn: true, username: username });
        });
      });
    } else {
      console.log(false);
      return res.send({ loggedIn: false });
    }
  });
});

app.get("/logout", async (req, res) => {
  console.log("logging out...");
  req.session.destroy(function (err) {
    if (err) return next(err);
    return res.send({ loggedIn: false });
  });
});

app.listen(3600, () => {
  console.log("Server listening on port 3600");
});
