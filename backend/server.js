import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.listen(PORT, (req, res) => {
  console.log("Server is Running in PORT : " + PORT);
  ConnectDB();
});
