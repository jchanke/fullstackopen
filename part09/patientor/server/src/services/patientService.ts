import { v1 as uuid } from "uuid";
import data from "../../data/patients";

import {
  Entry,
  NewEntrySchema,
  NewPatientSchema,
  NonSensitivePatient,
  Patient,
} from "../types";

const patients = data;

const getNonSentivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (object: unknown): Patient => {
  const newPatient = NewPatientSchema.parse(object) as Patient;
  newPatient.id = uuid();
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, object: unknown): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error(`no patient with id ${patientId}`);
  }
  const newEntry = NewEntrySchema.parse(object) as Entry;
  newEntry.id = uuid();
  patient.entries = [...patient.entries, newEntry];
  return newEntry;
};

export default {
  getNonSentivePatients,
  getPatients,
  getPatientById,
  addPatient,
  addEntryToPatient,
};
