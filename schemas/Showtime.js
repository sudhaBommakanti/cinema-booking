const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let showtimeSchema = new Schema({
  "auditorium": { type: Schema.Types.ObjectId, ref: 'Auditorium' },
  "film": String,
  "date": String,
  "time": String

});

module.exports = db.model('Showtime', showtimeSchema);
