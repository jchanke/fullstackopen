import { Link } from "react-router-dom";
import { useUsersBlogCount } from "../queries/users";

const Users = () => {
  const usersQuery = useUsersBlogCount();

  if (usersQuery.isError) return usersQuery.error;
  if (usersQuery.isPending) return "Loading users...";

  const usersByBlogCount = usersQuery.data;

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersByBlogCount.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.n_blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
