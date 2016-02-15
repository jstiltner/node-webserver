'use strict';
// const app = require('../server');
const express = require('express');
const app = express.Router();
const upload = require('multer')({ dest: 'tmp/uploads' });



app.get('/sendphoto', (req, res) => {
  res.render('sendphoto');
});

app.post('/sendphoto', upload.single('image'), (req, res) => {
  res.send('<h1>Thanks for sending us your photo</h1>');
});


module.exports = app;
