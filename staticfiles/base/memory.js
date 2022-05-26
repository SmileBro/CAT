let cards_parent = document.querySelector('.cards-parent');
let card = document.getElementsByClassName('card');
let level_text = document.getElementById('level-text');
let start_btn = document.querySelector(".start");

const min = 1;
const max = 16;

function getRandomNumber(min, max) {
	return min + Math.floor(Math.random() * Math.floor(max));
}

let i = 0, step = 0, level = 0;
var queue = [];

cards_parent.onclick = function(event) {
	if (i === level) {
		card_click = event.target.closest('.card');
		if (!card_click) {
			return;
		}
		if (!cards_parent.contains(card_click)) {
			return;
		}
		if (card_click.getAttribute('id') === queue[step].toString()) {
			step++;
			if (step === queue.length) {
				level_text.innerHTML = queue.length + 1;
				level++;
				var csrftoken = getCookie('csrftoken');
				var request = new XMLHttpRequest();
				request.open('POST', '/memory_test/');
				request.setRequestHeader("X-CSRFToken", csrftoken); 
				request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"); 
				request.send(level);
				start_until(1000);
			}
		}
		else {
			clearTimeout(setTimeout);
			level = 0;
			queue = [];
			start_until(1000);
			level_text.innerHTML = 'Wrong';
		}
	}
};

function turn_off() {
	card[queue[i]].classList.remove('highlight');
}

function game() {
	card[queue[i]].classList.add('highlight');
	setTimeout(function() {
		card[queue[i]].classList.remove('highlight');
		if (i < queue.length - 1) {
			i++;
			setTimeout(game, 90);
		}
	}, 700);
}

function start_until(time) {
	i = 0;
	step = 0;
	for (let j = 0; j < max - 1; j++) {
		card[j].classList.remove('highlight');
	}
	start_timeout = setTimeout(function() {
		queue.push(getRandomNumber(0, 15));
		game();
	}, time);
}

function startGame() {
	clearTimeout(setTimeout);
	level = 0;
	queue = [];
	start_until(1000);
	level_text.innerHTML = 1;
	start_btn.textContent = "Заново";
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