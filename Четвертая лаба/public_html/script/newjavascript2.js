//Зеляпугин Иван 22ВП2

//Значение для блока страницы в будущем
let block = false;

// Получаем значения из параметров URL
const urlParams = new URLSearchParams(window.location.search);
const timeLimit = urlParams.get('timeLimit');
const shuffleQ = urlParams.get('shuffleQ').trim();
const shuffleA = urlParams.get('shuffleA').trim();
let timeLeft = timeLimit * 60;
let countdown;
//Таймер
function updateTimer() {
    myClassInstance.block();
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const timerDisplay = document.querySelector('.timer');
    timerDisplay.textContent = `${minutes}:${seconds}`;
    if (timeLeft === 0) {
        clearInterval(countdown);
        window.open(`table.html?Balls=${JSON.stringify(myClassInstance.balls)}&Questions=${JSON.stringify(myClassInstance.questions)}&Answers=${JSON.stringify(myClassInstance.mysnwers)}&correctAnswers=${JSON.stringify(myClassInstance.correctAnswers)}`, "_self");
    }else {
        timeLeft--;
    }
}
countdown = setInterval(updateTimer, 1000);

// Читаем кнопки
const buttons = document.getElementById('button-questions').getElementsByTagName('button');
const nextButton = document.getElementById('next-question');
const prevButton = document.getElementById('previous-question');

class Quiz {
    constructor() {
        this.currentQuestionIndex = 0;
        this.questions = [
            `Какой художник создал картину Мона Лиза?`,
            `Какую роль свет и тени играют в живописи и фотографии?`,
            `Как называется техника рисования, при которой художник использует только черную краску?`,
            `Какое из этих произведений искусства было создано Пабло Пикассо?`,
            `Как называется техника живописи, при которой краски наносятся на мокрую поверхность?`,
            `Как называется техника, при которой художник создает рисунок, нанося краску на мокрый слой предыдущей краски?`,
            `Какое из этих направлений в искусстве характеризуется яркими цветами и контрастами, а также абстрактными формами?`,
            `Как называется техника живописи, при которой художник создает изображение, нанося краску на поверхность, покрытую слоем грунта?`
        ];
        this.answers = [
            [`Леонардо да Винчи`, `Рафаэль`, `Микеланджело`, `Донателло`],
            [`Создание объема и глубины`, `Определение цветовой гаммы`, `Подчеркивание красоты модели`, `Отображение чувственности и настроения`],
            [`Тушь`, `Акварель`, `Гуашь`, `Графика`],
            [`Герника`, `Ночная звезда`, `Лилии`, `Поле пшеницы с воронами`],
            [`Портреты`, `Пейзажи`, `Абстрактные композиции`, `Фотоколлажи`],
            [`Мокрая техника`, `Граффити`, `Триптих`, `Коллаж`],
            [`Экспрессионизм`, `Импрессионизм`, `Кубизм`, `Сюрреализм`],
            [`Грунтовая`, `Эмалированная`, `Наклонная`, `Лаковая`]
        ];
        this.correctAnswers = ['Леонардо да Винчи', 'Создание объема и глубины', 'Графика', 'Герника', ['Портреты','Пейзажи'], ['Мокрая техника','Граффити'], `Кубизм`, `Грунтовая`];
        this.mysnwers=[];
        this.types=["radio","radio","list","list","chek","chek","text","text"];
        this.balls=[];
    }

    // Листать вопросы
    showQuestion(currentQuestionIndex) {
        
        buttons[this.currentQuestionIndex].classList.remove('red');
        buttons[this.currentQuestionIndex].classList.remove('green');
        buttons[this.currentQuestionIndex].classList.add('blue');
        
        //Получение id вопросов и ответов
        const qu = document.getElementById('Questions');
        const answerList = document.getElementById('Answers');        
        // очищаем список ответов перед отображением нового вопроса
        answerList.innerHTML = " ";       
        // отображаем заголовок вопроса
        qu.innerHTML = (currentQuestionIndex+1)+". "+this.questions[currentQuestionIndex];        
        //Первые 2 вопроса типа радио
        if(this.types[currentQuestionIndex]==="radio"){
            // создаем элементы списка для ответов
            for (let i = 0; i < this.answers[currentQuestionIndex].length; i++) {
                const answerItem = document.createElement('li');
                answerItem.innerHTML = `
                <input type="radio" name="Answer" value="${i}"}>
                <label>${this.answers[currentQuestionIndex][i]}</label>
                `;
                answerList.appendChild(answerItem);     
            }
            //Найти все элементы input внутри списка answerList с типом "radio".
            const answerInputs = [];
            const inputElements = answerList.getElementsByTagName('input');
            for (let i = 0; i < inputElements.length; i++) {
                if (inputElements[i].type === 'radio') {
                    answerInputs.push(inputElements[i]);
                }
            }

            // Прослушивать событие
            for (let i = 0; i < answerInputs.length; i++) {
                answerInputs[i].addEventListener('change', (event) => {
                const selectedAnswer = this.answers[currentQuestionIndex][event.target.value];
                this.mysnwers[currentQuestionIndex] = selectedAnswer;
                });

                // Если ответ на этот вопрос уже выбран, установите соответствующий элемент ввода в качестве отмеченного.
                if (this.mysnwers[currentQuestionIndex] === this.answers[currentQuestionIndex][i.toString()]) {
                answerInputs[i].checked = true;
                }
            }
        }
        
        //Вторые 2 вопроса типа выпадающий список
        if(this.types[currentQuestionIndex]==="list"){
            // создаем выпадающий список для ответов
            const answerSelect = document.createElement('select');
            answerSelect.name = 'Answer';

            // добавляем пустой элемент в начало списка
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.text = '';
            answerSelect.appendChild(emptyOption);

            // создаем элементы списка для ответов
            for (let i = 0; i < this.answers[currentQuestionIndex].length; i++) {
                const answerOption = document.createElement('option');
                answerOption.value = i;
                answerOption.text = this.answers[currentQuestionIndex][i];
                // проверяем, является ли текущий элемент выбранным
                if (this.answers[currentQuestionIndex][i] === this.mysnwers[currentQuestionIndex]) {
                    answerOption.setAttribute('selected', true);
                }
                answerSelect.appendChild(answerOption);
            }

            // добавляем выпадающий список в список ответов
            const answerItem = document.createElement('li');
            answerItem.appendChild(answerSelect);
            answerList.appendChild(answerItem);
            const answerSelects = answerItem.getElementsByTagName('select');

            for (let i = 0; i < answerSelects.length; i++) {
                answerSelects[i].addEventListener('change', (event) => {
                const selectedAnswer = this.answers[currentQuestionIndex][event.target.value];
                this.mysnwers[currentQuestionIndex] = selectedAnswer;
                });
            }
        }
        
        //Третьи 2 вопроса типа чекбоксы
        if(this.types[currentQuestionIndex]==="chek"){
            // создаем элементы чекбоксов для ответов
            for (let i = 0; i < this.answers[currentQuestionIndex].length; i++) {
                const answerItem = document.createElement('li');
                const answerLabel = this.answers[currentQuestionIndex][i];
                const isChecked = this.mysnwers[currentQuestionIndex] && this.mysnwers[currentQuestionIndex].includes(this.answers[currentQuestionIndex][i]);
                answerItem.innerHTML = `
                    <input type="checkbox" name="Answer" value="${i}" ${isChecked ? 'checked' : ''}>
                    <label>${answerLabel}</label>
                `;
                answerList.appendChild(answerItem);
            }
            // находим все чекбоксы на странице
            const answerInputs = answerList.getElementsByTagName('input');
            const selectedAnswers = [];

            // добавляем обработчик события change для каждого чекбокса
            for (let i = 0; i < answerInputs.length; i++) {
                const input = answerInputs[i];
                if (input.type === 'checkbox') {
                    input.addEventListener('change', () => {
                    selectedAnswers.length = 0;
                    // находим все выбранные чекбоксы и добавляем их значение в массив
                    for (let j = 0; j < answerInputs.length; j++) {
                        const input = answerInputs[j];
                        if (input.type === 'checkbox' && input.checked) {
                            const value = input.getAttribute('value');
                            selectedAnswers.push(this.answers[currentQuestionIndex][value]);
                        }
                    }
                    // сохраняем выбранные ответы в массив
                    this.mysnwers[currentQuestionIndex] = selectedAnswers;
                    });
                }
            }
        }
        
        //Четвертые 2 вопроса типа текстовые
        if(this.types[currentQuestionIndex]==="text"){
            // проверяем, есть ли ответ для этого вопроса в массиве mysnwers
            if (this.mysnwers[currentQuestionIndex]) {
                // создаем элемент для свободного ввода текста и устанавливаем его значение равным ответу
                const answerInput = document.createElement('input');
                answerInput.type = 'text';
                answerInput.name = 'Answer';
                answerInput.value = this.mysnwers[currentQuestionIndex];
                // добавляем элемент для свободного ввода текста в список ответов
                answerList.appendChild(answerInput);
            } else {
                // создаем элемент для свободного ввода текста
                const answerInput = document.createElement('input');
                answerInput.type = 'text';
                answerInput.name = 'Answer';
                // добавляем элемент для свободного ввода текста в список ответов
                answerList.appendChild(answerInput);
            }
            
            const textInputs = answerList.getElementsByTagName('input');
            for (let i = 0; i < textInputs.length; i++) {
                const input = textInputs[i];
                if (input.type === 'text') {
                    input.addEventListener('input', (event) => {
                    const enteredText = event.target.value;
                    this.mysnwers[currentQuestionIndex] = enteredText;
                    });
                }
            }
        }
    };

    // Листать вперед
    nextQuestion() {
        
        
        if (this.currentQuestionIndex < this.questions.length-1) {
            if (this.mysnwers[this.currentQuestionIndex]) {
                buttons[this.currentQuestionIndex].classList.add('green');
            }else if (!this.mysnwers[this.currentQuestionIndex]) {
                buttons[this.currentQuestionIndex].classList.add('red');
            }
            this.currentQuestionIndex++;
            this.showQuestion(this.currentQuestionIndex);
        }
    }

    // Листать назад
    previousQuestion() {
         
        if (this.currentQuestionIndex > 0) {
            if (this.mysnwers[this.currentQuestionIndex]) {
                buttons[this.currentQuestionIndex].classList.add('green');
            }else if (!this.mysnwers[this.currentQuestionIndex]) {
                buttons[this.currentQuestionIndex].classList.add('red');
            }
            this.currentQuestionIndex--;
            this.showQuestion(this.currentQuestionIndex);
        } 
    }

    //Проверка ответов
    check() {
        for (let i = 0; i < this.correctAnswers.length; i++) {
            if (Array.isArray(this.correctAnswers[i]) && this.mysnwers[i]) {
                let isMatched = false;
                if (this.correctAnswers[i].length === this.mysnwers[i].length) {
                    isMatched = true;
                    for (let j = 0; j < this.correctAnswers[i].length; j++) {
                        if (this.correctAnswers[i][j] !== this.mysnwers[i][j]) {
                            isMatched = false;
                            break;
                        }
                    }
                }
                if (isMatched) {
                        this.balls[i] = 1;
                } else {
                    this.balls[i] = 0;
                }
            } else if (this.correctAnswers[i] === this.mysnwers[i]) {
                this.balls[i]=1;
            }else{
                this.balls[i]=0;
            }
        }
    }

    shuffleQustions(array1,array2,array3) {
        
        for (let i = array1.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array1[i], array1[j]] = [array1[j], array1[i]];
            [array2[i], array2[j]] = [array2[j], array2[i]];
            [array3[i], array3[j]] = [array3[j], array3[i]];
            [this.correctAnswers[i], this.correctAnswers[j]] = [this.correctAnswers[j], this.correctAnswers[i]];
        }
         return array1;
    }
    
    shuffleAnswers(array1) {
        
        for(let m =0;m<8;m++){
            for (let i = 0; i<4;i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [array1[m][i], array1[m][j]] = [array1[m][j], array1[m][i]];
            }
        }
        return array1;
    }
    
    block(){
        if(block===true){
            if (window.location.href.indexOf('first.html') > -1) {
                window.location.href = '../index.html';
            }
        }
    }
}

const myClassInstance = new Quiz();
// Перемешка

if(shuffleQ.toString() === 'true'){
    myClassInstance.shuffleQustions(myClassInstance.questions,myClassInstance.answers,myClassInstance.types);
}

if(shuffleA.toString() === 'true'){
    myClassInstance.shuffleAnswers(myClassInstance.answers);
}
//Кнопки 1-8
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', () => {
    const buttonNumber = parseInt(buttons[i].id);
    if (myClassInstance.mysnwers[myClassInstance.currentQuestionIndex]) {
        buttons[myClassInstance.currentQuestionIndex].classList.add('green');
    }else if (!myClassInstance.mysnwers[myClassInstance.currentQuestionIndex]) {
        buttons[myClassInstance.currentQuestionIndex].classList.add('red');
    }
    myClassInstance.currentQuestionIndex = buttonNumber - 1;
    myClassInstance.showQuestion(myClassInstance.currentQuestionIndex);
    });
}
        

// Слушать кнопки
nextButton.addEventListener('click', () => {
    myClassInstance.nextQuestion(); 
});
prevButton.addEventListener('click', () => {
    myClassInstance.previousQuestion();
});

// Показать первый вопрос
myClassInstance.showQuestion(0);
const Finish = document.getElementById('Finish');
Finish.addEventListener('click', () =>{
    block = true;
    myClassInstance.check();
    window.open(`table.html?Balls=${JSON.stringify(myClassInstance.balls)}
    &Questions=${JSON.stringify(myClassInstance.questions)}&Answers=
    ${JSON.stringify(myClassInstance.mysnwers)}&correctAnswers=
    ${JSON.stringify(myClassInstance.correctAnswers)}`, "_self");    
});
