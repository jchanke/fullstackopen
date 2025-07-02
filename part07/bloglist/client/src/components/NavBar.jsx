import { Link } from "react-router-dom";
import { useCurrentUser } from "../contexts/UserContext";
import { Button } from "@chakra-ui/react";

const NavBar = () => {
  const { user, clearUser } = useCurrentUser();

  const color = { padding: 5, backgroundColor: "lightgrey" };
  const padding = { padding: 5 };

  return (
    <div style={color}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user && (
        <>
          {user.name} logged in{" "}
          <Button onClick={clearUser} size="sm" variant="subtle">
            logout
          </Button>
        </>
      )}
    </div>
  );
};

export default NavBar;
