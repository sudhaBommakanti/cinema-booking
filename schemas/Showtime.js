const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let showtimeSchema = new Schema({
 "auditorium": String, // Ja denna ska nuemera va string p.g.a det som finns i Showtime.js (Components)
 //"film": {type: Schema.Types.ObjectId, ref: 'Movie'},
"film": String,
 "date": String,
 "time": String
});

module.exports = db.model('Showtime', showtimeSchema);
