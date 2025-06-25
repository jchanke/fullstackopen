import express from "express";
import { calculateBmi, BMIResults } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "invalid query arguments" });
    return;
  }
  const bmi: BMIResults = calculateBmi(height, weight);
  res.json(bmi);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = req.body;
  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const dailyExercises = Array.from(daily_exercises).map(Number);
  if (isNaN(Number(target)) || dailyExercises.some(isNaN)) {
    res.json({ error: "malformatted parameters" });
    return;
  }
  const results = calculateExercises(dailyExercises, target as number);
  res.json(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
