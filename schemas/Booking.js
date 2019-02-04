const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema ({
    "bookingNum":String,
    "showTimeDetails":{type: Schema.Types.ObjectId, ref: 'Showtime'},
    "seats":[String],
    "userId":{type: Schema.Types.ObjectId, ref: 'User'}
})