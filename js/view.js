import {tempToCelsius, getTime, abbreviateMonth} from "./utilities.js"

export const UI_ELEMENTS = {
    INPUT: document.querySelector('.search__input'),
    BUTTON: document.querySelector('.search__btn'),
    TABS: document.querySelectorAll('.main-tabs__item'),
    CITY_LIST: document.querySelector('.city-list'),

    NOW: {
        TEMPERATURE: document.querySelector('.weather-now__temperature'),
        CITY: document.querySelector('.title-city-now'),
        BUTTON: document.querySelector('.weather-now__btn'),
        IMG: document.querySelector('.weather-now__img'),
    },

    DETAILS: {
        TITLE: document.querySelector('.weather-details__title'),
        TEMPERATURE: document.querySelector('.temperature'),
        FEELS_LIKE: document.querySelector('.feels_like'),
        WEATHER: document.querySelector('.weather'),
        SUNRISE: document.querySelector('.sunrise'),
        SUNSET: document.querySelector('.sunset'),
    },
    FORECAST: {
        TITLE: document.querySelector('.weather-forecast__title'),
        WEATHER_LIST: document.querySelectorAll('.weather-forecast__list-item'),
        DATE: document.querySelectorAll('.weather-forecast__top'),
        PARAMETERS: document.querySelectorAll('.weather-forecast__parameters'),
        PRECIPITATION: document.querySelectorAll('.weather-forecast__precipitation'),
    },

    TEMPLATE_ELEMENT: {
        CITY_ITEM: document.getElementById('city-item'),
    },
}

for (let tab of UI_ELEMENTS.TABS) {
    tab.addEventListener('click', switchTab);
}

function switchTab() {
    const navTab = document.querySelector('.main-tabs__item--active');
    const activeTab = document.querySelector('.main-tabs__block--active');
    navTab.classList.remove('main-tabs__item--active');
    activeTab.classList.remove('main-tabs__block--active');

    this.classList.add('main-tabs__item--active');
    const idClickTab = this.getAttribute('href');
    const idMainTabs = document.querySelector(idClickTab);
    idMainTabs.classList.add('main-tabs__block--active');
}

export function changeParamsTabNow(item) {
    const {
        main: {
            temp: temperatureKelvin,
        },
        name: cityName,
        weather: [{icon}]
    } = item

    UI_ELEMENTS.NOW.TEMPERATURE.textContent = `${tempToCelsius(temperatureKelvin)}`;
    UI_ELEMENTS.NOW.CITY.textContent = `${cityName}`;
    UI_ELEMENTS.NOW.IMG.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

export function changeParamsTabDetails(item) {
    const {
        name: cityName,
        main: {
            temp: temperatureKelvin,
            feels_like: feelsLikeKelvin,
        },
        weather: [{cloudCover}],
        sys: {
            sunrise,
            sunset,
        },
    } = item

    UI_ELEMENTS.DETAILS.TITLE.textContent = `${cityName}`;
    UI_ELEMENTS.DETAILS.TEMPERATURE.textContent = `${tempToCelsius(temperatureKelvin)}`;
    UI_ELEMENTS.DETAILS.FEELS_LIKE.textContent = `${tempToCelsius(feelsLikeKelvin)}`;
    UI_ELEMENTS.DETAILS.WEATHER.textContent = `${cloudCover}`;
    UI_ELEMENTS.DETAILS.SUNRISE.textContent = getTime(sunrise);
    UI_ELEMENTS.DETAILS.SUNSET.textContent = getTime(sunset);
}

export function changeParamsTabForecast(item) {
    const {
        FORECAST: {
            TITLE: titleForecast,
            WEATHER_LIST: weatherList,
            DATE: forecastDate,
            PARAMETERS: tempParams,
            PRECIPITATION: precipitation,
        }
    } = UI_ELEMENTS;

    titleForecast.textContent = item.city.name;

    weatherList.forEach((element, i) => {
        const date = new Date(item.list[i].dt * 1000);
        const icon = item.list[i].weather[0].icon;
        forecastDate[i].firstElementChild.textContent = `${date.getDate()}  ${abbreviateMonth(date.getMonth())}`;
        forecastDate[i].lastElementChild.textContent = getTime(date / 1000);
        tempParams[i].firstElementChild.textContent = `Temperature: ${tempToCelsius(item.list[i].main.temp)}`;
        tempParams[i].lastElementChild.textContent = `Feels like: ${tempToCelsius(item.list[i].main.feels_like)}`;
        precipitation[i].firstElementChild.textContent = item.list[i].weather[0].main;
        precipitation[i].lastElementChild.src = `https://openweathermap.org/img/wn/${icon}.png`;
    })
}

export function manipulationSavedCitiesUI(includeCity, selectedCity) {
    const templateCity = UI_ELEMENTS.TEMPLATE_ELEMENT.CITY_ITEM.content.cloneNode(true);
    if (~includeCity) {
        const cityList = document.querySelectorAll('.city-list__item');
        cityList[includeCity].remove();

        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart.svg")';
    } else {
        templateCity.firstElementChild.firstElementChild.textContent = selectedCity;
        UI_ELEMENTS.CITY_LIST.append(templateCity);

        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart_red.svg")';
    }
}