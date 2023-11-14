import pg from "pg";
import "./dotenv.js";

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
};

export const pool = new pg.Pool(config);