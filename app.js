const express = require("express");
const https = require("https");
require("dotenv").config();
const bodyParser = require("body-parser");
const { request } = require("http");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appkey = process.env.appKey;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appkey + "&units=" + unit + "";


    https.get(url, function(response){
        console.log(response.statusCode);


        response.on("data", function(data){
            const weatherData =JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDiscription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>temperature in london is " + temp + " degrees celcius.</h1>");
            res.write("<h3>the weather discription is " + weatherDiscription);
            res.write("<img src="+ imgURL +">");
            res.send();
        });
    });
   
})

   




app.listen(3000, function() {
    console.log("server is runing in port 3000");
});