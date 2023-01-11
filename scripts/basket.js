import {
    basket,
    basketContent,
    emptyBasketNotification,
    emptyBasketNotificationContent,
    listOfProducts, totalSum
} from "./constants.js";
import {getBasketData, setBasketData} from "./localstorage.js";
import {createElement} from "./cards.js";
import {bodyLock, bodyUnLock, addClass, removeClass, createNotification} from "./modalWindows.js";
export {buildBasketElements, Product, changeExistingProduct, totalSummation, basketOpen,
    basketHide, removeItem, createDelForBasket, createRemoveForBasket, createAddForBasket, deleteAllInBasket, openBasket}

//Если массив с товарами непустой, формируем DOM-корзины. В противном сообщаем о том, что корзина пуста
function buildBasketElements(goods) {
    if (goods?.length) {
        for (let item of goods) {
            const liElement = createElement("li", "basket__list__item", "")
            liElement.setAttribute("id", item.id)
            const productName = createElement("p", "basket__item__name", item.name);
            const productPrice = createElement("p", "basket__item__price", `${item.price}`);
            const blockForQuantity = createElement("div", "basket__item__block", ``);
            const blockForRemove = createElement("div", "basket__item__block--remove", ``);
            const remove = createElement("p", "basket__item__remove", `Удалить`);
            const blockForCountAndRemove = createElement("div", "basket__item--central", ``);
            const productQuantity = createElement("p", "basket__item__quantity", `${item.quantity} шт.`);
            const addProduct = createElement("button", "basket__item__btn--add", `+`);
            const deleteProduct = createElement("button", "basket__item__btn--del", `-`);

            blockForCountAndRemove.appendChild(blockForQuantity)
            blockForCountAndRemove.appendChild(blockForRemove)
            blockForRemove.appendChild(remove);
            blockForQuantity.appendChild(addProduct);
            blockForQuantity.appendChild(productQuantity);
            blockForQuantity.appendChild(deleteProduct);
            liElement.appendChild(productName);
            liElement.appendChild(blockForCountAndRemove);
            liElement.appendChild(productPrice);

            listOfProducts.append(liElement);
        }
    }
    else {
        alert("Корзина пуста")
    }
}
// Формируем объект товара, добавленного в корзину, который будет хранится в localStorage
const Product = function (id,name,price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = 1;
    this.priceOfOne = price;
}

// При добавлении одного и того же товара в корзину меняем количество и увеличиваем цену
function changeExistingProduct(goods, selectedProduct) {
    goods.forEach(function (item) {
        if (item.id === selectedProduct.id) {
            item.quantity++;
            item.price = `${String(parseFloat(selectedProduct.price) * +item.quantity)} руб`;
        }
        setBasketData(goods);
    })
}
// Сумма всех покупок
function totalSummation(goods) {
    return  Array.from(goods).reduce((sum, current) => sum + parseFloat(current.price), 0);
}

// Показываем модальное окно с корзиной, лочим скролл
function basketOpen (basket, basketContent) {
    addClass(basket, "open-body");
    addClass(basketContent,"open-content" )
    bodyLock ()
}

// Скрываем корзину, очищаем её от товаров, чтобы при добавлении после закрытия не было дублирования товаров
function basketHide (basket, basketContent) {
    removeClass(basket, "open-body");
    removeClass(basketContent,"open-content")
    listOfProducts.innerHTML = "";
    bodyUnLock ()
}
// Удаляем товар из из корзины и из массива в localStorage
function removeItem(liElement, goods, index) {
    liElement.style.display = "none"
    goods.splice(index, 1)
}

// При открытии корзины
function openBasket(event) {
    const goods =  getBasketData()
    event.preventDefault()
    //Если корзина пуста, показываем уведомление,
    if (goods?.length === 0) {
        createNotification(emptyBasketNotification, emptyBasketNotificationContent)
    }
    // в противном случае добавляем в корзину все товары, выбранные пользователем, и показываем модальное окно корзины.
    else {
        buildBasketElements(goods)
        basketOpen (basket, basketContent)
        // Считаем сумму добавленных товаров
        totalSum.innerText = `Итого: ${totalSummation(goods).toFixed(2)} руб.`
    }
}
//Удаляем все товары из корзины, очищаем массив с ними в localstorage
function deleteAllInBasket() {
    Array.from(listOfProducts.children).forEach((item) => {
        item.innerText = "";
    })
    localStorage.clear()
    totalSum.innerText = `Итого: 0.00 руб.`
}
// При удалении 1 товара из корзины
function createDelForBasket(event) {
    const goods = getBasketData()
    const liElement = event.target.parentElement.parentElement.parentElement
    const checkedItemID = liElement.id;
    //Если нажатие на кнопку "-" уменьшаем количество и цену товара
    if (event.target.classList.contains("basket__item__btn--del")) {
        goods.forEach(function (item, index) {
            if (item.id === checkedItemID) {
                item.quantity--;
                item.price = `${(parseFloat(item.price) - parseFloat(item.priceOfOne)).toFixed(2)} руб`;
                //Если количество стало 0 - удаляем товар из корзины
                if (item.quantity === 0) {
                    removeItem(liElement, goods, index)

                } else {
                    event.target.previousSibling.innerText = `${item.quantity} шт.`;
                    liElement.lastElementChild.innerText = `${item.price}`;
                }
            }
            //Записываем полученные данные в localStorage и пересчитываем сумму
            setBasketData(goods);
            totalSum.innerText = `Итого: ${totalSummation(goods).toFixed(2)} руб.`
        })
    }
}
// При добавлении 1 товара в корзину
function createAddForBasket(event) {
    const goods = getBasketData()
    const liElement = event.target.parentElement.parentElement.parentElement
    const checkedItemID = liElement.id;
    if (event.target.classList.contains("basket__item__btn--add")) {
        goods.forEach(function (item) {
            if (item.id === checkedItemID) {
                item.quantity++;
                item.price = `${(parseFloat(item.price) + parseFloat(item.price)).toFixed(2)} руб`;
                event.target.nextSibling.innerText= `${item.quantity} шт.`;
                liElement.lastElementChild.innerText = `${item.price}`;
            }
            //Записываем полученные данные в localStorage и пересчитываем сумму
            setBasketData(goods);
            totalSum.innerText = `Итого: ${totalSummation(goods).toFixed(2)} руб.`
        })
    }
}

// При удалении всего количества товара из корзины
function createRemoveForBasket(event) {
    const goods = getBasketData()
    const liElement = event.target.parentElement.parentElement.parentElement
    const checkedItemID = liElement.id;
    // При нажатии на "Удалить" удаляем элемент из корзины полностью
    if (event.target.classList.contains("basket__item__remove")) {
        goods.forEach(function (item,index) {
            if (item.id === checkedItemID) {
                removeItem(liElement, goods,index)
            }
            //Записываем полученные данные в localStorage и пересчитываем сумму
            setBasketData(goods);
            totalSum.innerText = `Итого: ${totalSummation(goods).toFixed(2)} руб.`
        })
    }
    //Если нажатие не на корзину, скрываем её
    else if (!event.target.closest('.basket-content')) {
        basketHide (basket, basketContent)
    }
}