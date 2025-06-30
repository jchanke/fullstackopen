import z from "zod/v4";
import { PatientSchema } from "@backend/src/types";

/** 
  export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export type NewPatient = Omit<Patient, "id">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
 */

export const PatientFormValuesSchema = PatientSchema.omit({
  id: true,
  entries: true,
});

export type PatientFormValues = z.infer<typeof PatientFormValuesSchema>;
