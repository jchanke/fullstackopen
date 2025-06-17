import { useState } from "react";

export const useField = ({ name, type = "text", defaultValue = "" }) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event) => setValue(event.target.value);
  const input = (
    <div>
      <label htmlFor={name}>{name}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
    </div>
  );

  return { value, setValue, input };
};
