//Зеляпугин Иван 22ВП2
const urlParams = new URLSearchParams(window.location.search);
const questions = JSON.parse(urlParams.get('Questions'));
const answers = JSON.parse(urlParams.get('Answers'));
const correctAnswers = JSON.parse(urlParams.get('correctAnswers'));
const balls = JSON.parse(urlParams.get('Balls'));
const resultsBody = document.getElementById("results-body");

let style;
let totalBalls = 0;
for (let i = 0; i < 8; i++) {
    totalBalls += balls[i];
    if (balls[i] === 0) {
        style = "result-row-incorrect";
    } else {
        style = "result-row-correct";
    }
    if (!answers[i]) {
        answers[i] = "Ответ не дан";
        style = "result-row-no";
    }
    const resultRow = `
        <tr>
            <td class="${style}">${i+1}</td>
            <td class="${style}">${questions[i]}</td>
            <td class="${style}">${answers[i]}</td>
            <td class="${style}">${correctAnswers[i]}</td>
            <td class="${style}">${balls[i]}</td>
        </tr>
    `;
    resultsBody.innerHTML += resultRow;
}
const totalBallsElem = document.getElementById("total-balls");
totalBallsElem.innerText = totalBalls;
const returnBtn = document.getElementById("return");
returnBtn.addEventListener("click", function() {
  window.open(`../index.html`, "_self");
});


