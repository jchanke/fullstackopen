require("dotenv").config();
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const author = require("./models/author");

const MONGODB_URI = process.env.MONGODB_URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the
    // Stable API version
    await mongoose.connect(MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const authors = await Author.find({ bookCount: { $exists: false } });

    for (const author of authors) {
      const { _id: id } = author;
      const bookCount = await Book.collection.countDocuments({ author: id });
      author.bookCount = bookCount;
      console.log(author.name, author.bookCount);
      await author.save();
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
