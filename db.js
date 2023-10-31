const mongoose = require('mongoose')
require('dotenv').config()

// You get it from your own cluster
const MONGO_URI = process.env.MONGO_URI

// Enter your own db or remove the dbName option
mongoose
  .connect(MONGO_URI, {
    dbName: 'MiniMessageBoard',
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
