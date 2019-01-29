// This program needs to be run once
// to import our book data from JSON to MongoDB

const mongoose = require('mongoose');

// Connect to db
let connectionString = 'mongodb://cinema:cinema123@cinema-shard-00-00-rlvpw.mongodb.net:27017,cinema-shard-00-01-rlvpw.mongodb.net:27017,cinema-shard-00-02-rlvpw.mongodb.net:27017/test?ssl=true&replicaSet=cinema-shard-0&authSource=admin&retryWrites=true';
module.exports = connectionString;
mongoose.connect(connectionString, { useNewUrlParser: true });
global.db = mongoose.connection;
db.on('error', () => reject('Could not connect to DB'));
db.once('open', () => importJsonDataToDb());


// Load the Mongoose model
let Auditorium = require('./schemas/Auditorium');

// Load the json data from file
let auditoriumData = require('./auditorium.json');

async function importJsonDataToDb() {
    let allAuditoriumCount = await Auditorium.count();
    // if the db already contains books then delete them
    if (allAuditoriumCount > 0) {
        console.log('Deleted old auditoriums', await Auditorium.remove({}));
    }
    for (let data of auditoriumData) {
        let auditorium = new Auditorium(data);
        // save the book to MongoDB
        await auditorium.save();
    }
    // after the import count the books again
    allAuditoriumCount = await Auditorium.count();
    console.log(`Imported ${allAuditoriumCount} auditoriums to the database`);
    // Exit the app
    process.exit();
}