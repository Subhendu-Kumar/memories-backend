import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const userName = process.env.NEXT_PUBLIC_USER_NAME;
const passWard = process.env.NEXT_PUBLIC_PASS;
console.log(userName, passWard);
const DB_CONNECTION_URL = `mongodb+srv://${userName}:${passWard}@cluster0.3as8jfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

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
