let currentCard = 0; 
let maxCards = 20;
let flashcards = []; 


function start() {

    document.addEventListener("DOMContentLoaded", loadCard(0, true));

    const showAnsBtn = document.getElementById("show-answer-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    showAnsBtn.addEventListener("click", () => {
        showAnswer();
    });

    nextBtn.addEventListener("click", () => {
        if (currentCard < maxCards) {
            nextCard();
            console.log(currentCard)
        }
    });
    prevBtn.addEventListener("click", () => {
        if (currentCard > 0) {
            previousCard();
            console.log(currentCard)
        }
    });

    updateProgressBar();


};

function loadCard(index, isQuestion) {
    fetch("../cards.json")
        .then(response => {
            return response.json();
        }).then(data => {
            let questionAnswer = document.getElementById("question");

            flashcards = data.cards;

            if (isQuestion) {
                questionAnswer.textContent = flashcards[index].question;
            }
            else {
                questionAnswer.textContent = flashcards[index].answer;
                flashcards[index].completed = true;
            }

        });


};

function nextCard() {
    currentCard++;
    loadCard(currentCard, true);
};

function previousCard() {
    currentCard--;
    loadCard(currentCard, true);
};

function showAnswer() {
    loadCard(currentCard, false);
    updateProgressBar();
};

function updateProgressBar(){
    const progressBar = document.getElementById('progress-bar');
    let completedCards = flashcards.filter(card => { card.completed === true}).length;
    let progressCalc = completedCards * (maxCards / 100)

    progressBar.style.setProperty("--width", progressCalc)
    progressBar.setAttribute('data-label', `${completedCards} of ${maxCards}`);
    
}

start();