import { useParams } from "react-router-dom";
import { useUser } from "../queries/users";

const User = () => {
  const { id: userId } = useParams();
  const userQuery = useUser(userId);

  if (userQuery.isError) return userQuery.error.message;
  if (userQuery.isPending) return "Loading user...";

  const { name, blogs } = userQuery.data;

  return (
    <div>
      <h2>{name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
