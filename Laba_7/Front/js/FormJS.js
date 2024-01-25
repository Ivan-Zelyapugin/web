// Получаем ссылки на все формы
const loginOrRegisterForm = document.querySelector("#login-or-register-form");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

// Получаем ссылки на все кнопки
const loginButton = document.querySelector("#login-button");
const registerButton = document.querySelector("#register-button");

// Добавляем обработчики клика на кнопки
loginButton.addEventListener("click", () => {
  // Показываем только форму входа
  loginOrRegisterForm.style.display = "none";
  loginForm.style.display = "block";
});

registerButton.addEventListener("click", () => {
  // Показываем только форму регистрации
  loginOrRegisterForm.style.display = "none";
  registerForm.style.display = "block";
});

window.addEventListener('popstate', function(event) {
    window.location.href = 'index.html';
});

