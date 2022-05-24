import {getWeather, savedCities} from "./main.js";
import {UI_ELEMENTS, deleteCityByHeartCloseUI} from "./view.js";
import Cookies from 'js-cookie';

export class Storage {
    constructor(name, storage) {
        this.name = name;
        this.storage = (storage === localStorage) ? localStorage : sessionStorage;
    }

    set(key = 'favoriteCities') {
        try {
            this.storage.setItem(key, JSON.stringify([...this.name]));
        }
        catch (err) {
            console.log(err);
        }
    }

    get(key = 'favoriteCities') {
        return JSON.parse(this.storage.getItem(key));
    }

    clear(key = 'favoriteCities') {
        this.storage.removeItem(key);
    }

    isEmpty(key = 'favoriteCities') {
        return !this.get(key);
    }
}


export async function showSavedCitiesOnReload() {
    const names = new Storage(null, localStorage);
    const cities = names.get();

    async function addCityUI(cities) {
        if (cities && cities.length) {
            savedCities.add(cities[0]);
            renderCityUI(cities[0]);
            cities.shift();

            return await addCityUI(cities);
        }
    }

    await addCityUI(cities);

    switchBetweenRenderedCities();
    await showLastSelectedCity();
    deleteCityByHeartClose();
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
    const lastSelectedCity = Cookies.get('currentCity');
    if (lastSelectedCity) {
        await getWeather(lastSelectedCity);
    }
}

function deleteCityByHeartClose() {
    const cityNames = document.querySelectorAll('.city-list__item');

    cityNames.forEach(cityName => {
        cityName.lastElementChild.addEventListener('click', function () {
            savedCities.delete(this.previousElementSibling.textContent);
            localStorage.setItem('favoriteCities', JSON.stringify([...savedCities]));

            deleteCityByHeartCloseUI(this);
        });
    });
}
