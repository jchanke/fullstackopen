"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// middleware
app.use(express_1.default.json());
// routes
app.use("/api/diagnoses", diagnoses_1.default);
app.use("/api/patients", patients_1.default);
app.get("/api/ping", (_req, res) => {
    console.log("someone pingged here");
    res.send("pong");
});
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
