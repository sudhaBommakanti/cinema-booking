const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "bookingNum": String,
  "showTimeDetails": { type: Schema.Types.ObjectId, ref: 'Showtime' },
  "seats": [String],
  "userId": { type: Schema.Types.ObjectId, ref: 'User' }
})

bookingSchema.pre('save', () => {
  if (this.bookingNum) {
    return
  }
  // write code here to generate a booking number
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789'
  let uniqueId = '';

  for (let i = 0; i < 5; i++) {
    uniqueNum += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return this.bookingNum = uniqueId;
});

module.exports = db.model('Booking', bookingSchema);