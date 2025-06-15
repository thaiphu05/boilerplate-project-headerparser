// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
function IPv4to6(ip) {
  // Convert IPv4 to IPv6 format
  return '::ffff:' + ip;
} 
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  let ipadress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (ipadress.includes(",")) {
    ipadress = ipadress.split(",")[0].trim();
  }
  const software = req.headers['user-agent'];
  if (!ipadress) {
    return res.status(400).json({ error: 'IP address not found' });
  }
  if (!language) {
    return res.status(400).json({ error: 'Language not found' });
  }
  if (!software) {
    return res.status(400).json({ error: 'Software not found' });
  }
  res.json({ ipadress : IPv4to6(ipadress), language: language, software: software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
