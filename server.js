'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.url === '/hello') {
    const msg = `<h1>Hello world!</h1><h2>Goodbye World!</h2>`;
    res.writeHead(200, {
      'content-Type': 'text/html'
    });

    const events = [];

    msg.split('').forEach((char, i) => {
      setTimeout(() => {
        res.write(char);
        events.pop(events);
      }, 1000 * i);

      events.push(events);
    });

      setInterval(() => {
        if (!events.length) {
          res.end();
        };
      }, 1000);

  } else if (req.url === '/random') {
    res.end(Math.random().toString());
  } else {
    res.writeHead(403);
    res.end('Access Denied');
  }
}).listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});

