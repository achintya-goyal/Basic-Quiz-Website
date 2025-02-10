const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");
const questionTotal = document.querySelector('.question-total');
const resultBox = document.querySelector('.result-box');
const  tryAgain= document.querySelector('.tryAgain-btn');
const  Home= document.querySelector('.goHome-btn');
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;



startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}


exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestion(0);
    questionCounter(1);
    headerScore();
}


/*function getRandomNumber() {
    return Math.floor(Math.random() * 25) ;
}*/


/*let randomNumber = getRandomNumber();*/
nextBtn.onclick = () => {
    if (questionNumb<5){
        ++questionCount;
        showQuestion(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}




function showQuestion(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].option[0]}</span></div>
    <div class="option"><span>${questions[index].option[1]}</span></div>
    <div class="option"><span>${questions[index].option[2]}</span></div>
    <div class="option"><span>${questions[index].option[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for (let i=0; i<option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this,)');
    }

}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore+=1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        for(let i=0; i<allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for(let i=0; i<allOptions;i++){
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}


function questionCounter(index){
    questionTotal.textContent = `${index} of 5 Question`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/5`
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add("active");

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of 5`;
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = (userScore / 5)*100;
    let speed = 20;

    let progress = setInterval(()=>{
        progressStartValue++;
        console.log(progressStartValue)

        progressValue.textContent = `${progressStartValue}%`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed);
}

tryAgain.onclick = () =>{
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active')

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

Home.onclick = () =>{
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active')

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

