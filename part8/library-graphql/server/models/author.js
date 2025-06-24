const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

authorSchema.plugin(uniqueValidator);

authorSchema.set("toJSON", {
  transform: (current, returned) => {
    returned.id = current._id.toString();
    delete returned._id;
    delete returned.__v;
  },
});

module.exports = mongoose.model("Author", authorSchema);
