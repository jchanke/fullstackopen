import z from "zod/v4";

const DiagnosisCodeSchema = z.string();

export const DiagnosisSchema = z.object({
  code: DiagnosisCodeSchema,
  name: z.string(),
  latin: z.optional(z.string()),
});
export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export const BaseEntrySchema = z.object({
  id: z.guid(),
  description: z.string(),
  date: z.iso.date("date should be 'yyyy-mm-dd'"),
  specialist: z.string().min(1, "specialist should be non-empty"),
  diagnosisCodes: z.optional(z.array(DiagnosisCodeSchema)),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, "employer should be non-empty"),
  sickLeave: z.optional(
    z.object({
      startDate: z.iso.date("start date should be 'yyyy-mm-dd'"),
      endDate: z.iso.date("end date should be 'yyyy-mm-dd'"),
    })
  ),
});
export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date("discharge date should be 'yyyy-mm-dd'"),
    criteria: z.string().min(1, "discharge criteria should be non-empty"),
  }),
});
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);
export type Entry = z.infer<typeof EntrySchema>;
export type EntryType = Entry["type"];
export const EntryTypeSchema = z.enum(
  EntrySchema.options.map((o) => o.shape.type.value)
);

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true }),
]);
export type EntryWithoutId = z.infer<typeof NewEntrySchema>;

export const PatientSchema = z.object({
  id: z.guid(),
  name: z.string().min(1, "username must be non-empty"),
  dateOfBirth: z.iso.date("date should be 'yyyy-mm-dd'"),
  ssn: z.string().min(1, "ssn should be non-empty"),
  gender: z.enum(Gender, "gender should be one of 'male', 'female' or 'other'"),
  occupation: z.string().min(1, "occupation must be non-empty"),
  entries: z.array(EntrySchema),
});
export type Patient = z.infer<typeof PatientSchema>;

export const NewPatientSchema = PatientSchema.omit({ id: true });
export type NewPatient = z.infer<typeof NewPatientSchema>;

export const NonSensitivePatientSchema = PatientSchema.omit({
  ssn: true,
  entries: true,
});
export type NonSensitivePatient = z.infer<typeof NonSensitivePatientSchema>;
