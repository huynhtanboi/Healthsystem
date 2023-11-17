import "./config/dotenv.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./config/database.js";

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
  let data = await pool.query("SELECT * FROM patient");
  console.log(data.rows[0]);
  res.json(data.rows[0]);
});

app.listen(3600, () => {
  console.log("Server listening on port 3600");
});
