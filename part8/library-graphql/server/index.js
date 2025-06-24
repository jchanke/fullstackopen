require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { createServer } = require("http");
const { GraphQLError } = require("graphql");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");

const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const jwt = require("jsonwebtoken");

const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.set("debug", process.env.NODE_ENV === "development");
console.log("connecting to MongoDB");
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to", MONGODB_URI))
  .catch((error) =>
    console.error("error connecting to MongoDB", error.message)
  );

const start = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      // proper shutdown for the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // proper shutdown for the WebSocket server
      {
        serverWillStart: async () => {
          return {
            drainServer: async () => {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  // middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static("dist"));

  // apollo server
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req?.headers.authorization;
        const BEARER = "Bearer ";
        if (!(auth && auth.startsWith(BEARER))) {
          return;
        }
        const token = auth.substring(BEARER.length);

        try {
          const user = await jwt.verify(token, process.env.SECRET);
          const currentUser = await User.findById(user.id);
          return { currentUser };
        } catch (error) {
          throw new GraphQLError("invalid token", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: auth,
              error,
            },
          });
        }
      },
    })
  );

  // other endpoints should be routed to "/" for React Router
  app.use("/*catchall", (request, response) => {
    response.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  const PORT = 4000;
  await httpServer.listen({ port: PORT }, () =>
    console.log(`server ready at http://localhost:${PORT}`)
  );
};

start();
