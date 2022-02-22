const mongoose = require('mongoose')
const validator = require('validator').default

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'A password is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone Number is required']
    },
    fullName: {
      type: String,
    },
    pin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
