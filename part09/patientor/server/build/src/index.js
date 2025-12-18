"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// middleware
app.use(express_1.default.json());
// Serve static files from the React app
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// routes
app.use("/api/diagnoses", diagnoses_1.default);
app.use("/api/patients", patients_1.default);
app.get("/api/ping", (_req, res) => {
    console.log("someone pingged here");
    res.send("pong");
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
