const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (current, returned) => {
    returned.id = current._id.toString();
    delete returned._id;
    delete returned.__v;
    delete returned.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
