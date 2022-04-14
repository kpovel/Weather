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

