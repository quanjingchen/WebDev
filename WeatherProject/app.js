const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require('node:https');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=4c74d83929da754ebd3d53847789d50c&units=metric&model=json";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on('data', (d) => {
      const weatherData = JSON.parse(d);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const weatherIcon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
      res.write("<h1>The temperature in "+ query +" is " + temp + "degrees Celcius.</h1>");
      res.write("<p>The weather is " + weatherDescription + ".</p>");
      res.write("<img src=" + weatherIcon + ">")
      res.send();
    });
  })
});



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
