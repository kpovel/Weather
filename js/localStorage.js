import {getWeather, savedCities} from "./main.js";
import {UI_ELEMENTS} from "./view.js";

export function renderingSavedCitiesOnReload() {
    const cities = Object.keys(localStorage);
    for (const city of cities) {
        if (city === 'lastSelectedCity') continue
        savedCities.push(city);

        renderCityUI(city);
    }

    switchBetweenRenderedCities();
    removeRenderedCity();
    chooseLastSelectedCity();
}

function chooseLastSelectedCity() {
    const lastSelectedCity = localStorage.getItem('lastSelectedCity');
    if (lastSelectedCity) {
        console.log(lastSelectedCity);
        getWeather(lastSelectedCity.toString());
    }
}

function renderCityUI(city) {
    const templateCity = UI_ELEMENTS.TEMPLATE_ELEMENT.CITY_ITEM.content.cloneNode(true);
    templateCity.firstElementChild.firstElementChild.textContent = city;
    UI_ELEMENTS.CITY_LIST.append(templateCity);
}

function removeRenderedCity() {
    const cityNames = document.querySelectorAll('.city-list__item');
    for (const cityName of cityNames) {
        cityName.addEventListener('click', function () {
            const city = this.firstElementChild.textContent;
            getWeather(city);
        })
    }
}

function switchBetweenRenderedCities() {
    const cityNames = document.querySelectorAll('.city-list__item');
    for (const cityName of cityNames) {
        cityName.addEventListener('click', function () {
            const city = this.firstElementChild.textContent;
            getWeather(city);
        })
    }
}