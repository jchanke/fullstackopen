import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

import AuthorBirthYearForm from "./AuthorBirthYearForm";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) return "loading...";
  const authors = result.data.allAuthors;

  return (
    <>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirthYearForm authors={authors} />
    </>
  );
};

export default Authors;
