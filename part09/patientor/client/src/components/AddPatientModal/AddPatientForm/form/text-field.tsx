import GenericTextField from "../../../GenericForm/TextField";
import { useFieldContext } from ".";

import { TextFieldProps } from "@mui/material";

const TextField = (props: TextFieldProps) => {
  return <GenericTextField {...props} useFieldContext={useFieldContext} />;
};

export default TextField;
