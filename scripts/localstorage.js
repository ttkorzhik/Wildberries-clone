// Получаем из LocalStorage массив с товарами в корзине, если его нет, то возвращаем пустой массив
export function getBasketData(){
    if (localStorage.getItem("goods")) {
        return JSON.parse(localStorage.getItem("goods"))
    }
    else {
        return []
    }
}

// Записываем данные в LocalStorage - создаём массив c товарами, добавленными в корзину
export function setBasketData(goods){
    localStorage.setItem("goods", JSON.stringify(goods));
}