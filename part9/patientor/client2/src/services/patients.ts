import axios from "axios";

import type { PatientFormValues } from "../types";
import type { Patient, NewPatient } from "@backend/src/types";

import { apiBaseUrl } from "../constants";
import { EntryWithoutId } from "@backend/src/types";

const getAll = async () => {
  const response = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return response.data;
};

const getById = async (id: string) => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};

const create = async (object: PatientFormValues) => {
  const newPatient: NewPatient = { ...object, entries: [] };
  const response = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    newPatient
  );
  return response.data;
};

const createEntryForPatient = async ({
  id,
  object,
}: {
  id: string;
  object: EntryWithoutId;
}) => {
  const response = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return response.data;
};

export default {
  getAll,
  getById,
  create,
  createEntryForPatient,
};
