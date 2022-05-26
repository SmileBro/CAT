let TIME_LIMIT = 60;

let timer_text = document.querySelector(".current-time");
let accuracy_text = document.querySelector(".current-accuracy");
let error_text = document.querySelector(".current-errors");
let cpm_text = document.querySelector(".current-cpm");
let wpm_text = document.querySelector(".current-wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input-area");
let restart_btn = document.querySelector(".restart-button");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    quoteNo = Math.floor(Math.random() * paragraphs.length);
    current_quote = paragraphs[quoteNo];
    // separate each character and make an element
    // out of each of them to individually style them
    current_quote.split('').forEach(
        char => {
            const charSpan = document.createElement('span');
            charSpan.innerText = char;
            quote_text.appendChild(charSpan);
        }
    );
}

function processCurrentText() {
    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    // increment total characters typed
    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach(
        (char, index) => {
            let typedChar = curr_input_array[index];
            // character not currently typed
            if (typedChar == null) {
                char.classList.remove('correct_char');
                char.classList.remove('incorrect_char');
                // correct character
            } else if (typedChar === char.innerText) {
                char.classList.add('correct_char');
                char.classList.remove('incorrect_char');
                // incorrect character
            } else {
                char.classList.add('incorrect_char');
                char.classList.remove('correct_char');
                // increment number of errors
                errors++;
            }
        }
    );

    // display the number of errors
    error_text.textContent = total_errors + errors;

    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
        updateQuote();
        // update total errors
        total_errors += errors;
        // clear the input area
        input_area.value = "";
    }
}

function startGame() {
    resetValues();
    updateQuote();
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

function updateTimer() {
    if (timeLeft > 0) {
        // decrease the current time left
        timeLeft--;
        // increase the time elapsed
        timeElapsed++;
        // update the timer text
        timer_text.textContent = timeLeft + "s";
    } else {
        // finish the game
        finishGame();
    }
}

function finishGame() {
    // stop the timer
    clearInterval(timer);
    // disable the input area
    input_area.disabled = true;
    // show finishing text
    quote_text.textContent = "Нажмите кнопку, чтобы начать заново.";
    // display restart button
    restart_btn.style.display = "block";
    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";

    var csrftoken = getCookie('csrftoken');
    var request = new XMLHttpRequest();
    request.open('POST', '/type_speed/');
    request.setRequestHeader("X-CSRFToken", csrftoken);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(cpm);
    // хз, можно ли отправлять два подряд
    //request.send(wpm);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}