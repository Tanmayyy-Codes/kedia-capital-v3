import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import newsRoutes from "./routes/news.route.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5174",
};

app.use(cors(corsOptions));
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(morgan("dev"));

app.use("/api/news", newsRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
