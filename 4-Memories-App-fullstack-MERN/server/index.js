import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import keys from "./config/keys.js";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(
//   cors({
//     origin: ["https://happy-memories-app.vercel.app"],
//     methods: ["POST", "GET", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const CONNECTION_URL = process.env.MONGODB_URL;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
