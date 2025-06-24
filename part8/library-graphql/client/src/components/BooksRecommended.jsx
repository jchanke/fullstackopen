import { useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED, ME } from "../queries";
import { useUser } from "../contexts/UserContext";

const BooksRecommended = () => {
  const { user } = useUser(ME);
  const favoriteGenre = user.favoriteGenre;

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: favoriteGenre } },
        ({ allBooks }) => ({ allBooks: [...allBooks, addedBook] })
      );
    },
  });
  const result = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } });

  if (result.loading) return "loading books...";
  if (result.error) return JSON.stringify(result.error);

  const books = result.data.allBooks;

  return (
    <>
      <h2>recommendedations</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
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

export default BooksRecommended;
