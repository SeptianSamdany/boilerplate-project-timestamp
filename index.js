// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// New API endpoint for timestamp conversion
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // Check if the date parameter is empty
  if (!dateParam) {
    date = new Date(); // Current date
  } else if (!isNaN(dateParam)) {
    // If the parameter is a number, treat it as a Unix timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat it as a date string
    date = new Date(dateParam);
  }

  // If the date is invalid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Send the response with unix and utc properties
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
