const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CreateRestRoutes = require('./CreateRestRoutes');
const connectionString = require('./connectionString.js');
const LoginHandler = require('./LoginHandler');
const settings = require('./settings.json');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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
      mongoose.connect(connectionString, { useNewUrlParser: true });
      global.passwordSalt = settings.passwordSalt;
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

    app.use(session({
      secret: settings.cookieSecret,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: db
      })
    }));

    // Set keys to names of rest routes
    const models = {
      movies: require('./schemas/Movie'),
      auditoriums: require('./schemas/Auditorium'),
      showtimes: require('./schemas/Showtime'),
      users: require('./schemas/User'),
    };

    // create all necessary rest routes for the models
    new CreateRestRoutes(app, db, models);

    new LoginHandler(app, models.users);


    // Start the web server
    app.listen(3000, () => console.log('Listening on port 3000'));

  }

}
