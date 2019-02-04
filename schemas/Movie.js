const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
 "title": String,
 "productionCountries": [String],
 "productionYear": Number,
 "length": Number,
 "genre": String,
 "distributor": String,
 "language": String,
 "subtitles": String,
 "director": String,
 "actors": [String],
 "description": String,
 "images": [String],
 "youtubeTrailers": [String],
 "reviews": [
   {
     "source": String,
     "quote": String,
     "stars": Number,
     "max": Number
   }
 ]
}, { 
  toJSON: { virtuals: true }
});

movieSchema.virtual('showtimes', {
  ref: 'Showtime',
  localField: 'title',
  foreignField: 'film',
  justOne: false
});


/*movieSchema.pre('find', function() {
  console.log("HEJ")
  this.populate('showtimes');
});*/

module.exports = db.model('Movie', movieSchema);