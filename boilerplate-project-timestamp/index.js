// index.js
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  const date_string = req.params.date;

  let response = {unix: null, utc: null};
  

  if (!date_string) {
    const dateNow = Date.now();

    return res.json({
      unix: parseInt(dateNow),
      utc: new Date(dateNow).toUTCString()
    });
  }
 
  let date;

  let isValidDate = Date.parse(date_string);

  console.log(isValidDate);
 

  
  if (/^\d+$/.test(date_string)) {
    date = new Date(Number(date_string));

    response = { unix: Number(date_string),
      utc: date.toUTCString() };
  }
  else if(isValidDate) {
    date = new Date(date_string);
   
    response =  {
      unix: date.valueOf(),
      utc: date.toUTCString()
    }

  }  
  

  
 

  

    if (response.unix === null || response.utc === "Invalid Date") {
      return res.json({error: "Invalid Date"})
    }
    else {
      return res.json(response);
    }

  

})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
