import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import TextField from "./text-field";
import SelectField from "./select-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useAddPatientForm } = createFormHook({
  fieldComponents: {
    TextField,
    SelectField,
  },
  fieldContext,
  formComponents: {},
  formContext,
});
