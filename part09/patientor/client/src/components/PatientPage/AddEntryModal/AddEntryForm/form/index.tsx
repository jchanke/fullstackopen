import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "./text-field";
import SelectField from "./select-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useAddEntryForm } = createFormHook({
  fieldContext,
  fieldComponents: { TextField, SelectField },
  formContext,
  formComponents: {},
});
