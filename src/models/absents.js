const mongoose = require('mongoose')
const validator = require('validator').default

const Schema = mongoose.Schema

const absentSchema = new Schema(
  {
    date: {
      type: Date,
    },
    attendance: {
      type: Boolean,
      default: false,
    },
    reason : {
      type: String
    },
    name : {
      type: String
    },
    description : {
      type: Text
    },
  },
  {
    timestamps: true,
  }
)

const Absent = mongoose.model('Absent', absentSchema)

module.exports = Absent
