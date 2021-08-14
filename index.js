// Load npm modules and other stuff
var express = require('express');
const ejs = require('ejs');
var pjson = require('./package.json');
const cors = require('cors')
const fetch = require('node-fetch');
require('dotenv').config()

// Init Express
var app = express();
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
// Render website
app.listen(8080);
app.get('/', function (req, res) {
    res.render('index', {
        version: pjson.version,
    });
});

app.get('/getWeather/:lat/:lon', (req, res, next) =>{
    var lat = req.params.lat
    var lon = req.params.lon
    var apikey = '774f44267a00519638b6374c17a580cf'
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`, {})
        .then(res => res.json())
        .then(data => {
            res.send(data);
        })
        .catch(error => console.error(error));
});

app.get('/getMap/:lat/:lon/:theme/:resw/:resh', (req, res, next) =>{
    var lat = req.params.lat
    var lon = req.params.lon
    var theme = req.params.theme
    var resw = req.params.resw
    var resh = req.params.resh
    var map
    var apikey = process.env.apikey;
    switch (theme) {
        case ('dark'):
            map = 'dark-v10';
        case ('light'):
            map = 'light-v10';
    };
    res.write(`<img src='https://api.mapbox.com/styles/v1/mapbox/${map}/static/${lon},${lat},15,0/${resw}x${resh}?access_token=${apikey}'/>`);
    res.send();
});