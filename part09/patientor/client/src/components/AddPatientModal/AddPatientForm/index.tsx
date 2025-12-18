import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import patientService from "../../../services/patients";
import { useAddPatientForm } from "./form";

import { Entry, Gender, NewPatientSchema } from "@backend/src/types";

import { Button, Grid, Stack } from "@mui/material";

interface Props {
  onCancel: () => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const genderOptions = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, setError }: Props) => {
  const client = useQueryClient();

  const submitNewPatient = useMutation({
    mutationFn: patientService.create,
    onSuccess: onCancel,
    onError: (e: unknown) => {
      console.error(e);
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError(`Unknown error ${e}`);
      }
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["patients", "list"] });
    },
  });

  const form = useAddPatientForm({
    defaultValues: {
      name: "",
      occupation: "",
      dateOfBirth: "", // yyyy-mm-dd
      ssn: "",
      gender: "" as Gender,
      entries: [] as Entry[],
    },
    onSubmit: ({ value: newPatient }) => {
      submitNewPatient.mutate(newPatient);
    },
    onSubmitInvalid: ({ formApi }) => {
      const errors = formApi.getAllErrors();
      setError(errors.form.errors.join(", "));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack>
        <form.AppField
          name="name"
          validators={{ onChange: NewPatientSchema.shape.name }}
          children={(field) => <field.TextField label="name" />}
        />
        <form.AppField
          name="ssn"
          validators={{ onChange: NewPatientSchema.shape.ssn }}
          children={(field) => (
            <field.TextField label="social security number" />
          )}
        />
        <form.AppField
          name="dateOfBirth"
          validators={{ onChange: NewPatientSchema.shape.dateOfBirth }}
          children={(field) => (
            <field.TextField
              label="date of birth"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <form.AppField
          name="occupation"
          validators={{ onChange: NewPatientSchema.shape.occupation }}
          children={(field) => <field.TextField label="occupation" />}
        />
        <form.AppField
          name="gender"
          validators={{ onChange: NewPatientSchema.shape.gender }}
          children={(field) => (
            <field.SelectField label="gender" options={genderOptions} />
          )}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};

export default AddPatientForm;
