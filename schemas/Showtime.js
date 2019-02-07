const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let showtimeSchema = new Schema({
  "auditorium": { type: Schema.Types.ObjectId, ref: 'Auditorium' },
  //"film": {type: Schema.Types.ObjectId, ref: 'Movie'},
  "film": String,
  "date": String,
  "time": String
  
},{ toJSON: { virtuals: true } });


showtimeSchema.virtual('auditoriums', {
    ref: 'Auditorium',
    localField: 'name',
    foreignField: '_id',
    justOne: false
  });

showtimeSchema.pre('find', function() {
  console.log("HEJ")
  this.populate('auditoriums');
});

module.exports = db.model('Showtime', showtimeSchema);
