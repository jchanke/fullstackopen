import { useFieldContext } from ".";
import GenericSelectField from "../../../GenericForm/SelectField";

interface FieldOption<OptionType> {
  value: OptionType;
  label: string;
}

type MenuItemType = string | number | readonly string[] | undefined;

interface SelectFieldProps<OptionType extends MenuItemType> {
  label: string;
  options: Array<FieldOption<OptionType>>;
}

const SelectField = <OptionType extends MenuItemType>({
  label,
  options,
}: SelectFieldProps<OptionType>) => {
  return (
    <GenericSelectField
      label={label}
      options={options}
      useFieldContext={useFieldContext}
    />
  );
};

export default SelectField;
