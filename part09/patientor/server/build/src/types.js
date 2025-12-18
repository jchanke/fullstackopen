"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonSensitivePatientSchema = exports.NewPatientSchema = exports.PatientSchema = exports.NewEntrySchema = exports.EntryTypeSchema = exports.EntrySchema = exports.HospitalEntrySchema = exports.OccupationalHealthcareEntrySchema = exports.HealthCheckEntrySchema = exports.BaseEntrySchema = exports.HealthCheckRating = exports.Gender = exports.DiagnosisSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
const DiagnosisCodeSchema = v4_1.default.string();
exports.DiagnosisSchema = v4_1.default.object({
    code: DiagnosisCodeSchema,
    name: v4_1.default.string(),
    latin: v4_1.default.optional(v4_1.default.string()),
});
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
exports.BaseEntrySchema = v4_1.default.object({
    id: v4_1.default.guid(),
    description: v4_1.default.string(),
    date: v4_1.default.iso.date("date should be 'yyyy-mm-dd'"),
    specialist: v4_1.default.string().min(1, "specialist should be non-empty"),
    diagnosisCodes: v4_1.default.optional(v4_1.default.array(DiagnosisCodeSchema)),
});
exports.HealthCheckEntrySchema = exports.BaseEntrySchema.extend({
    type: v4_1.default.literal("HealthCheck"),
    healthCheckRating: v4_1.default.enum(HealthCheckRating),
});
exports.OccupationalHealthcareEntrySchema = exports.BaseEntrySchema.extend({
    type: v4_1.default.literal("OccupationalHealthcare"),
    employerName: v4_1.default.string().min(1, "employer should be non-empty"),
    sickLeave: v4_1.default.optional(v4_1.default.object({
        startDate: v4_1.default.iso.date("start date should be 'yyyy-mm-dd'"),
        endDate: v4_1.default.iso.date("end date should be 'yyyy-mm-dd'"),
    })),
});
exports.HospitalEntrySchema = exports.BaseEntrySchema.extend({
    type: v4_1.default.literal("Hospital"),
    discharge: v4_1.default.object({
        date: v4_1.default.iso.date("discharge date should be 'yyyy-mm-dd'"),
        criteria: v4_1.default.string().min(1, "discharge criteria should be non-empty"),
    }),
});
exports.EntrySchema = v4_1.default.discriminatedUnion("type", [
    exports.HealthCheckEntrySchema,
    exports.OccupationalHealthcareEntrySchema,
    exports.HospitalEntrySchema,
]);
exports.EntryTypeSchema = v4_1.default.enum(exports.EntrySchema.options.map((o) => o.shape.type.value));
exports.NewEntrySchema = v4_1.default.discriminatedUnion("type", [
    exports.HealthCheckEntrySchema.omit({ id: true }),
    exports.OccupationalHealthcareEntrySchema.omit({ id: true }),
    exports.HospitalEntrySchema.omit({ id: true }),
]);
exports.PatientSchema = v4_1.default.object({
    id: v4_1.default.guid(),
    name: v4_1.default.string().min(1, "username must be non-empty"),
    dateOfBirth: v4_1.default.iso.date("date should be 'yyyy-mm-dd'"),
    ssn: v4_1.default.string().min(1, "ssn should be non-empty"),
    gender: v4_1.default.enum(Gender, "gender should be one of 'male', 'female' or 'other'"),
    occupation: v4_1.default.string().min(1, "occupation must be non-empty"),
    entries: v4_1.default.array(exports.EntrySchema),
});
exports.NewPatientSchema = exports.PatientSchema.omit({ id: true });
exports.NonSensitivePatientSchema = exports.PatientSchema.omit({
    ssn: true,
    entries: true,
});
