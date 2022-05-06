import {getWeather, savedCities} from "./main.js";
import {UI_ELEMENTS, deleteCityByHeartCloseUI} from "./view.js";

export async function showSavedCitiesOnReload() {
    const cities = JSON.parse(localStorage.getItem('favoriteCities'));

    async function addCityUI(cities) {
        if (cities[0]) {
            savedCities.add(cities[0]);
            renderCityUI(cities[0]);
            await cities.shift();

            return await addCityUI(cities);
        }
    }

    await addCityUI(cities);

    switchBetweenRenderedCities();
    await showLastSelectedCity();
    deleteCityByHEARTClose();
}

function renderCityUI(city) {
    const templateCity = UI_ELEMENTS.TEMPLATE_ELEMENT.CITY_ITEM.content.cloneNode(true);
    templateCity.firstElementChild.firstElementChild.textContent = city;
    UI_ELEMENTS.CITY_LIST.append(templateCity);
}

function switchBetweenRenderedCities() {
    const cityNames = document.querySelectorAll('.city');

    cityNames.forEach(cityName => {
        cityName.addEventListener('click', async function () {
            const city = this.textContent;
            await getWeather(city);
        });
    });
}

async function showLastSelectedCity() {
    const lastSelectedCity = localStorage.getItem('currentCity');
    if (lastSelectedCity) {
        await getWeather(lastSelectedCity);
    }
}

function deleteCityByHEARTClose() {
    const cityNames = document.querySelectorAll('.city-list__item');

    cityNames.forEach(cityName => {
        cityName.lastElementChild.addEventListener('click', function () {
            savedCities.delete(this.previousElementSibling.textContent);
            localStorage.setItem('favoriteCities', JSON.stringify([...savedCities]));

            deleteCityByHeartCloseUI(this);
        });
    });
}