'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const upload = require('multer')({ dest: 'tmp/uploads' });;
const fs = require('fs');
const PORT = process.env.PORT || 3000
// tells application dependencies to transpile Jade to HTML
app.set('view engine', 'jade');

//app.use(bodyParser.urlencoded({ extended: false}));

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

app.get('/send-photo', (req,res) => {
  res.render('sendphoto');
});

app.post('/send-photo', upload.single('image'), (req,res) => {
  console.log(req.body, req.file);
  //res.send('<h1>Thanks for submitting your photos</h1>');
  // get the temporary location of the file
  const tmp_path = req.file.path;
  //get the extention of the file
  const fullName = req.file.originalname;
  const splitRes = fullName.split(".");
  const newFileName = req.file.filename + '.' + splitRes[1];
  console.log(newFileName);
  // set where the file should actually exists - in this case it is in the "images" directory
  const target_path = 'tmp/renamed/' + newFileName;
  // move the file from the temporary location to the intended location
  fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
      fs.unlink(tmp_path, function() {
          if (err) throw err;
          res.send('File uploaded to: ' + target_path + ' - ' + req.file.size + ' bytes');
        });
  });
});


app.get('/hello',(req,res) => {
  const name = req.query.name;
  console.log ('req.query');
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
