import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAddEntryForm } from "./form";
import patientService from "../../../../services/patients";

import {
  HealthCheckRating,
  EntryWithoutId,
  EntryType,
  NewEntrySchema,
  BaseEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
  EntryTypeSchema,
} from "@backend/src/types";

import {
  TextField,
  Grid,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useDiagnoses } from "../../../../contexts/DiagnosesContext";

interface Props {
  onCancel: () => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const entryTypeOptions = [
  { value: "HealthCheck", label: "health check" },
  { value: "OccupationalHealthcare", label: "occupational healthcare" },
  { value: "Hospital", label: "hospital" },
];

const healthCheckRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "healthy" },
  { value: HealthCheckRating.LowRisk, label: "low risk" },
  { value: HealthCheckRating.HighRisk, label: "high risk" },
  { value: HealthCheckRating.CriticalRisk, label: "critical risk" },
];

const AddEntryForm = ({ onCancel, setError }: Props) => {
  const params = useParams();

  const { diagnoses } = useDiagnoses();

  const client = useQueryClient();

  const submitNewEntry = useMutation({
    mutationFn: patientService.createEntryForPatient,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["patients", "detail", params.id] });
    },
    onError: (error) => {
      setError(error.message);
      if (axios.isAxiosError(error)) {
        setError(error.message);
        return;
      }
    },
  });

  const form = useAddEntryForm({
    defaultValues: {
      type: "HealthCheck" as EntryType,
      date: new Date().toLocaleDateString("en-CA"), // yyyy-mm-dd
      specialist: "",
      description: "",
      diagnosisCodes: [] as string[],

      // HealthCheck specific
      healthCheckRating: HealthCheckRating.Healthy,

      // Hospital specific
      dischargeDate: "",
      dischargeCriteria: "",

      // OccupationalHealthcare specific
      employerName: "",
      sickLeaveStartDate: "",
      sickLeaveEndDate: "",
    },

    onSubmit: ({ value }) => {
      const {
        date,
        specialist,
        description,
        diagnosisCodes,
        healthCheckRating,
        dischargeDate,
        dischargeCriteria,
        employerName,
        sickLeaveStartDate,
        sickLeaveEndDate,
      } = value;

      // Transform form data to proper EntryWithoutId format
      const baseEntry = {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
      };

      const healthCheckEntry = {
        type: "HealthCheck" as const,
        healthCheckRating,
        ...baseEntry,
      };

      const sickLeave =
        sickLeaveStartDate || sickLeaveEndDate
          ? {
              sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              },
            }
          : {};

      const occupationalHealthcareEntry = {
        type: "OccupationalHealthcare" as const,
        employerName,
        ...sickLeave,
        ...baseEntry,
      };

      const hospitalEntry = {
        type: "Hospital" as const,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
        ...baseEntry,
      };

      let entryData: EntryWithoutId;

      switch (value.type) {
        case "HealthCheck":
          entryData = healthCheckEntry;
          break;
        case "OccupationalHealthcare":
          entryData = occupationalHealthcareEntry;
          break;
        case "Hospital":
          entryData = hospitalEntry;
          break;
        default:
          throw new Error("Invalid entry type");
      }

      const object = NewEntrySchema.parse(entryData);
      submitNewEntry.mutate({ id: params.id!, object });
      onCancel();
    },

    onSubmitInvalid: ({ value: _value, formApi }) => {
      const errors = formApi.getAllErrors();
      console.error(errors);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Entry Type Selection */}
        <form.AppField
          name="type"
          validators={{ onChange: EntryTypeSchema }}
          children={(field) => (
            <field.SelectField label="type" options={entryTypeOptions} />
          )}
        />

        {/* Common Fields */}
        <form.AppField
          name="description"
          validators={{ onChange: BaseEntrySchema.shape.description }}
          children={(field) => (
            <field.TextField
              label="description"
              multiline
              required={false}
              rows={3}
            />
          )}
        />
        <form.AppField
          name="date"
          validators={{ onChange: BaseEntrySchema.shape.date }}
          children={(field) => (
            <field.TextField
              label="date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <form.AppField
          validators={{ onChange: BaseEntrySchema.shape.specialist }}
          name="specialist"
          children={(field) => <field.TextField label="specialist" />}
        />

        {/* modified from: https://mui.com/material-ui/react-autocomplete/#multiple-values */}
        <form.Field
          name="diagnosisCodes"
          validators={{ onChange: undefined }}
          children={(field) => (
            <Autocomplete
              multiple
              options={diagnoses.map((d) => d.code)}
              freeSolo
              value={field.state.value}
              onChange={(_, newValue) => field.handleChange(newValue)}
              getOptionLabel={(code) =>
                `${code}: ${diagnoses.find((c) => c.code === code)?.name}`
              }
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((code: string, index: number) => {
                  const { key, ...itemProps } = getTagProps({ index });
                  return (
                    <Chip
                      variant="outlined"
                      label={code}
                      key={key}
                      {...itemProps}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="diagnosis codes"
                  placeholder="add diagnosis codes here..."
                />
              )}
            />
          )}
        />

        {/* Type-specific Fields */}
        <form.Subscribe
          selector={(state) => state.values.type}
          children={(type) => {
            switch (type) {
              case "HealthCheck":
                return (
                  <form.Field
                    name="healthCheckRating"
                    validators={{
                      onChange: HealthCheckEntrySchema.shape.healthCheckRating,
                    }}
                    children={(field) => (
                      <FormControl fullWidth margin="normal">
                        <FormLabel>health check rating</FormLabel>
                        <RadioGroup
                          value={field.state.value.toString()}
                          onChange={(e) =>
                            field.handleChange(
                              Number(e.target.value) as HealthCheckRating
                            )
                          }
                        >
                          {healthCheckRatingOptions.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              value={option.value.toString()}
                              control={<Radio />}
                              label={option.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                );

              case "Hospital":
                return (
                  <>
                    <form.AppField
                      name="dischargeDate"
                      validators={{
                        onChange:
                          HospitalEntrySchema.shape.discharge.shape.date,
                      }}
                      children={(field) => (
                        <field.TextField
                          label="discharge date"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                    <form.AppField
                      name="dischargeCriteria"
                      validators={{
                        onChange:
                          HospitalEntrySchema.shape.discharge.shape.criteria,
                      }}
                      children={(field) => (
                        <field.TextField
                          label="discharge criteria"
                          multiline
                          rows={2}
                        />
                      )}
                    />
                  </>
                );

              case "OccupationalHealthcare":
                const { employerName, sickLeave } =
                  OccupationalHealthcareEntrySchema.shape;
                return (
                  <>
                    <form.AppField
                      name="employerName"
                      validators={{ onChange: employerName }}
                      children={(field) => <field.TextField label="employer" />}
                    />
                    <form.AppField
                      name="sickLeaveStartDate"
                      validators={{
                        onChange: ({ value }) => {
                          if (value !== "") {
                            const result = sickLeave
                              .unwrap()
                              .shape.startDate.safeParse(value);
                            console.log(result.error?.issues[0]?.message);
                            return result.error?.issues[0];
                          }
                        },
                      }}
                      children={(field) => (
                        <field.TextField
                          label="sick leave start date (optional)"
                          type="date"
                          required={false}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                    <form.AppField
                      name="sickLeaveEndDate"
                      validators={{
                        onChange: ({ value }) => {
                          if (value !== "") {
                            const result = sickLeave
                              .unwrap()
                              .shape.startDate.safeParse(value);
                            return result.error?.issues[0];
                          }
                        },
                      }}
                      children={(field) => (
                        <field.TextField
                          label="sick leave end date (optional)"
                          type="date"
                          required={false}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </>
                );

              default:
                return null;
            }
          }}
        />

        {/* Form Actions */}
        <Grid container spacing={2} style={{ marginTop: 24 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              add entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
