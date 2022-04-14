import {TEMPLATE_ELEMENT, UI_ELEMENTS} from "./view.js";

const savedCity = []
const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '4783b73cfe02019303d03a9d793cc64b';


UI_ELEMENTS.INPUT.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        getWeather()
    }
})
UI_ELEMENTS.BUTTON.addEventListener('click', getWeather)

function getWeather(switchOfCity) {
    const cityName = switchOfCity ? switchOfCity : UI_ELEMENTS.INPUT.value.trim();
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

            const icon = item.weather[0].icon
            UI_ELEMENTS.WEATHER_NOW_IMG.src = `https://openweathermap.org/img/wn/${icon}@4x.png`
        })
        .then(() => {
            const cityInSaved = savedCity.findIndex(item => item === UI_ELEMENTS.WEATHER_CITY_NOW.textContent)
            if (~cityInSaved) {
                UI_ELEMENTS.WEATHER_NOW_BUTTON.style.background = 'url("./img/heart_red.svg")'
            } else {
                UI_ELEMENTS.WEATHER_NOW_BUTTON.style.background = 'url("./img/heart.svg")'
            }
        })
        .catch((err) => {
            if (err.name === 'URIError') {
                alert(err)
            } else if (err.name === 'TypeError') {
                alert(`${err.name}: undefined city`)
            }
        })
        .finally(() => UI_ELEMENTS.INPUT.value = null)
}


UI_ELEMENTS.WEATHER_NOW_BUTTON.addEventListener('click', saveCity)

function saveCity() {
    const cityNow = UI_ELEMENTS.WEATHER_CITY_NOW.textContent
    const templateCity = TEMPLATE_ELEMENT.CITY_ITEM.content.cloneNode(true)
    const includeCity = savedCity.findIndex(item => item === cityNow)

    if (~includeCity) {
        savedCity.splice(includeCity, 1)
        const cityList = document.querySelectorAll('.city-list__item')
        cityList[includeCity].remove()

        UI_ELEMENTS.WEATHER_NOW_BUTTON.style.background = 'url("./img/heart.svg")'
    } else {
        savedCity.push(cityNow)
        
        templateCity.firstElementChild.firstElementChild.textContent = cityNow
        UI_ELEMENTS.CITY_LIST.append(templateCity)

        UI_ELEMENTS.WEATHER_NOW_BUTTON.style.background = 'url("./img/heart_red.svg")'
    }

    chooseSavedCity()

    const cityList = document.querySelectorAll('.city-list__close-btn')
    for (let city of cityList) {
        city.addEventListener('click', deleteCityByButtonClose)
    }
    console.log(savedCity)
}

function deleteCityByButtonClose() {
    const thisCity = this.previousElementSibling.textContent
    const indexCity = savedCity.findIndex(item => item === thisCity)

    savedCity.splice(indexCity, 1)
    this.parentElement.remove()
    UI_ELEMENTS.WEATHER_NOW_BUTTON.style.background = 'url("./img/heart.svg")'
}

function chooseSavedCity() {
    const cityList = document.querySelectorAll('.city')

    for (let cityListElement of cityList) {
        cityListElement.addEventListener('click', function () {
            const searchCity = this.textContent
            getWeather(searchCity)
        })
    }
}