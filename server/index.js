import express from "express";
import Connection from "./db/dbConncection.js";
import scoreRouter from "./routes/scoreRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
Connection();
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 8000;

app.use("/score", scoreRouter);

app.listen(port, () =>
  console.log("Server is running on http://localhost:" + port)
);
