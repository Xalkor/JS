let questionP = document.getElementById('questionP');
let yesButton = document.getElementById('yesButton');
let noButton  = document.getElementById('noButton');

class Question {
    constructor(q, yText, nText, y=undefined, n=undefined) {
        this.q = q;
        this.yText = yText;
        this.nText = nText;
        this.y = y || this;
        this.n = n || this;
    }
}

let finalQuestion = new Question(
    'Yay! I love you!! :) <3',
    'I love you too!',
    'I love you too!'
)

function timerN(n) {
    if (n <= 0) return;
    setTimeout(()=> {
        burst();
        timerN(n-1);
    }, 200);
}

finalQuestion.extraYes = () => timerN(10)
finalQuestion.extraNo  = () => timerN(10)

let question5 = {
    q: 'Will you be my valentine?',
    yText: 'Yes!',
    nText: 'Of Course!!',
    y: finalQuestion,
    n: finalQuestion
}
let question4 = {
    q: 'Let me try something else...',
    yText: 'Ok',
    nText: 'Ok',
    y: question5,
    n: question5
}
let question2_4 = {
    q: 'Will you be my valentine?',
    yText: 'Yes!',
    nText: 'No...',
    y: finalQuestion,
    n: question4,
    extraNo: () => { noButton.style.setProperty('--size', '32px');yesButton.style.setProperty('--size', '32px');  },
    extraYes: () => { noButton.style.setProperty('--size', '32px');yesButton.style.setProperty('--size', '32px');  }
}
let question2_3 = {
    q: 'Will you be my valentine?',
    yText: 'Yes!',
    nText: 'No...',
    y: finalQuestion,
    n: question2_4,
    extraNo: reduceNo,
    extraYes: () => { noButton.style.setProperty('--size', '32px');yesButton.style.setProperty('--size', '32px');  }
}
let question2_2 = {
    q: 'Will you be my valentine?',
    yText: 'Yes!',
    nText: 'No...',
    y: finalQuestion,
    n: question2_3,
    extraNo: reduceNo,
    extraYes: () => { noButton.style.setProperty('--size', '32px');yesButton.style.setProperty('--size', '32px');  }
}
let question2_1 = {
    q: 'Will you be my valentine?',
    yText: 'Yes!',
    nText: 'No...',
    y: finalQuestion,
    n: question2_2,
    extraNo: reduceNo,
    extraYes: () => { noButton.style.setProperty('--size', '32px');yesButton.style.setProperty('--size', '32px');  }
}
let question2 = {
    q: 'Will you be my valentine?',
    yText: 'Yes!',
    nText: 'No...',
    y: finalQuestion,
    n: question2_1,
    extraNo: reduceNo,
    extraYes: () => { noButton.style.setProperty('--size', '32px');yesButton.style.setProperty('--size', '32px');  }
}

function reduceNo(){
    let computedStyle = window.getComputedStyle(noButton);
    let buttonTextSize = computedStyle.getPropertyValue('--size');
    noButton.style.setProperty(
         '--size', 
         (0.6*(+buttonTextSize.slice(0,-2))) + 'px'
    );

    computedStyle = window.getComputedStyle(yesButton);
    buttonTextSize = computedStyle.getPropertyValue('--size');
    yesButton.style.setProperty(
         '--size', 
         (1.2*(+buttonTextSize.slice(0,-2))) + 'px'
    );
}

let question1 = {
    q: 'Hi Baby! Will you be my valentine?',
    yText: 'Yes!',
    nText: 'No...',
    y: finalQuestion,
    n: {
        q: 'Umm... Let\'s try that again',
        yText: 'Ok',
        nText: 'Ok',
        y: question2,
        n: question2,
        extraNo:  reduceNo,
        extraYes: reduceNo
    }
}

let currentQuestion = null;

function main(question) {
    currentQuestion = question;
    questionP.innerHTML = question.q;
    yesButton.innerHTML = question.yText;
    noButton.innerHTML  = question.nText;
}

function yes() {
    if(currentQuestion.extraYes) currentQuestion.extraYes(); 
    main(currentQuestion.y);
}

function no() {
    if(currentQuestion.extraNo) currentQuestion.extraNo(); 
    main(currentQuestion.n);
}