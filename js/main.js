import {
    UI_ELEMENTS,
    changeParamsTabNow,
    changeParamsTabDetails,
    changeParamsTabForecast,
    changeListCitiesByClickingHeartUI,
} from "./view.js";
import {showSavedCitiesOnReload} from "./storage.js";
import {replaceHeart} from "./utilities.js";
import {addHours} from 'date-fns';
import Cookies from 'js-cookie';

export const savedCities = new Set();
const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '4783b73cfe02019303d03a9d793cc64b';


UI_ELEMENTS.INPUT.addEventListener('keydown', async function (e) {
    if (e.key === 'Enter') {
        await getWeather();
    }
});
UI_ELEMENTS.HEART.addEventListener('click', getWeather);

export async function getWeather(switchOfCity) {
    const cityName = switchOfCity ? switchOfCity : UI_ELEMENTS.INPUT.value.trim();
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        const weather = await response.json();

        changeParamsTabNow(weather);
        changeParamsTabDetails(weather);
        await getForecastWeather(cityName);
        Cookies.set('currentCity', weather.name, {expires: addHours(Date.now(), 1)});

        const isCitySaved = savedCities.has(UI_ELEMENTS.NOW.CITY.textContent);
        replaceHeart(isCitySaved);
    }
    catch (err) {
        if (err.name === 'TypeError') {
            alert(`${err.name}: undefined city`);
        } else {
            alert(err);
        }
    }
    UI_ELEMENTS.INPUT.value = null;
}

async function getForecastWeather(city) {
    try {
        const url = `${FORECAST_URL}?q=${city}&cnt=3&appid=${API_KEY}`;
        const response = await fetch(url);
        const weather = await response.json();
        changeParamsTabForecast(weather);
    }
    catch (err) {
        alert(err);
    }
}

UI_ELEMENTS.NOW.HEART.addEventListener('click', changeListCitiesByClickingHeart);

function changeListCitiesByClickingHeart() {
    const cityNow = UI_ELEMENTS.NOW.CITY.textContent;
    const savedCity = savedCities.has(cityNow);
    const isNotEmptySavedList = UI_ELEMENTS.NOW.HEART.getAttribute('heart') === 'noChecked';

    if (savedCity) {
        savedCities.delete(cityNow);
        localStorage.setItem('favoriteCities', JSON.stringify([...savedCities]));
    } else {
        savedCities.add(cityNow);
        localStorage.setItem('favoriteCities', JSON.stringify([...savedCities]));
    }

    changeListCitiesByClickingHeartUI(savedCity, cityNow);
    if (isNotEmptySavedList) chooseSavedCityOnClick();
}

export function deleteCityByButtonClose() {
    const closeButtonsList = document.querySelectorAll('.city-list__close-btn');

    closeButtonsList[closeButtonsList.length - 1].addEventListener('click', function () {
        const thisCity = this.previousElementSibling.textContent;
        savedCities.delete(thisCity);
        this.parentElement.remove();

        localStorage.setItem('favoriteCities', JSON.stringify([...savedCities]));
        if (UI_ELEMENTS.NOW.CITY.textContent === thisCity) {
            UI_ELEMENTS.NOW.HEART.setAttribute('heart', 'noChecked');
        }
    });
}

function chooseSavedCityOnClick() {
    const cityList = document.querySelectorAll('.city');

    cityList[cityList.length - 1].addEventListener('click', async function () {
        const savedCity = this.textContent;
        await getWeather(savedCity);
    });
}

showSavedCitiesOnReload();