import {UI_ELEMENTS} from "./view.js";

export function tempToCelsius(tempKelvin) {
    return `${Math.round(tempKelvin - 273.15)}°`;
}

export function replaceHeart(cityInSaved) {
    if (cityInSaved) {
        UI_ELEMENTS.NOW.HEART.setAttribute('heart', 'checked');
    } else {
        UI_ELEMENTS.NOW.HEART.setAttribute('heart', 'noChecked');
    }
}