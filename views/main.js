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
var lat = 0;
var lon = 0;
function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    }, () => {
        document.getElementById('info').innerText = "Geolocation is not supported by this browser.";
    });
}
// Begin of Map loading and other stuff
function loadAssets() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhY2tkcmFnb24tYiIsImEiOiJja3NibjEzczkwOGR4Mndwazg4NjloNGx0In0.WrmQ8KgAT95audjoWuAXug'; // Haha, URL restriction go brr.
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: mapstyle, // style URL
        center: [lon, lat], // starting position [lng, lat]
        zoom: 15, // starting zoom
        interactive: false
    });
    //openweathermap
    fetch(`/getWeather/${lat}/${lon}`, {})
        .then(res => res.json())
        .then(data => {
            document.getElementById('wStatus').innerText = data.weather[0].main;
            document.getElementById('mintemp').innerText = Math.floor(data.main.temp_min - 273);
            document.getElementById('temp').innerText = Math.floor(data.main.temp - 273);
            document.getElementById('maxtemp').innerText = Math.floor(data.main.temp_max - 273);
            document.getElementById('humidity').innerText = data.main.humidity;  
            document.getElementById('loc').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('windspeed').innerText = data.wind.speed;
            document.getElementById('mainIcon').innerHTML = getIcon(data.weather[0].icon);
        })
        .catch(error => console.error(error));
};
// End of Map loading and other stuff
var mapstyle = '';
var currentmode = 'light';
function applyTheme() {
    if (currentmode == 'light') {
        mapstyle = 'mapbox://styles/mapbox/dark-v10';
        document.body.style.color = '#cccccc';
        document.body.style.backgroundColor = 'White';
        document.getElementById('themeicon').innerHTML = '<h3><span class="iconify" data-icon="mdi-weather-night" style="color: #cccccc"></span></h3>';
        currentmode = 'dark';
    } else if (currentmode == 'dark') {
        mapstyle = 'mapbox://styles/mapbox/light-v10';
        document.body.style.color = '#333333';
        document.body.style.backgroundColor = 'Black';
        document.getElementById('themeicon').innerHTML = '<h3><span class="iconify" data-icon="mdi-weather-sunny" style="color: #333333"></span></h3>';
        currentmode = 'light';
    };
    loadAssets();
};
getLocation();