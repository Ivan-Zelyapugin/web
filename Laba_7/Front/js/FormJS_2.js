//Значение для блока страницы в будущем
let block = false;
function bl(){
    if(block===true){
        if (window.location.href.indexOf('Glav.html') > -1) {
            window.location.href = '../../index.html';
        }
    }
}

// Получаем ссылки на все формы
const glav_form = document.querySelector("#glav-form");
const add_form = document.querySelector("#add-form");
const transform_form = document.querySelector("#transform-form")

// Получаем ссылки на все кнопки
const add_request_btn = document.querySelector("#add-request-btn");
const ruturnButton = document.querySelector("#return");
const sendButton = document.querySelector("#send");
const transformButton = document.querySelector("#transform_return");

// Получение имени
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const idName = document.querySelector("#user");
idName.innerHTML = name;

// Считывание кнопки выхода
const logoutBtn = document.querySelector("#logout-btn");

const logoutButton = document.querySelector('#logout-btn');
logoutButton.addEventListener('click', () => {
    block = true;
    window.location.href = '../../index.html';
});

// Добавляем обработчики клика на кнопки
add_request_btn.addEventListener("click", () => {
    // Показываем только форму входа
    glav_form.style.display = "none";
    add_form.style.display = "block";
});

let tLeft = 100 * 60;
function upT() {
    bl();
    const minutes = Math.floor(tLeft / 60);
    let seconds = tLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const timerDisplay = document.querySelector('.timer');
    timerDisplay.textContent = `${minutes}:${seconds}`;
    tLeft--;
}

ruturnButton.addEventListener("click", () => {
    // Показываем только форму входа
    glav_form.style.display = "block";
    add_form.style.display = "none";
});

transformButton.addEventListener("click", () => {
    // Показываем только форму входа
    glav_form.style.display = "block";
    transform_form.style.display = "none";
});

countdown = setInterval(upT, 1000);












