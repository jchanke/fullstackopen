import express from "express";
import diagnosesRoute from "./routes/diagnoses";
import route from "./routes/patients";

const app = express();

const PORT = 3001;

// middleware
app.use(express.json());

// routes
app.use("/api/diagnoses", diagnosesRoute);
app.use("/api/patients", route);

app.get("/api/ping", (_req, res) => {
  console.log("someone pingged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
