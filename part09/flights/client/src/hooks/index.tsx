import { useState } from "react";

export const useField = ({
  name,
  type = "text",
  initial = "",
}: {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  initial?: string;
}) => {
  const [value, setValue] = useState<string>(initial);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const input = (
    <div>
      <label htmlFor={name}>{name}:</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
    </div>
  );

  return { input, value, setValue };
};

type Option = string | number | readonly string[] | undefined;

export const useSelect = ({
  name,
  options,
}: {
  name: string;
  options: Array<Option>;
}) => {
  const [value, setValue] = useState<Option>(options[0]);
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setValue(event.target.value);
  };
  const input = (
    <div>
      <label htmlFor={name}>{name}:</label>
      <select name={name} value={value} onChange={handleChange}>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );

  return { input, value, setValue };
};
