"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v4_1 = __importDefault(require("zod/v4"));
const patientService_1 = __importDefault(require("../services/patientService"));
const types_1 = require("../types");
const route = express_1.default.Router();
// middleware
const parseNewPatient = (req, _res, next) => {
    try {
        types_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof v4_1.default.ZodError) {
        res.status(400).json({ error: error.issues });
    }
    else {
        next(error);
    }
};
// routes
route.get("/", (_req, res) => {
    const patients = patientService_1.default.getPatients();
    res.json(patients);
});
route.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getPatientById(id);
    if (!patient) {
        res.sendStatus(404);
        return;
    }
    res.json(patient);
});
route.post("/", parseNewPatient, (req, res) => {
    const returnedPatient = patientService_1.default.addPatient(req.body);
    res.json(returnedPatient);
});
route.post("/:id/entries", (req, res) => {
    const returnedEntry = patientService_1.default.addEntryToPatient(req.params.id, req.body);
    res.json(returnedEntry);
});
// error-handling
route.use(errorMiddleware);
exports.default = route;
