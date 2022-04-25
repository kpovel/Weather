import {getWeather, savedCities} from "./main.js";
import {UI_ELEMENTS, deleteCityByButtonCloseUI} from "./view.js";

export async function renderingSavedCitiesOnReload() {
    const cities = JSON.parse(localStorage.getItem('favoriteCities'));
    for (const city of cities) {
        if (city === 'currentCity') continue
        savedCities.push(city);

        renderCityUI(city);
    }

    switchBetweenRenderedCities();
    await chooseLastSelectedCity();
    deleteCityByButtonClose();
}

function renderCityUI(city) {
    const templateCity = UI_ELEMENTS.TEMPLATE_ELEMENT.CITY_ITEM.content.cloneNode(true);
    templateCity.firstElementChild.firstElementChild.textContent = city;
    UI_ELEMENTS.CITY_LIST.append(templateCity);
}

function switchBetweenRenderedCities() {
    const cityNames = document.querySelectorAll('.city');
    for (const cityName of cityNames) {
        cityName.addEventListener('click', async function () {
            const city = this.textContent;
            await getWeather(city);
        })
    }
}

async function chooseLastSelectedCity() {
    const getCurrentCity = localStorage.getItem('currentCity');
    if (getCurrentCity) {
        await getWeather(getCurrentCity);
    }
}

function deleteCityByButtonClose() {
    const cityNames = document.querySelectorAll('.city-list__item');
    for (const cityName of cityNames) {
        cityName.lastElementChild.addEventListener('click', function () {
            const savedCity = savedCities.findIndex(city => city === this.previousElementSibling.textContent.trim());
            savedCities.splice(savedCity, 1);
            localStorage.setItem('favoriteCities', JSON.stringify(savedCities));

            deleteCityByButtonCloseUI(this);
        })
    }
}