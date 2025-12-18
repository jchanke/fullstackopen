"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
const diagnosesRoute = express_1.default.Router();
diagnosesRoute.get("/", (_req, res) => {
    const diagnoses = diagnosisService_1.default.getDiagnoses();
    res.json(diagnoses);
});
exports.default = diagnosesRoute;
