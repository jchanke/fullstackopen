import { AnyFieldApi } from "@tanstack/react-form";
import { Typography } from "@mui/material";

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <Typography fontSize="small" color="maroon">
          {field.state.meta.errors[0].message}
        </Typography>
      ) : null}
      {/* {field.state.meta.isValidating ? "validating..." : null} */}
    </>
  );
};

export default FieldInfo;
