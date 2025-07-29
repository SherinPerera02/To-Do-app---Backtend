import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import todoRouter from "./routes/todoRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.use("/api/todos", todoRouter);

app.listen(process.env.PORT, () =>
  console.log(` Server running at http://localhost:${process.env.PORT}`)
);
