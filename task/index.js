import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js"
import dotenv from "dotenv";
import connectDB from "./src/lib/ConnectDB.js";

const app = express();
dotenv.config();

app.use(express.json());

const port = 8000;

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes)

app.listen(port, () => {
  connectDB();
  console.log(`The app is running at port ${port}`);
});
