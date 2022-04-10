import {UI_ELEMENTS} from "./view.js";

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';


UI_ELEMENTS.INPUT.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        getWeather()
    }
})
UI_ELEMENTS.BUTTON.addEventListener('click', getWeather)


function getWeather() {
    const cityName = UI_ELEMENTS.INPUT.value;
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

    fetch(url)
        .catch(() => {
            throw new URIError('error url')
        })
        .then(response => response.json())
        .then(item => {
            const tempCelsius = Math.round(item.main.temp - 273.15)
            UI_ELEMENTS.WEATHER_NOW.textContent = `${tempCelsius}°`
            UI_ELEMENTS.WEATHER_CITY_NOW.textContent = `${item.name}`
        })

        .catch((err) => {
            if (err.name === 'URIError') {
                alert(err)
            }else if (err.name === 'TypeError'){
                alert(`${err.name}: undefined city`)
            }
        })
        .finally(() => UI_ELEMENTS.INPUT.value = null)
}