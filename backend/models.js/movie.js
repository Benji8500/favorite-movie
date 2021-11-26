const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  poster:String,
  title:String,
  year: String,
  rating:String,
  comment:String
})

module.exports = mongoose.model('Movie', movieSchema)
