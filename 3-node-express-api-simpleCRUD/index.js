import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

const app = express(); // initialize express
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  console.log("[TEST]!");
  res.send("Hello from homepage");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
