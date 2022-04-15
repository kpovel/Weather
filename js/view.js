export const UI_ELEMENTS = {
    INPUT: document.querySelector('.search__input'),
    BUTTON: document.querySelector('.search__btn'),
    WEATHER_NOW: document.querySelector('.weather-now__temperature'),
    WEATHER_CITY_NOW: document.querySelector('.title-city-now'),
    WEATHER_NOW_BUTTON: document.querySelector('.weather-now__btn'),
    WEATHER_NOW_IMG: document.querySelector('.weather-now__img'),
    CITY_LIST: document.querySelector('.city-list'),
    CITY_LIST_ITEM: document.querySelectorAll('.city-list__item'),
    CITY_LIST_CLOSE: document.querySelectorAll('.city-list__close-btn'),
    WEATHER_DETAILS_TITLE: document.querySelector('.weather-details__title'),
    WEATHER_DETAILS_TEMPERATURE: document.querySelector('.temperature'),
    WEATHER_DETAILS__FEELS_LIKE: document.querySelector('.feels_like'),
    WEATHER_DETAILS_WEATHER: document.querySelector('.weather'),
    WEATHER_DETAILS_SUNRISE: document.querySelector('.sunrise'),
    WEATHER_DETAILS_SUNSET: document.querySelector('.sunset'),
}
export const TEMPLATE_ELEMENT = {
    CITY_ITEM: document.getElementById('city-item')
}


const tabs = document.querySelectorAll('.main-tabs__item')
for (let tab of tabs) {
    tab.addEventListener('click', switchTab)
}

function switchTab() {
    const navTab = document.querySelector('.main-tabs__item--active')
    let activeTab = document.querySelector('.main-tabs__block--active')
    navTab.classList.remove('main-tabs__item--active')
    activeTab.classList.remove('main-tabs__block--active')

    this.classList.add('main-tabs__item--active')
    const idClickTab = this.getAttribute('href')
    const idMainTabs = document.querySelector(idClickTab)
    idMainTabs.classList.add('main-tabs__block--active')
}


export function changeParamsOnNow(item) {
    const tempCelsius = Math.round(item.main.temp - 273.15)
    UI_ELEMENTS.WEATHER_NOW.textContent = `${tempCelsius}°`
    UI_ELEMENTS.WEATHER_CITY_NOW.textContent = `${item.name}`

    const icon = item.weather[0].icon
    UI_ELEMENTS.WEATHER_NOW_IMG.src = `https://openweathermap.org/img/wn/${icon}@4x.png`
}

export function changeParamsOnDetails(item) {
    UI_ELEMENTS.WEATHER_DETAILS_TITLE.textContent = `${item.name}`
    UI_ELEMENTS.WEATHER_DETAILS_TEMPERATURE.textContent = `${Math.round(item.main.temp - 273.15)}°`
    UI_ELEMENTS.WEATHER_DETAILS__FEELS_LIKE.textContent = `${Math.round(item.main.feels_like - 273.15)}°`
    UI_ELEMENTS.WEATHER_DETAILS_WEATHER.textContent = `${item.weather[0].main}`
    UI_ELEMENTS.WEATHER_DETAILS_SUNRISE.textContent = function () {
        const hours = new Date(item.sys.sunrise * 1000).getHours()
        const minutes = new Date(item.sys.sunrise * 1000).getMinutes()
        const replaceHours = hours < 10 ? `0${hours}` : hours
        const replaceMinutes = minutes < 10 ? `0${minutes}` : minutes
        return `${replaceHours}:${replaceMinutes}`
    }()
    UI_ELEMENTS.WEATHER_DETAILS_SUNSET.textContent = function () {
        const hours = new Date(item.sys.sunset * 1000).getHours()
        const minutes = new Date(item.sys.sunset * 1000).getMinutes()
        const replaceHours = hours < 10 ? `0${hours}` : hours
        const replaceMinutes = minutes < 10 ? `0${minutes}` : minutes
        return `${replaceHours}:${replaceMinutes}`
    }()
}