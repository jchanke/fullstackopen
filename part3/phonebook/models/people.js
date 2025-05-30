require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(_result => console.log('connected to MongoDB'))
  .catch(error => console.error('error connecting to MongoDB:', error.message))

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'user name required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'user phone number required'],
    validate: {
      validator: function (v) { return /^\d{2,3}-\d+$/.test(v) },
      message: v => `${v.value} is not a valid phone number`,
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
