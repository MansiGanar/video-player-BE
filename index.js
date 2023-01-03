import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import commentsRoutes from "./routes/comments.js";
import videosRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose.set("strictQuery", false);

app.use(express.json());

app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(5000, () => {
  try {
    const connect = () => {
      mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
          console.log("Connected to DB");
        })
        .catch((err) => {
          throw err;
        });
    };
    connect();
    console.log("Connected to the server");
  } catch (error) {
    throw err;
  }
});
