import {
    UI_ELEMENTS, changeParamsTabNow, changeParamsTabDetails, changeParamsTabForecast, manipulationSavedCitiesUI,
} from "./view.js";
import {renderingSavedCitiesOnReload} from "./storage.js";
import {replaceHeart} from "./utilities.js";

export const savedCities = [];
const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '4783b73cfe02019303d03a9d793cc64b';


UI_ELEMENTS.INPUT.addEventListener('keydown', async function (e) {
    if (e.key === 'Enter') await getWeather()
});
UI_ELEMENTS.BUTTON.addEventListener('click', getWeather);

export async function getWeather(switchOfCity) {
    const cityName = switchOfCity ? switchOfCity : UI_ELEMENTS.INPUT.value.trim();
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        const weather = await response.json();

        changeParamsTabNow(weather);
        changeParamsTabDetails(weather);
        await getForecastWeather(cityName);

        localStorage.setItem('currentCity', weather.name);

        const cityInSaved = savedCities.findIndex(item => item === UI_ELEMENTS.NOW.CITY.textContent);
        replaceHeart(cityInSaved)
    }
    catch (err) {
        if (err.name === 'TypeError') {
            alert(`${err.name}: undefined city`);
        } else {
            alert(err);
        }
    }
    UI_ELEMENTS.INPUT.value = null
}

async function getForecastWeather(city) {
    try {
        const url = `${FORECAST_URL}?q=${city}&cnt=3&appid=${API_KEY}`;
        const response = await fetch(url)
        const weather = await response.json()
        changeParamsTabForecast(weather)
    }
    catch (err) {
        alert(err)
    }
}

UI_ELEMENTS.NOW.BUTTON.addEventListener('click', manipulationSavedCities);

function manipulationSavedCities() {
    const cityNow = UI_ELEMENTS.NOW.CITY.textContent;
    const savedCity = savedCities.findIndex(item => item === cityNow);
    const isNotEmptySavedList = UI_ELEMENTS.NOW.BUTTON.style.background === 'url("./img/heart.svg")';

    if (~savedCity) {
        savedCities.splice(savedCity, 1);
        localStorage.setItem('favoriteCities', JSON.stringify(savedCities));
    } else {
        savedCities.push(cityNow);
        localStorage.setItem('favoriteCities', JSON.stringify(savedCities));
    }

    manipulationSavedCitiesUI(savedCity, cityNow);
    if (isNotEmptySavedList) chooseSavedCity();

    const closeButtonList = document.querySelectorAll('.city-list__close-btn');
    for (const button of closeButtonList) {
        button.addEventListener('click', deleteCityByButtonClose);
    }
}

function deleteCityByButtonClose() {
    const thisCity = this.previousElementSibling.textContent;
    const indexCity = savedCities.findIndex(item => item === thisCity);

    savedCities.splice(indexCity, 1);
    this.parentElement.remove();
    localStorage.setItem('favoriteCities', JSON.stringify(savedCities));
    if (UI_ELEMENTS.NOW.CITY.textContent === thisCity) {
        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart.svg")';
    }
}

function chooseSavedCity() {
    const cityList = document.querySelectorAll('.city');

    cityList[cityList.length - 1].addEventListener('click', async function () {
        const savedCity = this.textContent;
        await getWeather(savedCity);
    })
}

renderingSavedCitiesOnReload();