import express, { Response } from "express";
import diagnosisService from "../services/diagnosisService";

import { Diagnosis } from "../types";

const diagnosesRoute = express.Router();

diagnosesRoute.get("/", (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosisService.getDiagnoses();
  res.json(diagnoses);
});

export default diagnosesRoute;
