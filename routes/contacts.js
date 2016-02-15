'use strict';
const express = require('express');
const app = express.Router();
const Contact = require('../models/contact');
const contact = require('../controllers/contact');
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const obj = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  obj.save((err, newObj) => {
    if (err) throw err;

    res.send(`<h1>Thanks for contacting us ${newObj.name}</h1>`);
  });
});

app.get('/contact', contact.index);
app.post('/contact', contact.new);


module.exports = app;
