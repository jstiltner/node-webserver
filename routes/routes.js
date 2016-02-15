'use strict';
// const app = require('../server');
const express = require('express');
const app = express.Router();


const News = require('../models/news');


app.get('/', (req, res) => {
  News.findOne().sort('-_id').exec((err, doc) => {
    if (err) throw err;

    res.render('index', {
      date: new Date(),
      topStory: doc.top[0]
    });
  });
});




app.get('/hello', (req, res) => {
  const name = req.query.name || 'World';
  const msg = `<h1>Hello ${name}!</h1>
<h2>Goodbye ${name}!</h2>`;

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  // chunk response by character
  msg.split('').forEach((char, i) => {
    setTimeout(() => {
      res.write(char);
    }, 1000 * i);
  });

  // wait for all characters to be sent
  setTimeout(() => {
    res.end();
  }, msg.length * 1000 + 2000);
});

app.get('/random', (req, res) => {
  res.send(Math.random().toString());
});


app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

  res.send(getRandomInt(+min, +max).toString());
});

app.get('/secret', (req, res) => {
  res
    .status(403)
    .send('Access Denied!');
});

module.exports = app;
