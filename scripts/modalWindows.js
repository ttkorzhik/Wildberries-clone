export {createNotification, bodyLock, bodyUnLock, addClass, removeClass, updateCurrentLocation}
import {addressString} from "./constants.js";

//Создаём уведомление при добавлении товара в корзину
function createNotification(elem, elemContent) {
    addClass(elem, "open-body")
    addClass(elemContent, "open-content")
    setTimeout(deleteNotification, 1000)
    function deleteNotification() {
        removeClass(elem, "open-body")
        removeClass(elemContent, "open-content")
    }}

function updateCurrentLocation(city){
    // Записываем название выбранного города в localStorage
    localStorage.setItem('city', city);
    // "Достаем" запись выбранного города
    // Меняем строчку адреса на выбранный город
    addressString.innerHTML = localStorage.getItem('city');
}

function bodyLock () {
    // ищем ширину скролла и добавляем его в качестве правого паддинга всему body
    document.body.style.paddingRight = window.innerWidth - document.querySelector("body").clientWidth + "px";
    // убираем скролл overflow:hidden;
    document.body.classList.add("lock");
}

//Возвращаем скролл и изначально установленный паддинг
function bodyUnLock () {
    document.body.style.paddingRight = "0px";
    document.body.classList.remove("lock");
}
//Добавить класс DOM-элементу
function addClass(elem, className) {
    elem.classList.add(className);
}

//Удалить класс DOM-элемента
function removeClass(elem, className) {
    elem.classList.remove(className);
}

