import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 5000;
const DB_CONNECTION_URL =
  "mongodb+srv://subhendu:Subh123@cluster0.3as8jfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
