const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ticketpriceSchema = new Schema({
  "normalFare": Number,
  "pensioners": Number,
  "children": Number
  
});

module.exports = db.model('Ticketprice', ticketpriceSchema);