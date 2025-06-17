import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) return "loading...";
  const books = result.data.allBooks;

  return (
    <>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Books;
