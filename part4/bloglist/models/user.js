const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ],
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User