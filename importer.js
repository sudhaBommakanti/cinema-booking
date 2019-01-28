// This program needs to be run once
// to import our book data from JSON to MongoDB

const mongoose = require('mongoose');

// Connect to db
let dbName = 'cinema';
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
    console.log('Connected to DB');
    importJsonDataToDb();
});

// Load the Mongoose model for a Book
let Auditorium = require('./Auditorium');
let Movie = require('./Movie');

// Load the json data from file
let auditoriumData = require('./auditorium.json');

async function importJsonDataToDb() {
    let allAuditoriumCount = await Book.count();
    // if the db already contains books then delete them
    if (allAuditoriumCount > 0) {
        console.log('Deleted old auditoriums', await Auditorium.remove({}));
    }
    for (let data of auditoriumData) {
        let book = new Auditorium(data);
        // save the book to MongoDB
        await auditorium.save();
    }
    // after the import count the books again
    allAuditoriumCount = await Audistorium.count();
    console.log(`Imported ${allAuditoriumCount} auditoriums to the database`);
    // Exit the app
    process.exit();
}