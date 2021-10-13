// Load npm modules and other stuff
import express from 'express';
import ejs from 'ejs';
import pjson from './package.json';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path'; // these lines should resolve the ES __dirname error
const __dirname = path.resolve(); // ^^

// Initiate Express
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
    var apikey = process.env.apikey;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`, {})
        .then(res => res.json())
        .then(data => {
            res.send(data);
        })
        .catch(error => console.error(error));
});