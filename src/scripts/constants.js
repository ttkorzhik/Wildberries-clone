export {URL, usersURL, body, goodsBlock, listOfProducts, addToBasketPopup, buttonBasket, basket, basketContent,
    basketClose, basketDeleteAll, totalSum, emptyBasketNotification,  emptyBasketNotificationContent,
    addProductNotification, addProductNotificationContent, popupCloseIcon, popupContent,
    hamburger,menu, popupWrapper, closeBurger, searchImg, search, linkForBrands, moreBrands,
    CLICK_EVENT, iconWithChat, chat, chatContent, problemChat, btnShowMore, addressesBody, addressBrest,
    addressHomel, addressHrodna, addressList, addressListPopUp, addressMinsk,
    addressString, addressVitebsk, addressesListClose, openAuthorizationButton,
    authorizationBody, labelOfAuthorization, submitButton
}

const URL = 'https://62dd06fc57ac3c3f3c62ad9e.mockapi.io/goods'
const usersURL = 'https://62e66ebcde23e263792c2de8.mockapi.io/users/'

const body = document.querySelector("body");
const goodsBlock = document.querySelector(".goods-wrapper")
const listOfProducts = document.querySelector(".basket__list");
const addToBasketPopup = document.querySelector(".popup-content__basket-button");

const buttonBasket = document.querySelector(".header__basket");
const basket = document.querySelector("#basket");
const basketContent = document.querySelector(".basket-content");
const basketClose = document.querySelector(".basket__close");
const basketDeleteAll = document.querySelector(".basket__heading__btn");

const totalSum = document.querySelector(".basket__summation")

const emptyBasketNotification = document.querySelector("#empty")
const emptyBasketNotificationContent = document.querySelector("#empty-content")
const addProductNotification = document.querySelector("#add")
const addProductNotificationContent = document.querySelector("#add-content")

const popupWrapper = document.querySelector('.wrapper-popup')
const popupCloseIcon = document.querySelectorAll(".close-popup");
const popupContent = document.querySelector(".popup-content");

const hamburger = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const closeBurger = document.querySelector('.close')
const linkForBrands = document.querySelector(".brands-title-link")
const moreBrands = document.querySelector(".brands-logo--second");

const searchImg = document.querySelector(".search__btn__svg");
const search = document.querySelector(".search__input");

const iconWithChat = document.querySelector(".ask-toggle");
const chat = document.querySelector("#chat");
const chatContent = document.querySelector(".chat-wrapper");
const problemChat = document.querySelector(".problem-wildberries");
const btnShowMore =document.querySelector(".show-more");

const addressMinsk = document.querySelector('#address-minsk');
const addressHomel = document.querySelector('#address-homel');
const addressVitebsk = document.querySelector('#address-vitebsk');
const addressHrodna = document.querySelector('#address-hrodna');
const addressBrest = document.querySelector('#address-brest');
const addressString = document.querySelector('#city_name span')
let addressList = document.querySelector("#address-link")
let addressListPopUp = document.querySelector('#addresses-list')
let addressesListClose = document.querySelector('.ad__close')
let addressesBody = document.querySelector('.ad__list-body')

const openAuthorizationButton = document.querySelector("#profile-link");
const authorizationBody = document.querySelector(".authorization");
const submitButton = document.querySelector(".authorization-form__button-submit");
const labelOfAuthorization = document.querySelectorAll(".authorization-block__label")

const CLICK_EVENT = "click";
