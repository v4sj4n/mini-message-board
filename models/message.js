const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { collection: 'message' }
)

module.exports = mongoose.model('Message', MessageSchema)
