import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import { ConnectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);

app.listen(PORT, (req, res) => {
  console.log("Server is Running in PORT : " + PORT);
  ConnectDB();
});
