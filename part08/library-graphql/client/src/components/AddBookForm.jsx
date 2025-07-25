import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_BOOKS, CREATE_BOOK } from "../queries";
import { useField } from "../hooks";
import { useNotification } from "../contexts/NotificationContext";

const AddBookForm = () => {
  const notification = useNotification();

  const title = useField({ name: "title" });
  const author = useField({ name: "author" });
  const published = useField({ name: "published" });

  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      title.setValue("");
      author.setValue("");
      published.setValue("");
      setGenre("");
      setGenres([]);
    },
    onError: (error) => {
      notification.error(error.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres,
      },
    });
  };

  const handleAddGenre = (event) => {
    event.preventDefault();
    setGenres([...genres, genre]);
    setGenre("");
  };

  return (
    <>
      <h2>add a book</h2>
      <form onSubmit={handleSubmit}>
        {title.input}
        {author.input}
        {published.input}
        <div>
          <input
            type="text"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={handleAddGenre}>add genre</button>
        </div>
        <div>
          genres: {genres.join(" ")}
          <button onClick={() => setGenres([])}>clear</button>
        </div>
        <button type="submit">create book</button>
      </form>
    </>
  );
};

export default AddBookForm;
