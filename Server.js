const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CreateRestRoutes = require('./CreateRestRoutes');

module.exports = class Server {

  constructor() {
    this.start();
  }

  async start() {
    await this.connectToDb();
    await this.startWebServer();
  }

  connectToDb() {
    return new Promise((resolve, reject) => {
      let dbName = 'cinema'
      mongoose.connect(`mongodb://cinema:cinema123@cinema-shard-00-00-rlvpw.mongodb.net:27017,cinema-shard-00-01-rlvpw.mongodb.net:27017,cinema-shard-00-02-rlvpw.mongodb.net:27017/test?ssl=true&replicaSet=cinema-shard-0&authSource=admin&retryWrites=true`);
      global.db = mongoose.connection;
      db.on('error', () => reject('Could not connect to DB'));
      db.once('open', () => resolve('Connected to DB'));
    });
  }

  startWebServer() {

    // Create a web server
    const app = express();

    // Add body-parser to our requests
    app.use(bodyParser.json());

    // Serve static files from www
    app.use(express.static('www'));

    // Set keys to names of rest routes
    const models = {
      movies: require('./schemas/Movie'),
      auditoriums: require('./schemas/Auditorium'),
      showtimes: require('./schemas/Showtime'),
      tickets: require('./schemas/Ticket'),
    };
    // create all necessary rest routes for the models
    new CreateRestRoutes(app, db, models);

    // Start the web server
    app.listen(3000, () => console.log('Listening on port 3000'));

  }

}