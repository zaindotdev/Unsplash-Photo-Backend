import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoutes from "./routes/user.routes.js";

dotenv.config({
  path: "./.env.local",
});

const port = process.env.PORT || 8081;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

app.use("/api/user",userRoutes);
connectDB().then(() => {
  app.listen(port, () => console.log("Server is running on port", port));
});

export default app;