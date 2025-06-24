import { Link } from "react-router";
import { useUser } from "../contexts/UserContext";
import { USER_TOKEN } from "../queries";

const NavBar = () => {
  const { user, query } = useUser();
  const navBarStyle = { padding: 5 };

  const handleLogout = async () => {
    window.localStorage.removeItem(USER_TOKEN);
    await query.refetch();
  };

  return (
    <div>
      <Link style={navBarStyle} to="/authors">
        authors
      </Link>
      <Link style={navBarStyle} to="/">
        books
      </Link>
      {user ? (
        <>
          <Link style={navBarStyle} to="/addbook">
            add book
          </Link>
          <Link style={navBarStyle} to="/recommended">
            recommended
          </Link>
          <button onClick={handleLogout}>log out</button>
        </>
      ) : (
        <>
          <Link style={navBarStyle} to="/login">
            login
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
