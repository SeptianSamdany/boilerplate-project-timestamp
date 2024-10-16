// index.js
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  res.json({
    unix: (new Date()).getTime(), 
    utc: (new Date()).toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  
  // Cek apakah date adalah angka atau string
  let parsedDate;
  
  // Jika parameter hanya angka (dalam format timestamp)
  if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date); // Jika parameter adalah string
  }
  
  // Jika parsedDate tidak valid
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Jika tanggal valid, kembalikan nilai unix dan utc
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
