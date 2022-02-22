const mongoose = require('mongoose')
const validator = require('validator').default

const Schema = mongoose.Schema

const userAbsentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserAbsent',
    },
    absentId: {
      type: Schema.Types.ObjectId,
      ref: 'UserAbsent',
    },
    workingHours : {
      type: String
    }
  },
  {
    timestamps: true,
  }
)

const UserAbsent = mongoose.model('UserAbsent', userAbsentSchema)

module.exports = UserAbsent
