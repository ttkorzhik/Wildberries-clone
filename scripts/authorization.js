"use strict";

import {bodyUnLock} from "./modalWindows.js";
import {usersURL, authorizationBody, labelOfAuthorization} from "./constants.js";
export {closeAuthorization, getUsersData, arrOfUsers,userData, userLog,checkDataForSubmit, submitForLetIn}


//Закрываем окно авторизации и разблокируем скролл
function closeAuthorization () {
    authorizationBody.classList.remove("open");
    bodyUnLock();
}

//Получаем Promise пользователей
function getUsersData(){
    return new Promise((resolve, reject) => {
        fetch(usersURL).then(response => {
            if(response.ok){
                resolve(response.json())
            } else {
                reject(new Error('Some Error here'))
            }
        })
    })
}

let arrOfUsers = [];
let userData = {};
let userLog = false;

//Пушим объекты из Promise в массив пользователей
getUsersData().then((value) => {
    for (let i = 0; i < value.length; i++) {
        arrOfUsers.push(value[i])
    }
}).catch(err => console.log(err.message));

//Сравниваем введенные данные с массивом пользователей
function checkDataForSubmit (userData, arrOfUsers, userLog) {
    for (let i = 0; i < arrOfUsers.length; i++) {
        if (userData.login === arrOfUsers[i].login && userData.password === arrOfUsers[i].password) {
            alert (`Добро пожаловать, ${arrOfUsers[i].name}!`);
            userLog = true;
            authorizationBody.classList.remove("open");
            bodyUnLock();
        }
    }
    if (userLog === false) {
        //Делаем label красного цвета при неверном пароле/логине
        labelOfAuthorization.forEach((el) => {
            el.classList.add("authorization-block__label_wrong")
        });
    }

}

//Получаем введенные данные и сохраняем их в объект
function submitForLetIn (userData, arrOfUsers) {
    let username = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    if (username && password ) {
        userData.login = username;
        userData.password = password;
        checkDataForSubmit (userData, arrOfUsers, userLog);
    }
}




