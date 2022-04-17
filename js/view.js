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
    UI_ELEMENTS.DETAILS.SUNRISE.textContent = function () {
        const hours = new Date(item.sys.sunrise * 1000).getHours();
        const minutes = new Date(item.sys.sunrise * 1000).getMinutes();
        const replaceHours = hours < 10 ? `0${hours}` : hours;
        const replaceMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${replaceHours}:${replaceMinutes}`;
    }();
    UI_ELEMENTS.DETAILS.SUNSET.textContent = function () {
        const hours = new Date(item.sys.sunset * 1000).getHours();
        const minutes = new Date(item.sys.sunset * 1000).getMinutes();
        const replaceHours = hours < 10 ? `0${hours}` : hours;
        const replaceMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${replaceHours}:${replaceMinutes}`;
    }();
}