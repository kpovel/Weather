import {UI_ELEMENTS} from "./view.js";

export function tempToCelsius(tempKelvin) {
    return `${Math.round(tempKelvin - 273.15)}°`;
}

export function getTime(value) {
    const hours = new Date(value * 1000).getHours();
    const minutes = new Date(value * 1000).getMinutes();
    const replaceHours = hours < 10 ? `0${hours}` : hours;
    const replaceMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${replaceHours}:${replaceMinutes}`;
}

export function abbreviateMonth(date) {
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

export function replaceHeart(cityInSaved) {
    if (~cityInSaved) {
        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart_red.svg")';
    } else {
        UI_ELEMENTS.NOW.BUTTON.style.background = 'url("./img/heart.svg")';
    }
}