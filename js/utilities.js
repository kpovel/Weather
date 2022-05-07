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

export function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}