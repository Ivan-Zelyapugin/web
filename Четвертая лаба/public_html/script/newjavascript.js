//Зеляпугин Иван 22ВП2
const settingsForm = document.getElementById("settings-form");

settingsForm.addEventListener("submit", function(event) {
    // Отменяем стандартное поведение формы
    event.preventDefault();

    // Получаем значение поля ввода времени
    const timeLimit = document.getElementById("time-limit-input").value;
    const shuffleQ = document.getElementById("shuffle-questions-checkbox").checked;
    const shuffleA = document.getElementById("shuffle-answers-checkbox").checked;
    
    if(timeLimit<=0){
        alert("Время меньше 0!");
    }else{
        // Открываем новую страницу с тестом
        window.open(`HTML/first.html?timeLimit=${timeLimit}&shuffleQ=${shuffleQ}
            &shuffleA=${shuffleA}`, "_self");
    }
});


