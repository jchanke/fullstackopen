import PatientEntryHeader from "./PatientEntryHeader";

import { Diagnosis, Entry } from "@backend/src/types";

import { Box, Divider, ListItemText, Stack, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";

const PatientEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Stack gap={1}>
        <PatientEntryHeader entry={entry} />
        <Typography variant="body1" color="text.secondary">
          {entry.description.toLowerCase()}
        </Typography>
        <Box>
          <Typography>specialist</Typography>
          <Typography variant="body2" color="text.secondary">
            {entry.specialist.toLowerCase()}
          </Typography>
        </Box>
        {entry.type === "Hospital" && entry.discharge && (
          <Box>
            <Typography>discharge</Typography>
            <Typography variant="body2" color="text.secondary">
              on date: {entry.discharge.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              with criteria: {entry.discharge.criteria.toLowerCase()}
            </Typography>
          </Box>
        )}
        {entry.type === "OccupationalHealthcare" && entry.sickLeave && (
          <Box>
            <Typography>sick leave</Typography>
            <Typography variant="body2" color="text.secondary">
              start date: {entry.sickLeave.startDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              end date: {entry.sickLeave.endDate}
            </Typography>
          </Box>
        )}
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <>
            <Divider />
            {entry.diagnosisCodes.map((code) => {
              const diagnosis = diagnoses.find((d) => d.code === code)?.name;
              return (
                <ListItem dense key={code}>
                  <ListItemText primary={code} secondary={diagnosis} />
                </ListItem>
              );
            })}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default PatientEntry;
