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

export function replaceHeart(cityInSaved) {
    if (cityInSaved) {
        UI_ELEMENTS.NOW.BUTTON.setAttribute('heart', 'checked');
    } else {
        UI_ELEMENTS.NOW.BUTTON.setAttribute('heart', 'noChecked');
    }
}