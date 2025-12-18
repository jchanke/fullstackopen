import express from "express";
import path from "path";
import diagnosesRoute from "./routes/diagnoses";
import route from "./routes/patients";

const app = express();

const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../public")));

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
