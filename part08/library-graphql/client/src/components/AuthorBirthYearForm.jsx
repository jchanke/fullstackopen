import Select from "react-select";
import { useMutation } from "@apollo/client";
import { useField } from "../hooks";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const AuthorBirthYearForm = ({ authors }) => {
  const { user } = useUser();
  const notification = useNotification();

  const name = useField({ name: "name" });
  const born = useField({ name: "born" });

  const [updateBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error(error);
      notification.error(error.message);
    },
  });

  if (!user) {
    console.log("no user");
    return;
  }

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

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
