import { Entry } from "@backend/src/types";

import { Typography } from "@mui/material";
import {
  MedicalServices,
  Work,
  Favorite,
  LocalHospital,
} from "@mui/icons-material";

const PatientEntryHeader = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      const color = ["green", "yellow", "orange", "red"];
      return (
        <Typography>
          {entry.date} <MedicalServices sx={{ verticalAlign: "-6px" }} />{" "}
          <Favorite
            htmlColor={color[entry.healthCheckRating]}
            sx={{ verticalAlign: "-6px" }}
          />
        </Typography>
      );
    case "OccupationalHealthcare":
      return (
        <Typography>
          {entry.date} <Work sx={{ verticalAlign: "-6px" }} />{" "}
          {entry.employerName}
        </Typography>
      );
    case "Hospital":
      return (
        <Typography>
          {entry.date} <LocalHospital sx={{ verticalAlign: "-6px" }} />
        </Typography>
      );
  }
};

export default PatientEntryHeader;
