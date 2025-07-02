import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import App from "./App.jsx";
import ContextProvider from "./contexts/ContextProvider.jsx";
import { USER_TOKEN } from "./queries.jsx";

const VITE_GRAPHQL_URI_HTTP = import.meta.env.VITE_GRAPHQL_URI_HTTP;
const VITE_GRAPHQL_URL_WS = import.meta.env.VITE_GRAPHQL_URL_WS;

const authLink = setContext(async (request, previousContext) => {
  const token = window.localStorage.getItem(USER_TOKEN);
  const { headers } = previousContext;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: VITE_GRAPHQL_URI_HTTP });

const wsLink = new GraphQLWsLink(createClient({ url: VITE_GRAPHQL_URL_WS }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </ApolloProvider>
  </StrictMode>
);
