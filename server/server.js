import "./config/dotenv.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./config/database.js";
import mysql from "mysql";

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

app.use(
  cors({
    origin: ["http://localhost:3500", "*"], // Allow access from any origin
    credentials: true,
  })
);

app.get("/", async (req, res) => {
  console.log("Hello World");
  let data = await db.query("SELECT * FROM nurse", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.listen(3600, () => {
  console.log("Server listening on port 3600");
});
