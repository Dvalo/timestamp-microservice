// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// timestamp 
app.get("/api/timestamp/:date?", function (req, res) {
  let dateParam = req.params.date;
  let dateValidation = new Date(dateParam);

  if (isNaN(dateValidation) === false) {
    let tempUnix = new Date(dateParam).getTime();
    let dateUTC = new Date(dateParam).toUTCString();
    res.json({unix: tempUnix, utc: dateUTC});

  } else if (isNaN(new Date(Number(dateParam))) === false) {
    let dateUTC = new Date(Number(dateParam)).toUTCString();
    res.json({ unix: Number(dateParam), utc: dateUTC});
  } else if (dateParam === "") {
    let tempUnix = new Date().getTime();
    let dateUTC = new Date().toUTCString();
    res.json({ unix: tempUnix, utc: dateUTC});
  } else {
    res.json({ error: "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
