function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var apikey = "5f19b84eacf27e8587657d0156c4cae5"; // Apikey for openweathermap
        //mapboxgl
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhY2tkcmFnb24tYiIsImEiOiJja3NhZTU0NTYyNXBkMm5waGhmaHdlbm9jIn0.a1oLMiTjKEHObnA9yGyuAw';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: mapstyle, // style URL
            center: [lon, lat], // starting position [lng, lat]
            zoom: 15, // starting zoom
            interactive: false
        });
        //openweathermap
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`, {})
            .then(res => res.json())
            .then(data => {
                document.getElementById('wStatus').innerText = data.weather[0].main;
                document.getElementById('mintemp').innerText = Math.floor(data.main.temp_min - 273);
                document.getElementById('temp').innerText = Math.floor(data.main.temp - 273);
                document.getElementById('maxtemp').innerText = Math.floor(data.main.temp_max - 273);
                document.getElementById('humidity').innerText = data.main.humidity;  
                document.getElementById('loc').innerText = `${data.name}, ${data.sys.country}`;
                document.getElementById('windspeed').innerText = data.wind.speed;
            })
            .catch(error => console.error(error));
    }, () => {
        document.getElementById('info').innerText = "Geolocation is not supported by this browser.";
    });
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
function setCookie(cname, cvalue) { document.cookie = cname + "=" + cvalue };
var mapstyle = ''
function setDefaultTheme(mode) { setCookie(DefaultTheme, mode)}
function applyTheme(mode) {
    if (mode == 'dark') {
        mapstyle = 'mapbox://styles/mapbox/dark-v10';
        document.body.style.color = "white"
    } else if (mode == 'light') {
        mapstyle = 'mapbox://styles/mapbox/light-v10';
        document.body.style.color = "black"
    } else {
        setCookie(DefaultTheme, 'dark')
    }
}