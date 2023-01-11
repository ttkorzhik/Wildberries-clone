import {
    goodsBlock, addToBasketPopup, buttonBasket, basket, basketContent,
    basketClose, basketDeleteAll, popupCloseIcon, hamburger,menu, popupWrapper,
    closeBurger, searchImg, search, linkForBrands, moreBrands, CLICK_EVENT, iconWithChat,
    chat, chatContent, problemChat, btnShowMore, addressesBody, addressBrest,
    addressHomel, addressHrodna, addressList, addressListPopUp, addressMinsk,
    addressVitebsk, addressesListClose, openAuthorizationButton,
    authorizationBody, submitButton
} from "./constants.js";
import {popupClose, addToBasketByPopup} from "./popupImg.js";
import {basketHide, openBasket, createAddForBasket, createDelForBasket, createRemoveForBasket, deleteAllInBasket,} from "./basket.js";
import {addClass, bodyLock, bodyUnLock, removeClass, updateCurrentLocation} from "./modalWindows.js";
import { arrOfUsers,userData, submitForLetIn, closeAuthorization} from "./authorization.js";
import {addProductByBtnOnCard} from "./cards.js";

// ---------------Корзина--------------------
//Добавляем в корзину товар по клику на кнопку "Купить" в попапе
addToBasketPopup.addEventListener(CLICK_EVENT, addToBasketByPopup);

//Добавляем в корзину товар при клике на "корзину" на карточке товара
goodsBlock.addEventListener(CLICK_EVENT, addProductByBtnOnCard)

//Показываем корзину при клике на неё
buttonBasket.addEventListener(CLICK_EVENT, openBasket)

//При клике на "Очистить корзину" удаляем все элементы
basketDeleteAll.addEventListener(CLICK_EVENT,  deleteAllInBasket)

//При клике на "Корзину" формируем весь функционал корзины
basket.addEventListener(CLICK_EVENT, createAddForBasket)
basket.addEventListener(CLICK_EVENT, createDelForBasket)
basket.addEventListener(CLICK_EVENT, createRemoveForBasket)

//При клике на "x" скрываем корзину
basketClose.addEventListener(CLICK_EVENT, (event) => {
    basketHide(basket, basketContent)
    event.preventDefault()
})

// ---------------Бренды--------------------
//При клике на "Смотреть все" открываем все бренды
linkForBrands.addEventListener(CLICK_EVENT, (e) => {
    moreBrands.classList.toggle("hidden");
    e.preventDefault()
})

// ---------------Быстрый просмотр товара--------------------
//Проверяем, существует ли объект закрытия модального окна "x"
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        //Получаем конкретный объект
        const element = popupCloseIcon[i];
        //Вешаем событие на клик
        element.addEventListener(CLICK_EVENT, function (event) {
            //Отправляем в функцию ближайшего родителя ссылки с классом .popup
            popupClose(element.closest(".popup"));
            //Запрещаем ссылке обновлять страницу
            event.preventDefault();
        })
    }
}

// ---------------Форма поиска--------------------
// Когда форма поиска получает фокус, она меняет цвет
search.addEventListener("focus", () => {
    addClass(search, "active")
    addClass(searchImg, "svg--grey")
})

// При потере фокуса цвет возвращается в изначальное состояние
search.addEventListener("blur", () => {
    removeClass(search, "active")
    removeClass(searchImg, "svg--grey")
})

// Поиск по названию товара
search.addEventListener("input", createSearchForm)
function createSearchForm(event) {
    // Если введённое пользователем значение не совпадает с названием товара, то мы его скрываем
    let searchValue = event.target.value.toLowerCase();
    let itemsOfToDodNames = document.querySelectorAll(".card-content__name");
    for (let item of itemsOfToDodNames) {
        if (item.innerText.toLowerCase().includes(searchValue)) {
            item.closest(".goods-card").style.display = 'flex';
        } else {
            item.closest(".goods-card").style.display = 'none';
        }
    }
}

// ---------------Список страниц бургера--------------------
//При клике на бургер открываем список страниц сайта
hamburger.addEventListener(CLICK_EVENT, function (e) {
    e.preventDefault();
    addClass(popupWrapper, 'open')
    addClass(menu, 'show')
})

//При клике на "x" бургера скрываем его
closeBurger.addEventListener(CLICK_EVENT, function () {
    menu.classList.toggle('show');
    removeClass(popupWrapper, 'open')
})

//При клике на кнопку "Быстрый просмотр" открываем модальное окно картинки
popupWrapper.addEventListener(CLICK_EVENT, function (e) {
    if (e.target === popupWrapper) {
        removeClass(menu, 'show')
        removeClass(popupWrapper, 'open')
    }
})

//slick slider
$(document).ready(function () {
    $('.slider-container').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        autoplay: true,
        speed: 800,
        initialSlide: 0,
        autoplaySpeed: 3000,
        infinite: true,
    })
})

// ---------------Чат поддержки--------------------
//При клике на иконку чата открываем/закрываем модальное с чатом
iconWithChat.addEventListener(CLICK_EVENT, function (e) {
    chat.classList.toggle('open-body');
    chatContent.classList.toggle('open-body');
})

//При клике "Закрыть" чата закрываем модальное с чатом
chat.addEventListener(CLICK_EVENT, function (event) {
    if (event.target.classList.contains("chat__header__btn")) {
        removeClass(chat, 'open-body')
        removeClass(chatContent, 'open-body')
    }
})

//При клике на кнопку "Сообщить о проблеме" открываем модальное с чатом
problemChat.addEventListener(CLICK_EVENT, function () {
    chat.classList.toggle('open-body');
    chatContent.classList.toggle('open-body');
})

// ---------------Бальше товаров--------------------
//При клике на кнопку "Показать больше" открываем дополнительный ряд карточек товаров
btnShowMore.addEventListener(CLICK_EVENT, function () {
    Array.from(goodsBlock.children).forEach(child => child.style.display = "flex");
    btnShowMore.style.display = "none"
})

// ---------------Адреса--------------------
// При выборе адреса "Минск"
addressMinsk.addEventListener(CLICK_EVENT, (e) =>{
    // Избегаем перехода по ссылке
    e.preventDefault();
    // Меняем строку адреса на Минск, используя функцию
    updateCurrentLocation('Минск')
    removeClass(addressListPopUp, 'open')
    bodyUnLock()
})

// При выборе адреса "Гомель"
addressHomel.addEventListener(CLICK_EVENT, (e) =>{
    e.preventDefault();
    updateCurrentLocation('Гомель')
    removeClass(addressListPopUp, 'open')
    bodyUnLock()
})

// При выборе адреса "Витебск"
addressVitebsk.addEventListener(CLICK_EVENT, (e) =>{
    e.preventDefault();
    updateCurrentLocation('Витебск')
    removeClass(addressListPopUp, 'open')
    bodyUnLock()
})

// При выборе адреса "Гродно"
addressHrodna.addEventListener(CLICK_EVENT, (e) =>{
    e.preventDefault();
    updateCurrentLocation('Гродно')
    removeClass(addressListPopUp, 'open')
    bodyUnLock()
})

// При выборе адреса "Брест"
addressBrest.addEventListener(CLICK_EVENT, (e) =>{
    e.preventDefault();
    updateCurrentLocation('Брест')
    removeClass(addressListPopUp, 'open')
    bodyUnLock()
})

// Оставляем на странице выбранный город после рефреша
window.addEventListener('load', () => {
    // "Достаем" выбранный город из localStorage
    const city = localStorage.getItem('city');
    // Все так же обновляем с помощью функции.
    // При первом посещении сайта или очистки localStorage дефолтное значение - Минск
    updateCurrentLocation(city || 'Минск')

})
// Добавляем событие на клик кнопки "Адреса"
addressList.addEventListener(CLICK_EVENT, (e) => {
    // Выключаем скролл
    bodyLock()
    // Убираем переход на заглушку
    e.preventDefault();
    // Добавляем .open и показываем модальное окно
    addClass(addressListPopUp, 'open')
    addClass(addressesBody, 'open')
})

//Закрываем попап при клике в любое место, кроме попапа
addressesBody.addEventListener(CLICK_EVENT, (e) => {
    if(!e.target.closest('.ad__list-content')) {
        removeClass(addressListPopUp, 'open');
        bodyUnLock()
    }
})

// Закрываем попап по щелчку на крестик, добавляем событие на клик
addressesListClose.addEventListener(CLICK_EVENT, () => {
// Удаляем .open, добавленный ранее
    removeClass(addressListPopUp, 'open')
// "Включаем" скролл
    bodyUnLock()
})

// ---------------Авторизация--------------------
//Открываем модальное окно авторизации при клике на икнонку
openAuthorizationButton.addEventListener(CLICK_EVENT, (event) => {
    authorizationBody.classList.add("open");
    bodyLock();
    event.preventDefault();
});

//Закрываем окно авторизации при клике в любое место, кроме окна или кнопки
authorizationBody.addEventListener(CLICK_EVENT, function (event) {
    if (!event.target.closest(".authorization-content")) {
        closeAuthorization()
        event.preventDefault();
    } else if (event.target.closest(".authorization-content__close")) {
        closeAuthorization()
        event.preventDefault();
    }
})

//При клике на кнопку "Войти" проверяем пользователя
submitButton.addEventListener(CLICK_EVENT, () => {
    submitForLetIn(userData, arrOfUsers);
})

