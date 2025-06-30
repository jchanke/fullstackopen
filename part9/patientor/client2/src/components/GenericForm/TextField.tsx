import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

import FieldInfo from "./FieldInfo";

import type { AnyFieldApi } from "@tanstack/react-form";

type TextFieldProps = MuiTextFieldProps & {
  useFieldContext: () => AnyFieldApi;
};

const TextField = ({
  useFieldContext,
  margin = "dense",
  required = true,
  onChange,
  ...props
}: TextFieldProps) => {
  const field = useFieldContext();
  return (
    <div>
      <MuiTextField
        value={field.state.value}
        onChange={onChange || ((e) => field.handleChange(e.target.value))}
        onBlur={field.handleBlur}
        error={!field.state.meta.isValid}
        {...props}
        fullWidth
        margin={margin}
        required={required}
      />
      <FieldInfo field={field} />
    </div>
  );
};

export default TextField;
