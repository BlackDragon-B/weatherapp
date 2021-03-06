function getIcon(owmIcon) {
    switch (owmIcon) {
        case "01d":
            return '<span class="iconify" data-icon="mdi-weather-sunny"></span>';

        case "01n":
            return '<span class="iconify" data-icon="mdi-weather-sunny"></span>';

        case "02d":
            return '<span class="iconify" data-icon="mdi-weather-partly-cloudy"></span>';

        case "02n":
            return '<span class="iconify" data-icon="mdi-weather-partly-cloudy"></span>';

        case "03d":
            return '<span class="iconify" data-icon="mdi-weather-cloudy"></span>';

        case "03n":
            return '<span class="iconify" data-icon="mdi-weather-cloudy"></span>';

        case "04d":
            return '<span class="iconify" data-icon="mdi-weather-cloudy"></span>';

        case "04n":
            return '<span class="iconify" data-icon="mdi-weather-cloudy"></span>';

        case "09d":
            return '<span class="iconify" data-icon="mdi-weather-pouring"></span>';

        case "09n":
            return '<span class="iconify" data-icon="mdi-weather-pouring"></span>';

        case "10d":
            return '<span class="iconify" data-icon="mdi-weather-partly-rainy"></span>';

        case "10n":
            return '<span class="iconify" data-icon="mdi-weather-partly-rainy"></span>';

        case "11d":
            return '<span class="iconify" data-icon="mdi-weather-lightning"></span>';

        case "11n":
            return '<span class="iconify" data-icon="mdi-weather-lightning"></span>';

        case "13d":
            return '<span class="iconify" data-icon="mdi-snowflake"></span>';

        case "13n":
            return '<span class="iconify" data-icon="mdi-snowflake"></span>';

        default:
            return '<span class="iconify" data-icon="mdi-help-circle-outline"></span>';
    }
};
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
var lat
var lon
var MetricFormula
// Begin of Map loading and other stuff
function loadMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhY2tkcmFnb24tYiIsImEiOiJja3NibjEzczkwOGR4Mndwazg4NjloNGx0In0.WrmQ8KgAT95audjoWuAXug'; // Haha, URL restriction go brr.
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: mapstyle, // style URL
        center: [lon, lat], // starting position [lng, lat]
        zoom: 15, // starting zoom
        interactive: false
    });
    loadAssets()
};
function loadAssets() {
    //openweathermap
    fetch(`/getWeather/${lat}/${lon}`, {})
        .then(res => res.json())
        .then(data => {
            document.getElementById('wStatus').innerText = data.weather[0].main;
            document.getElementById('mintemp').innerText = calculateMetric(data.main.temp_min);
            document.getElementById('temp').innerText = calculateMetric(data.main.temp);
            document.getElementById('maxtemp').innerText = calculateMetric(data.main.temp_max);
            document.getElementById('humidity').innerText = data.main.humidity;  
            document.getElementById('loc').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('windspeed').innerText = data.wind.speed;
            document.getElementById('mainIcon').innerHTML = getIcon(data.weather[0].icon);
        })
        .catch(error => console.error(error));
};
// End of Map loading and other stuff
var mapstyle = '';
if (getCookie("DefaultTheme") === "") {
    setCookie("DefaultTheme","dark");
}
if (getCookie("DefaultMetric") === "") {
    setCookie("DefaultMetric","celsius");
}
var currentmode = getCookie("DefaultTheme"); 
var buttoncolor = '';
function setTheme(mode) {
    if (mode == 'dark') {
        mapstyle = 'mapbox://styles/mapbox/dark-v10';
        document.body.style.color = '#cccccc';
        buttoncolor = '#cccccc';
        currentmode = 'dark';
        document.body.style.backgroundColor = '#343332';
        document.getElementById('themeicon').innerHTML = '<h3><span class="iconify" data-icon="mdi-weather-night" style="color: #cccccc"></span></h3>';
        document.getElementById('metricicon').innerHTML = '<h3><span class="iconify" data-icon="mdi-thermometer" style="color: #cccccc"></span></h3>';      
    } else if (mode == 'light') {  
        mapstyle = 'mapbox://styles/mapbox/light-v10';
        document.body.style.color = '#333333';
        buttoncolor = '#333333';
        currentmode = 'light';
        document.body.style.backgroundColor = '#F6F6F4';
        document.getElementById('themeicon').innerHTML = '<h3><span class="iconify" data-icon="mdi-weather-sunny" style="color: #333333"></span></h3>';
        document.getElementById('metricicon').innerHTML = '<h3><span class="iconify" data-icon="mdi-thermometer" style="color: #333333"></span></h3>';    
    };
    if (lat && lon ) {loadMap()};
};
function applyTheme() {
    if (currentmode == 'light') {
        setTheme('dark');
        setCookie("DefaultTheme","dark");
    } else if (currentmode == 'dark') {
        setTheme('light');
        setCookie("DefaultTheme","light");
    };
};
var currentMetric = getCookie("DefaultMetric");
function toggleMetric() {
    if (currentMetric == 'celsius') {
        currentMetric = 'kelvin';
        setCookie("DefaultMetric","kelvin");
    } else if (currentMetric == 'kelvin') {
        currentMetric = 'fahrenheit';
        setCookie("DefaultMetric","fahrenheit");
    } else if (currentMetric == 'fahrenheit') {
        currentMetric = 'celsius';
        setCookie("DefaultMetric","celsius");
    };   
    if (lat && lon ) {loadAssets()};
};
function calculateMetric(numb) {
    if (currentMetric == 'kelvin') {
        return `${Math.floor(numb).toString()}K`;
    } else if (currentMetric == 'celsius') {
        return `${Math.floor((numb-273.15)).toString()}??C`;
    } else if (currentMetric == 'fahrenheit') {
        return `${Math.floor(((numb-273.15)*1.8)+32).toString()}??F`;
    };
};
function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        setTheme(getCookie("DefaultTheme"));
    }, () => {
        document.getElementById("overlay").style.display = "block";
        setTheme(getCookie("DefaultTheme"));
    });
}