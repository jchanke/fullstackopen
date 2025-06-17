import { useMutation } from "@apollo/client";
import Select from "react-select";
import { useField } from "../hooks";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const AuthorBirthYearForm = ({ authors }) => {
  const name = useField({ name: "name" });
  const born = useField({ name: "born" });

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  const [updateBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSelect = ({ value }) => {
    name.setValue(value);
    const author = authors.find((a) => a.name === value);
    born.setValue(author.born ? author.born : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const setBornTo = born.value === "" ? null : Number(born.value);
    updateBirthYear({
      variables: { name: name.value, setBornTo },
    });
  };

  return (
    <div>
      <h3>set birthyear</h3>
      <form>
        <Select
          options={options}
          defaultValue={name.value}
          onChange={handleSelect}
        />
        {born.input}
        <button onClick={handleSubmit}>update author</button>
      </form>
    </div>
  );
};

export default AuthorBirthYearForm;
