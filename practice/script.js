let currentCard = 0; // Index that will selected the card
let flashcards = [ // Since we can't change the data in JSON, we will use this array to track progress
    {
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language used to make web pages interactive and run code in the browser or on the server (Node.js).",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you declare a variable?",
        answer: "Use var, let, or const. let and const are block-scoped; const is for values that shouldn't be reassigned.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you write a function?",
        answer: "Use function myFunc() { ... } or an arrow: const myFunc = () => { ... } to group reusable code.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you call a function?",
        answer: "Write the function name followed by parentheses: myFunc() or myFunc(arg1, arg2).",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "What is an array?",
        answer: "An array is an ordered list of values accessed by numeric indices, e.g., [1, 2, 3].",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you add an item to an array?",
        answer: "Use push to add to the end: arr.push(item). Use unshift to add to the start.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "What is an object?",
        answer: "An object stores keyed values as properties: const obj = { key: value } and you access with obj.key or obj['key'].",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you read or write a property on an object?",
        answer: "Read: obj.prop or obj['prop']. Write: obj.prop = value or obj['prop'] = value.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "What is a string?",
        answer: "A string is text wrapped in quotes, e.g., 'hello' or \"hello\".",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "What is a number?",
        answer: "A number represents numeric values like 42 or 3.14; JavaScript uses one Number type for integers and floats.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "What is a boolean?",
        answer: "A boolean is true or false and is used for conditions and logic.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you compare values?",
        answer: "Use === for strict equality and !== for strict inequality; use <, >, <=, >= for numeric comparisons.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you write a conditional?",
        answer: "Use if (condition) { ... } else { ... } to run code based on a condition.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you loop over numbers?",
        answer: "Use for (let i = 0; i < n; i++) { ... } to repeat code a set number of times.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you loop over array items?",
        answer: "Use for (const item of arr) { ... } or arr.forEach(item => { ... }) to access each element.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you print to the console?",
        answer: "Use console.log(value) to output values for debugging.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you add a comment?",
        answer: "Use // for single-line or /* ... */ for multi-line comments.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "What is the DOM?",
        answer: "The DOM is the document object model: a tree of HTML elements that JavaScript can read and change.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you select an element from the page?",
        answer: "Use document.getElementById('id') or document.querySelector('.class') to get elements from the DOM.",
        completed: false,
        hiddenAnswer: true
    },
    {
        question: "How do you change an element's text?",
        answer: "Set element.textContent = 'new text' or element.innerText = 'new text' to update visible content.",
        completed: false,
        hiddenAnswer: true
    }
];

let maxCards = flashcards.length; // Max number of cards available



function start() {

    // Loading first card when DOM is ready
    document.addEventListener("DOMContentLoaded", () => loadCard(0));


    // Getting btns
    const showAnsBtn = document.getElementById("show-answer-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    // Adding button event listeners
    showAnsBtn.addEventListener("click", () => {
        showAnswer();
    });

    nextBtn.addEventListener("click", () => {
        if (currentCard < maxCards) {
            nextCard();
        }
    });
    prevBtn.addEventListener("click", () => {
        if (currentCard > 0) {
            previousCard();

        }
    });

    // Starting progress bar
    updateProgressBar();


};

// Function that will load the card based on the index chosen and whether to show question or answer
function loadCard(index) {

    /*
    // Fetching flashcards from json
    fetch("../cards.json")
        .then(response => response.json()) // Converting response to json
        .then(data => {
            flashcards = data.cards;

            // Load progress in localStorage
            const savedProgress = JSON.parse(localStorage.getItem("progress")) || {};

            // Aplicar progresso
            flashcards.forEach(card => {
                if (savedProgress[card.id]) {
                    card.completed = true;
                }
            });
            
            let questionAnswer = document.getElementById("question");

            if (isQuestion) {
                questionAnswer.textContent = flashcards[index].question;
            } else {
                questionAnswer.textContent = flashcards[index].answer;

                // Marca como completada
                flashcards[index].completed = true;

                // Salva no localStorage
                savedProgress[flashcards[index].id] = true;
                localStorage.setItem("progress", JSON.stringify(savedProgress));
            }
        });
        */

    let questionAnswer = document.getElementById("question");

    if (flashcards[index].hiddenAnswer === true) {
        questionAnswer.textContent = flashcards[index].question;
    } else {

        questionAnswer.textContent = flashcards[index].answer;

        // Set the flashcard to completed
        flashcards[index].completed = true;
        

        // Save the completed sets to local storage
        const savedProgress = JSON.parse(localStorage.getItem("progress")) || {};
        savedProgress[index] = true;
        localStorage.setItem("progress", JSON.stringify(savedProgress));
    }
}



// Navigation function
function nextCard() {
    currentCard++;
    loadCard(currentCard);

    if (flashcards[currentCard].hiddenAnswer === true) {
        const showAnsBtn = document.getElementById("show-answer-btn");
        showAnsBtn.textContent = "Show Answer";
    }
    else {
        const showAnsBtn = document.getElementById("show-answer-btn");
        showAnsBtn.textContent = "Hide Answer";
    }
};


// Navigation function
function previousCard() {
    currentCard--;
    loadCard(currentCard);

    if (flashcards[currentCard].hiddenAnswer === true) {
        const showAnsBtn = document.getElementById("show-answer-btn");
        showAnsBtn.textContent = "Show Answer";
    }
    else {
        const showAnsBtn = document.getElementById("show-answer-btn");
        showAnsBtn.textContent = "Hide Answer";
    }
};

// Function that will show answer
function showAnswer() {

    const showAnsBtn = document.getElementById("show-answer-btn");

    // If the answer is not shown, show it. If it is shown, hide it.
    if (flashcards[currentCard].hiddenAnswer === false) {
        showAnsBtn.textContent = "Show Answer";
        flashcards[currentCard].hiddenAnswer = true;
        loadCard(currentCard);
    }
    else {
        showAnsBtn.textContent = "Hide Answer";
        flashcards[currentCard].hiddenAnswer = false;
        loadCard(currentCard);
        updateProgressBar();
    }

   

};

// Function that will update the progress bar based on calculation of completed/to complete
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressBarLabel = document.querySelector('h3');

    // Getting only the completed cards
    let completedCards = flashcards.filter(card => card.completed === true).length;


    // This calculation will turn the completed cards into a percentage of the max cards, which will be setted as the width of the progress bar
    let progressCalc = completedCards * (100 / maxCards);

    // using "%" to make it CSS like syntax
    progressBar.style.setProperty("--width", progressCalc + "%");
    progressBar.setAttribute("data-label", `${progressCalc}%`);
    progressBarLabel.textContent = `${completedCards} of ${maxCards}`;

}


// Starting page
start();