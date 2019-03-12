var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
 
// Start of Corny changes
app.get("/api/timestamp/", function (req, res) { // when user do not specify any date
  res.json(new Date());
});
app.get("/api/timestamp/:date_string", function (req, res) { // when user specify smth
  let result,time;
  let date = req.params.date_string;
  let patt = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  if(patt.test(date)){ // for date in yyyy-mm-dd format
    time = new Date(date); 
    result ={
      "unix": time.getTime(), // timestamp in milsec
      "utc": time.toUTCString()
    };
  }else{
    time = new Date(date*1000); // convert to milsec to use Dete method
    result = {
      "unix": time.getTime(), // timestamp in milsec
      "utc": time.toUTCString()
    }
  }
  res.json(result);
});
// END of Corny changes

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});