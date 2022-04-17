import {UI_ELEMENTS, changeParamsTabNow, changeParamsTabDetails} from "./view.js";

const savedCities = [];
const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '4783b73cfe02019303d03a9d793cc64b';


UI_ELEMENTS.INPUT.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') getWeather()
})
UI_ELEMENTS.BUTTON.addEventListener('click', getWeather)

function getWeather(switchOfCity) {
    const cityName = switchOfCity ? switchOfCity : UI_ELEMENTS.INPUT.value.trim();
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

    fetch(url)
        .catch(() => {
            throw new URIError('error url');
        })
        .then(response => response.json())
        .then(item => {
            changeParamsTabNow(item);
            changeParamsTabDetails(item);
        })
        .then(() => {
            const cityInSaved = savedCities.findIndex(item => item === UI_ELEMENTS.NOW.CITY.textContent);
            if (~cityInSaved) {
                UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart_red.svg")';
            } else {
                UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart.svg")';
            }
        })
        .catch((err) => {
            if (err.name === 'URIError') {
                alert(err);
            } else if (err.name === 'TypeError') {
                alert(`${err.name}: undefined city`);
            }else {
                alert(err);
            }
        })
        .finally(() => UI_ELEMENTS.INPUT.value = null)
}


UI_ELEMENTS.NOW.BUTTON.addEventListener('click', manipulationSavedCities)

function manipulationSavedCities() {
    const cityNow = UI_ELEMENTS.NOW.CITY.textContent;
    const templateCity = UI_ELEMENTS.TEMPLATE_ELEMENT.CITY_ITEM.content.cloneNode(true);
    const includeCity = savedCities.findIndex(item => item === cityNow);
    const isNotEmptySavedList = UI_ELEMENTS.NOW.BUTTON.style.background === 'url("./img/heart.svg")';

    if (~includeCity) {
        savedCities.splice(includeCity, 1);
        const cityList = document.querySelectorAll('.city-list__item');
        cityList[includeCity].remove();

        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart.svg")';
    } else {
        savedCities.push(cityNow);

        templateCity.firstElementChild.firstElementChild.textContent = cityNow;
        UI_ELEMENTS.CITY_LIST.append(templateCity);

        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart_red.svg")';
    }

    if (isNotEmptySavedList) chooseSavedCity();

    const closeButtonList = document.querySelectorAll('.city-list__close-btn');
    for (const button of closeButtonList) {
        button.addEventListener('click', deleteCityByButtonClose);
    }
    console.log(savedCities);
}

function deleteCityByButtonClose() {
    const thisCity = this.previousElementSibling.textContent;
    const indexCity = savedCities.findIndex(item => item === thisCity);

    savedCities.splice(indexCity, 1);
    this.parentElement.remove();
    if (UI_ELEMENTS.NOW.CITY.textContent === thisCity) {
        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart.svg")';
    }
}

function chooseSavedCity() {
    const cityList = document.querySelectorAll('.city');

    cityList[cityList.length - 1].addEventListener('click', function () {
        const searchCity = this.textContent;
        getWeather(searchCity);
    })
}