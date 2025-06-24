import { useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { useState } from "react";

const Books = () => {
  const [genre, setGenre] = useState("all genres");
  const [genres, setGenres] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
        allBooks: [...allBooks, addedBook],
      }));
    },
  });

  const result = useQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
    variables: genre === "all genres" ? {} : { genre },
  });

  if (result.loading) return "loading...";
  if (result.error) {
    console.error(result.error);
    return JSON.stringify(result.error);
  }

  const books = result.data.allBooks;

  if (genre === "all genres" && !genres) {
    setGenres([
      ...new Set(books.map((book) => book.genres).flat()),
      "all genres",
    ]);
  }

  if (!genres) return "loading genres...";

  return (
    <>
      <h2>books</h2>
      <p>
        {genre ? (
          <>
            in genre <strong>{genre}</strong>
          </>
        ) : (
          "all genres"
        )}
      </p>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Books;
