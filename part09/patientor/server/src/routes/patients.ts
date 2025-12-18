import express, { NextFunction, Request, Response } from "express";
import z from "zod";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../types";

import type { Entry, Patient } from "../types";

const route = express.Router();

// middleware

const parseNewPatient = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

// routes

route.get("/", (_req, res: Response<Patient[]>) => {
  const patients = patientService.getPatients();
  res.json(patients);
});

route.get("/:id", (req, res: Response<Patient>) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (!patient) {
    res.sendStatus(404);
    return;
  }
  res.json(patient);
});

route.post("/", parseNewPatient, (req: Request, res: Response<Patient>) => {
  const returnedPatient = patientService.addPatient(req.body);
  res.json(returnedPatient);
});

route.post("/:id/entries", (req: Request, res: Response<Entry>) => {
  const returnedEntry = patientService.addEntryToPatient(
    req.params.id,
    req.body
  );
  res.json(returnedEntry);
});

// error-handling
route.use(errorMiddleware);

export default route;
