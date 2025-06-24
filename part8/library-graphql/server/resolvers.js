const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const pubsub = new PubSub();

const BOOK_ADDED = "BOOK_ADDED";

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author?._id;
      }
      if (args.genre) {
        filter.genres = args.genre;
      }
      return Book.find(filter).populate("author");
    },
    allAuthors: async () => Author.find(),
    me: async (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not signed in", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, bookCount: 0 });
      }
      author.bookCount += 1;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("adding author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }

      const book = new Book({ ...args, author });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      pubsub.publish(BOOK_ADDED, { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not signed in", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
    },
    createUser: async (root, args) => {
      const { username, password, favoriteGenre } = args;

      const SALT_ROUNDS = 10;
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const user = new User({ username, passwordHash, favoriteGenre });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }

      return user;
    },
    login: async (root, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username });
      const isCorrectPassword = await bcrypt.compare(
        password,
        user?.passwordHash
      );
      if (!(user && isCorrectPassword)) {
        throw new GraphQLError("invalid username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
          },
        });
      }
      const userForToken = { id: user.id, username };
      const token = await jwt.sign(userForToken, process.env.SECRET);
      return { value: token };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator([BOOK_ADDED]),
    },
  },
};

module.exports = resolvers;
