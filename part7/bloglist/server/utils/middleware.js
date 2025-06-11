const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const logger = require("./logger");
const User = require("../models/user");

morgan.token("req-body", (request, _response) => {
  if (request.method && ["POST", "PUT"].includes(request.method)) {
    return JSON.stringify(request.body);
  }
  return "";
});

const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :req-body",
);

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = jwt.decode(request.token, process.env.SECRET);
  if (!token || !token.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  request.user = await User.findById(token.id);
  next();
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.message.includes("data and salt arguments required")) {
    return response.status(400).json({ error: "please provide a password" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
