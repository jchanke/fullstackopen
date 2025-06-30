import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDiagnoses } from "../../contexts/DiagnosesContext";
import patientService from "../../services/patients";

import PatientEntry from "./PatientEntry";
import AddEntryModal from "./AddEntryModal";

import { Patient } from "@backend/src/types";

import {
  Box,
  Button,
  Card,
  Divider,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Male, Female, Transgender } from "@mui/icons-material";

const PatientPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const params = useParams();
  if (!("id" in params)) {
    console.log("PatientPage wasn't suppied a patient id");
  }

  const { diagnoses } = useDiagnoses();

  const patientQuery = useQuery<unknown, unknown, Patient>({
    queryKey: ["patients", "detail", params.id!],
    queryFn: () => patientService.getById(params.id!),
  });

  if (patientQuery.isPending) return <div>loading patient...</div>;
  if (patientQuery.isError) {
    const error = patientQuery.error;
    if (axios.isAxiosError(error) && error.status === 404)
      return <div>Patient was not found in database.</div>;
    return JSON.stringify(error);
  }

  const patient = patientQuery.data;

  const GenderIcon = () =>
    patient.gender === "male" ? (
      <Male fontSize="inherit" sx={{ verticalAlign: "-4px" }} />
    ) : patient.gender === "female" ? (
      <Female fontSize="inherit" sx={{ verticalAlign: "-4px" }} />
    ) : (
      <Transgender fontSize="inherit" sx={{ verticalAlign: "-4px" }} />
    );

  return (
    <div className="PatientPage">
      <Stack sx={{ gap: 2 }}>
        <Typography align="left" variant="h5">
          {patient.name} <GenderIcon />
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="ssn" secondary={patient.ssn} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="occupation"
              secondary={patient.occupation.toLowerCase()}
            />
          </ListItem>
        </List>
        <AddEntryModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <Box>
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            add new entry
          </Button>{" "}
        </Box>
        {patient.entries.length > 0 && (
          <>
            <Typography align="left" variant="h6">
              entries
            </Typography>
            <Card>
              <Stack direction="column" divider={<Divider />}>
                {patient.entries.map((e) => {
                  return (
                    <PatientEntry key={e.id} entry={e} diagnoses={diagnoses} />
                  );
                })}
              </Stack>
            </Card>
          </>
        )}
      </Stack>
    </div>
  );
};

export default PatientPage;
