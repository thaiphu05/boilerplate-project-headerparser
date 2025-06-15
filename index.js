// index.js

require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');

// Hàm chuyển IPv4 thành IPv6 dạng ::ffff:x.x.x.x
function IPv4to6(ip) {
  if (!ip) return '';
  if (ip.startsWith('::ffff:')) return ip;
  return '::ffff:' + ip;
}

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function (req, res) {
  let ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  
  // Nếu có nhiều IP trong chuỗi x-forwarded-for, lấy cái đầu tiên
  if (ipaddress.includes(',')) {
    ipaddress = ipaddress.split(',')[0].trim();
  }

  // Nếu IP đã ở dạng ::ffff:x.x.x.x thì không chuyển lại nữa
  ipaddress = IPv4to6(ipaddress.replace('::ffff:', ''));

  const language = req.headers['accept-language'] || '';
  const software = req.headers['user-agent'] || '';

  if (!ipaddress || !language || !software) {
    return res.status(400).json({ error: 'Missing headers' });
  }

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
