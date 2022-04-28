let word_area = document.querySelector(".word");
let lives_block = document.querySelector(".lives-block");
let score_block = document.querySelector(".score-block");
let result_block = document.querySelector(".result-block");
let lives_text = document.querySelector(".lives-value");
let score_text = document.querySelector(".score-value");
let seen_btn = document.querySelector(".seen");
let new_btn = document.querySelector(".new");
let restart_btn = document.querySelector(".restart");

let words_array = [];
const words_length = words.length;
let current_word = "";
let lives, score;
let wordNo = 0;

function initWords() {
	for (let i = 0; i < words_length; i++) {
		words_array.push([words[i], 0]);
	}
}

function resetWord() {
	for (let i = 0; i < words_length; i++) {
		words_array[i][1] = 0;
	}
}

function updateWord() {
	word_area.textContent = null;
	wordNo = Math.floor(Math.random() * words_length);
	current_word = words_array[wordNo][0];
	word_area.textContent = current_word;
}

function finishGame() {
	new_btn.style.display = "none";
	seen_btn.style.display = "none";
	lives_block.style.display = "none";
	score_block.style.display = "none";
	restart_btn.style.display = "block";
	result_block.style.display = "block";
	var csrftoken = getCookie('csrftoken');
	var request = new XMLHttpRequest();
	request.open('POST', '/verbal/');
	request.setRequestHeader("X-CSRFToken", csrftoken); 
	request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"); 
	request.send(score);
	word_area.textContent = score;
}

function seen_word() {
	if (words_array[wordNo][1] && lives !== 0) {
		score++;
		score_text.textContent = score;
		updateWord();
	}
	else {
		lives--;
		lives_text.textContent = lives;
		updateWord();
	}
	
	if (lives === 0) {
		finishGame();
	}
}

function new_word() {
	if (!words_array[wordNo][1] && lives !== 0) {
		score++;
		score_text.textContent = score;
		words_array[wordNo][1] = 1;
		updateWord();
	}
	else {
		lives--;
		lives_text.textContent = lives;
		updateWord();
	}
	
	if (lives === 0) {
		finishGame();
	}
}

function restartGame() {
	lives = 3;
	score = 0;
	lives_text.textContent = lives;
	score_text.textContent = score;
	new_btn.style.display = "block";
	seen_btn.style.display = "block";
	lives_block.style.display = "flex";
	score_block.style.display = "flex";
	restart_btn.style.display = "none";
	result_block.style.display = "none";
	
	resetWord();
	updateWord();
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

initWords();
restartGame();