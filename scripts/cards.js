import {URL, goodsBlock, addProductNotification, addProductNotificationContent} from "./constants.js"
import {createPopup, setDataFromPopup} from "./popupImg.js";
import {getBasketData, setBasketData} from "./localstorage.js";
import {changeExistingProduct, Product} from "./basket.js";
import {createNotification} from "./modalWindows.js";
export {getCardsData, createCards, createElement, buildCardElements, addProductByBtnOnCard}

// Функция для генерации элементов с заданными тегом и классом и текстом внутрри
function createElement(tagName, className, innerText) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    element.innerText = innerText;
    return element;
}

//Получаем данные для карточек по c сервера
function getCardsData(){
    return new Promise((resolve, reject) => {
        fetch(URL).then(response => {
            if(response.ok){
                resolve(response.json())
            } else {
                reject(new Error(`Error status: ${response.status}`))
            }
        })
    })
}

//Формируем DOM карточки с товаром
function buildCardElements(card) {
    const blockCard = createElement("div", "goods-card", "")
    const cardMain = createElement("div", "card-main","")
    const cardContent = createElement("div", "card-content","")
    const cardContentPrice = createElement("div", "card-content__price", "")
    const cardBasket = createElement("button", "card-main__basket", "")
    const cardBasketImg = createElement("img", "card-main__basket__svg", "")
    cardBasketImg.src = "./style/assets/goods-main/s.svg"
    const cardButtonForLooking = createElement("a", "card-main__btn",
        "Быстрый просмотр" )
    cardButtonForLooking.setAttribute("href", "#popup")
    const img = createElement("img", "card-main__img", "")
    const name = createElement("p", "card-content__name", card.name);
    const priceDiscounted = createElement("p", "card-content__price--discounted",
        `${card.price * (100 - card.discont) / 100} руб.`);
    const priceTotal = createElement("p", "card-content__price--total",
        `${card.price} руб.`);
    blockCard.setAttribute("id", card.id)

    const discount = createElement("span", "card-main__discount",
        `-${card.discont}%`);
    img.src = card.img;

    blockCard.appendChild(cardMain);
    blockCard.appendChild(cardContent);
    cardContent.appendChild(cardContentPrice)
    cardContent.appendChild(name)
    cardContentPrice.appendChild(priceDiscounted)
    cardContentPrice.appendChild(priceTotal)
    cardMain.appendChild(cardBasket)
    cardBasket.appendChild(cardBasketImg)
    cardMain.appendChild(img)
    cardMain.appendChild(discount)
    cardMain.appendChild(cardBasket)
    cardMain.appendChild(cardButtonForLooking)
    goodsBlock.appendChild(blockCard)
}

//Для каждого объекта карточки, полученного по URL создаём DOM-элемент,
// в каждую карточку добавляяем popup для просмотра картинки
function createCards(cards) {
    cards.forEach(card => {
        buildCardElements(card)
    })
    const fastViewButtons = document.querySelectorAll(".card-main__btn");
    setDataFromPopup (fastViewButtons)
    createPopup(fastViewButtons);
}

getCardsData().then(createCards).catch(err => console.log(err.message));

function addProductByBtnOnCard(event) {
    const goods =  getBasketData();
    let parentElement = event.target.closest(".goods-card");
    let name = parentElement.querySelector(".card-content__name").innerText;
    let price = parentElement.querySelector(".card-content__price--discounted").innerText;
    let id = event.target.closest(".goods-card").getAttribute("id");
// При нажатии на кнопку на карточке формируем объект товара
    if (event.target.classList.contains("card-main__basket") || event.target.classList.contains("card-main__basket__svg"))
    {
        const selectedProduct = new Product(id,name,price);
        // Если корзина пуста, добавлем товар в корзину
        if (goods.length === 0) {
            goods.push(selectedProduct);
            setBasketData(goods)
        }
        else {
            // Если в корзине уже есть такой же товар увеличиваем его цену и количество
            if (goods.find(item => item.id === selectedProduct.id)) {
                changeExistingProduct(goods, selectedProduct)
            }
            else {
                // Если такого товара нет, то добавляем его
                goods.push(selectedProduct)
                setBasketData(goods)
            }
        }
        // Уведомляем пользователя, что его товар добавлен в корзину
        createNotification(addProductNotification, addProductNotificationContent)
    }
}




