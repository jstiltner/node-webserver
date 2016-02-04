'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
// tells application dependencies to transpile Jade to HTML
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/',(req, res) => {
  setTimeout(() => {

  res.render('index', {
    date : new Date()
  });
  }, 1000);
});

app.locals.title = 'The Super Duper Cool App';

app.get('/contact', (req,res) => {
  res.render('contact');
});

app.post('/contact', (req,res) => {
  const name = req.body.name;
  res.send(`<h1>Thanks for contacting us, ${name}</h1>`);
});

app.get('/hello',(req,res) => {
  const name = req.query.name;
  const msg = `<h1>Hello ${name}!</h1><h2>Goodbye ${name}!</h2>`;

    console.log('QUERY PARAMS>>>>>', req.query);



   res.writeHead(200, {
      'content-Type': 'text/html'
    });

    // chunk response by character
    msg.split('').forEach((char, i) => {
      setTimeout(() => {
        res.write(char);
      }, 500 * i);
    });

      setTimeout(() => {
          res.end();
        }, msg.length * 1000 + 2000);
      });
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

  app.get('/cal', (req,res) => {
    const month = require('node-cal/lib/month');
    console.log(month);
  });




  app.get('/random/:min/:max',(req,res)=>{
  const min = req.params.min;
  const max = req.params.max;
    res.end(getRandomInt(+min, +max).toString());
  });

 app.all('*', (req,res) => {
    res
      .status(403)
      .send('Access Denied');
  });


  app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});
