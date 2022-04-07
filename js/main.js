// import './view.js'
import {UI_ELEMENTS} from "./view.js";

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';


UI_ELEMENTS.INPUT.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        sendRequest()
    }
})
UI_ELEMENTS.BUTTON.addEventListener('click', sendRequest)


function sendRequest() {
    const cityName = UI_ELEMENTS.INPUT.value;
    const url = `${SERVER_URL}?q=${cityName}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            const tempCelsius = Math.round(json.main.temp - 273.15)
            UI_ELEMENTS.WEATHER_NOW.textContent = `${tempCelsius}°`
            UI_ELEMENTS.WEATHER_CITY_NOW.textContent = `${json.name}`
        })
    UI_ELEMENTS.INPUT.value = null
}