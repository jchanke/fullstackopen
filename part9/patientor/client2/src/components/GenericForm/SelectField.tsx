import { AnyFieldApi } from "@tanstack/react-form";

import FieldInfo from "./FieldInfo";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

interface FieldOption<OptionType> {
  value: OptionType;
  label: string;
}

type MenuItemType = string | number | readonly string[] | undefined;

interface SelectFieldProps<OptionType extends MenuItemType> {
  label: string;
  options: Array<FieldOption<OptionType>>;
  useFieldContext: () => AnyFieldApi;
}

const SelectField = <OptionType extends MenuItemType>({
  label,
  options,
  useFieldContext,
}: SelectFieldProps<OptionType>) => {
  const field = useFieldContext();
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={field.name}>{label}</InputLabel>
      <Select
        label={label}
        fullWidth
        required
        value={field.state.value}
        onChange={(e) => {
          const optionValue = e.target.value;
          const option = options.find((o) => o.value === optionValue);
          if (option) {
            field.handleChange(option.value);
          }
        }}
        error={!field.state.meta.isValid}
      >
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FieldInfo field={field} />
    </FormControl>
  );
};

export default SelectField;
