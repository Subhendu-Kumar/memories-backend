import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();

// Initialization
const app = express();
const PORT = process.env.PORT || 5000;
const userName = process.env.NEXT_PUBLIC_USER_NAME;
const passWard = process.env.NEXT_PUBLIC_PASS;
const DB_CONNECTION_URL = `mongodb+srv://${userName}:${passWard}@cluster0.3as8jfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MiddleWares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to memories app backend !");
});
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// DataBase Connections
mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`App is listening on at http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error(error.message);
  });
