const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
});

bookSchema.plugin(uniqueValidator);

bookSchema.set("toJSON", {
  transform: (current, returned) => {
    returned.id = current._id.toString();
    delete returned._id;
    delete returned.__v;
  },
});

module.exports = mongoose.model("Book", bookSchema);
