"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const types_1 = require("../types");
const patients = patients_1.default;
const getNonSentivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatients = () => {
    return patients;
};
const getPatientById = (id) => {
    return patients.find((p) => p.id === id);
};
const addPatient = (object) => {
    const newPatient = types_1.NewPatientSchema.parse(object);
    newPatient.id = (0, uuid_1.v1)();
    patients.push(newPatient);
    return newPatient;
};
const addEntryToPatient = (patientId, object) => {
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) {
        throw new Error(`no patient with id ${patientId}`);
    }
    const newEntry = types_1.NewEntrySchema.parse(object);
    newEntry.id = (0, uuid_1.v1)();
    patient.entries = [...patient.entries, newEntry];
    return newEntry;
};
exports.default = {
    getNonSentivePatients,
    getPatients,
    getPatientById,
    addPatient,
    addEntryToPatient,
};
