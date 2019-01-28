const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ticketSchema = new Schema({
  "userNames": [String],
  "showtime": [{
    type: Schema.Types.ObjectId,
    ref: 'Showtime'
  }],
  "seats": [Number],
  "ticketPrice": [{
    type: Schema.Types.ObjectId,
    ref: 'ticketpriceSchema'
  }]
});

module.exports = db.model('Ticket', ticketSchema);