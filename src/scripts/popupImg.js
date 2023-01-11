//Открываем попап
import {addProductNotification, addProductNotificationContent, body, popupContent} from "./constants.js";
import {changeExistingProduct, Product} from "./basket.js";
import {bodyLock, createNotification} from "./modalWindows.js";
import {getBasketData, setBasketData} from "./localstorage.js";
export {createPopup, popupClose, popupOpen, setDataFromPopup, selectedProductForPopup, addToBasketByPopup}

let selectedProductForPopup = {};

//Создаём модальное окно для просмотра картинки
function createPopup(fastViewButtons) {
    if (fastViewButtons.length > 0){
        for (let i = 0; i < fastViewButtons.length; i++){
            //Получаем каждую ссылку в переменную
            const popupLink = fastViewButtons[i];
            //Вешаем событие при клике
            popupLink.addEventListener("click", function (event) {
                //Убираем # из href
                const popupName = popupLink.getAttribute("href").replace('#', '');
                //Получаем сам объект попапа
                const currentPopup = document.getElementById(popupName);
                const currentGoods =popupLink.parentElement.parentElement;
                //Находим параметры выбранного товара
                const itemImage = currentGoods.querySelector(".card-main__img").src;
                const itemPrice = currentGoods.querySelector(".card-content__price--total").textContent;
                const itemDiscount = currentGoods.querySelector(".card-content__price--discounted").textContent ;
                const itemName = currentGoods.querySelector(".card-content__name").textContent;

                //Добавляем параметры товара в попап
                popupContent.querySelector(".popup-content__image").src =  itemImage;
                popupContent.querySelector(".popup-content__price").textContent = itemPrice;
                popupContent.querySelector(".popup-content__discount").textContent = itemDiscount;
                popupContent.querySelector(".popup-content__text").textContent = itemName;

                //Вызываем функцию открытия попапа
                popupOpen(currentPopup);
                //Запрещаем ссылке обновлять страницу
                event.preventDefault();
            })

        }

    }
}

function setDataFromPopup (fastViewButtons) {
    // Перебираем все карточки товаров и записываем в "selectedProductForPopup", при нажатии на кнопку "FastViewButton"
    [].forEach.call(fastViewButtons,function(el){
        el.addEventListener('click', function (event) {
            let parentElement = event.target.closest(".goods-card");
            let name = parentElement.querySelector(".card-content__name").innerText;
            let price = parentElement.querySelector(".card-content__price--discounted").innerText;
            let id = event.target.closest(".goods-card").getAttribute("id");

            selectedProductForPopup = new Product(id, name, price);

            return selectedProductForPopup;
        })
    })
}

function popupOpen (currentPopup) {
    //Блокируем скролл
    bodyLock();
    //Добавляем класс .open
    currentPopup.classList.add('open');
    //Вешаем событие на клик
    currentPopup.addEventListener("click", function (event) {
        //Закрываем попап, если кликаем в любое место, кроме самого попапа
        if (!event.target.closest('.popup-content')) {
            popupClose(event.target.closest('.popup'))
        }
    })

}

//Закрываем попап
function popupClose (popupActive) {
    popupActive.classList.remove('open');
    body.classList.remove('lock');
    body.style.paddingRight = "0px";
}
//Добавляем товар в корзину при клике на кнопку в попапе
function addToBasketByPopup() {
    const goods = getBasketData();
    if (goods.length === 0) {
        goods.push(selectedProductForPopup);
        setBasketData(goods)
    } else {
        if (goods.find(item => item.id === selectedProductForPopup.id)) {
            changeExistingProduct(goods, selectedProductForPopup)
        } else {
            goods.push(selectedProductForPopup)
            setBasketData(goods)
        }
    }
    createNotification(addProductNotification, addProductNotificationContent)
}
