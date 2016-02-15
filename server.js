'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const api = require('./routes/api');


const PORT = process.env.PORT || 3000;
const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';
const MONGODB_NAME = process.env.MONGODB_NAME || 'node-webserver';

const MONGODB_AUTH = MONGODB_USER
  ? `${MONGODB_USER}:${MONGODB_PASS}@`
  : '';

const MONGODB_URL = `mongodb://${MONGODB_AUTH}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;

const sendphoto = require('./routes/sendphoto');
const contact = require('./routes/contact');
//const index = require('./routes/index');
//const random = require('./routes/random');
//const secret = require('./routes/secret');
//const hello = require('./routes/hello');


app.set('view engine', 'jade');

app.locals.title = 'THE Super Cool App';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(api);
app.use(contact);
app.use(routes);
app.use(sendphoto);

mongoose.connect(MONGODB_URL);


//commented out for lint
//const News = mongoose.model('news', mongoose.Schema({
  //top: [{title: String, url: String}]
//}));

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)



module.exports = app;
