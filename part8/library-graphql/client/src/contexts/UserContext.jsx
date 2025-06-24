import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ME, USER_TOKEN } from "../queries";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const query = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
    notifyOnNetworkStatusChange: true,
  });

  if (query.loading) return "loading user...";
  if (query.error) {
    console.error(query.error);
    return JSON.stringify(query.error);
  }

  const user = query.data?.me;

  return (
    <UserContext.Provider value={{ query, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);

export default UserContext;
