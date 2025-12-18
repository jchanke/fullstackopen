import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import patientService from "../../services/patients";

import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";

import { Patient, HealthCheckEntry } from "@backend/src/types";

import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PatientListPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const result = useQuery({
    queryKey: ["patients", "list"],
    queryFn: patientService.getAll,
  });

  if (result.isPending) return <div>loading patients...</div>;
  if (result.isError) return JSON.stringify(result.error);

  const patients = result.data;

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow
              hover
              key={patient.id}
              tabIndex={0}
              role="button"
              onClick={() => navigate(`/patients/${patient.id}`)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "action.hover" },
                "&:focus": { backgroundColor: "action.hover" },
              }}
            >
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation.toLowerCase()}</TableCell>
              <TableCell>
                <HealthRatingBar
                  showText={false}
                  rating={
                    patient.entries
                      .filter((e): e is HealthCheckEntry => e.type === "HealthCheck")
                      .at(-1)?.healthCheckRating
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
