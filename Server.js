const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CreateRestRoutes = require('./CreateRestRoutes');
const connectionString = require('./connectionString.js');
const LoginHandler = require('./LoginHandler');
const settings = require('./settings.json');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');
const path = require('path');

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
    app.get('/autoload-js-and-templates', (req, res) => {
      let files = fs.readdirSync(path.join(__dirname, '/www/js/components'));
      files = files.filter(x => x.substr(-3) === '.js')
      let html = files.map(x => `<script src="/js/components/${x}"></script>`).join('');
      html += files.filter(x => fs.existsSync(path.join(
          __dirname, '/www/templates', x.split('.js').join('.html')
      ))).map(x => `<script src="/template-to-js/${
        x.split('.js').join('.html')}"></script>`).join('');
      res.send(`document.write('${html}')`);
    });
    
    app.get('/template-to-js/:template', (req, res) => {
      let html = fs.readFileSync(path.join(
        __dirname, '/www/templates', req.params.template));
      html = req.params.template.split('.html')[0] +
        '.prototype.render = function(){ return `\n' + html + '\n`};'
      res.send(html);
    });
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/www/index.html'));
    });


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
