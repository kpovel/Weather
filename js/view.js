export const UI_ELEMENTS = {
    INPUT: document.querySelector('.search__input'),
    BUTTON: document.querySelector('.search__btn'),

    CITY_LIST: document.querySelector('.city-list'),
    CITY_LIST_ITEM: document.querySelectorAll('.city-list__item'),
    CITY_LIST_CLOSE: document.querySelectorAll('.city-list__close-btn'),

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
    },

    TEMPLATE_ELEMENT: {
        CITY_ITEM: document.getElementById('city-item'),
    },
}

const tabs = document.querySelectorAll('.main-tabs__item')
for (let tab of tabs) {
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
    const tempCelsius = Math.round(item.main.temp - 273.15);
    UI_ELEMENTS.NOW.TEMPERATURE.textContent = `${tempCelsius}°`;
    UI_ELEMENTS.NOW.CITY.textContent = `${item.name}`;

    const icon = item.weather[0].icon;
    UI_ELEMENTS.NOW.IMG.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

export function changeParamsTabDetails(item) {
    UI_ELEMENTS.DETAILS.TITLE.textContent = `${item.name}`;
    UI_ELEMENTS.DETAILS.TEMPERATURE.textContent = `${Math.round(item.main.temp - 273.15)}°`;
    UI_ELEMENTS.DETAILS.FEELS_LIKE.textContent = `${Math.round(item.main.feels_like - 273.15)}°`;
    UI_ELEMENTS.DETAILS.WEATHER.textContent = `${item.weather[0].main}`;
    UI_ELEMENTS.DETAILS.SUNRISE.textContent = getTime(item.sys.sunrise);
    UI_ELEMENTS.DETAILS.SUNSET.textContent = getTime(item.sys.sunset);
}

export function changeParamsTabForecast(item) {
    UI_ELEMENTS.FORECAST.TITLE.textContent = item.city.name;

    for (let i = 0; i < UI_ELEMENTS.FORECAST.WEATHER_LIST.length; i++) {
        const date = new Date(item.list[i].dt * 1000);
        const icon = item.list[i].weather[0].icon;
        UI_ELEMENTS.FORECAST.WEATHER_LIST[i].firstElementChild.firstElementChild.textContent = `${date.getDate()}  ${getMonth(date.getMonth())}`;
        UI_ELEMENTS.FORECAST.WEATHER_LIST[i].firstElementChild.lastElementChild.textContent = getTime(date / 1000);
        UI_ELEMENTS.FORECAST.WEATHER_LIST[i].lastElementChild.firstElementChild.firstElementChild.textContent = `Temperature: ${Math.round(item.list[i].main.temp - 273.15)}°`;
        UI_ELEMENTS.FORECAST.WEATHER_LIST[i].lastElementChild.firstElementChild.lastElementChild.textContent = `Feels like: ${Math.round(item.list[i].main.feels_like - 273.15)}°`;
        UI_ELEMENTS.FORECAST.WEATHER_LIST[i].lastElementChild.lastElementChild.firstElementChild.textContent = item.list[i].weather[0].main;
        UI_ELEMENTS.FORECAST.WEATHER_LIST[i].lastElementChild.lastElementChild.lastElementChild.src = `https://openweathermap.org/img/wn/${icon}.png`;
    }
}

function getTime(value) {
    const hours = new Date(value * 1000).getHours();
    const minutes = new Date(value * 1000).getMinutes();
    const replaceHours = hours < 10 ? `0${hours}` : hours;
    const replaceMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${replaceHours}:${replaceMinutes}`;
}

function getMonth(date) {
    switch (date) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'Aug';
        case 8:
            return 'Sept';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
    }
}