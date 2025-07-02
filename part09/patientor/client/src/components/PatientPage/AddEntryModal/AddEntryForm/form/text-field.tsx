import GenericTextField from "../../../../GenericForm/TextField";
import { TextFieldProps } from "@mui/material";

import { useFieldContext } from ".";

const TextField = (props: TextFieldProps) => {
  return <GenericTextField {...props} useFieldContext={useFieldContext} />;
};

export default TextField;
