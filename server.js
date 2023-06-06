const path = require('path');
const express = require('express');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


const exphbs = require('express-handlebars');
const session = require('express-session');
const handlebars = require('handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// console logger for http requests
const morgan = require('morgan')


const app = express();
const PORT = process.env.PORT || 8080;

// Sets up session and connect to our Sequelize db
const sess = {
  secret: 'Super secret secret',
  // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
  cookie: {
    // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: false,
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Create the Handlebars.js engine object with custom helper functions
const hbs = exphbs.create({ helpers });

// Inform Express.js which template engine we're using
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);


// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});