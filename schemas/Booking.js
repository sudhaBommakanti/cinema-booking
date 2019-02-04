const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
  "bookingNum": String,
  "showTimeDetails": { type: Schema.Types.ObjectId, ref: 'Showtime' },
  "seats": [String],
  "userId": { type: Schema.Types.ObjectId, ref: 'User' }
})
// Here we add a pre save hook that will create a unique booking number
bookingSchema.pre('save', async function () {
  if (this.bookingNum) {
    return
  }
  // write code here to generate a booking number
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
  let uniqueId;
  do {

    uniqueId = '';
    for (let i = 0; i < 5; i++) {
      uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

  } while ((await models.users.find({ bookingNum: uniqueId })).length > 0)
  this.bookingNum = uniqueId;
});

module.exports = db.model('Booking', bookingSchema);