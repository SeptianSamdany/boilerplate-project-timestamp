// index.js
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Function to handle date parsing and response
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // If no date is provided, return the current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If the date is a number, convert it to a date object (Unix timestamp)
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat it as a string date
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Format the response
  const response = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };

  res.json(response);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
