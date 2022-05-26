let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvas_parent = document.querySelector('.canvas-parent');

let parent_height = canvas_parent.clientHeight;
let parent_width = canvas_parent.clientWidth;

canvas.height = parent_height;
canvas.width = parent_width;
canvas.style.borderRadius = "12px";

context.textAlign = "center";
context.fillStyle = "white";
context.font = "25pt Nunito";
context.fillText("Нажми здесь", canvas.width / 2, canvas.height / 2);

let time_text = document.getElementById('time-text');

let GameIs = {
    STOP: 1,
    START: 2,
};

let BackgroundIs = {
    RED: 1,
    GREEN: 2,
};

let game_status = GameIs.STOP;
let color_status = BackgroundIs.RED;
var start_timeout, end_timeout;
let first_click, second_click, play_time;

function getRandomTime(min, max) {
    let result = min + Math.floor(Math.random() * Math.floor(max));
    result *= 1000;
    return result;
}

function start_game() {
    clearTimeout(start_timeout);
    clearTimeout(end_timeout);
    let change_time = getRandomTime(2, 5);
    let end_time = change_time + 5000;
    canvas.style.background = "#ff0000";

    color_status = BackgroundIs.RED;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText("Дождитесь зелёного!", canvas.width / 2, canvas.height / 2);
    start_until(change_time); // green color will appear
    end_until(end_time); // green color will disappear 5 sec after it appears
}

function start_until(time) {
    start_timeout = setTimeout(function() {
        canvas.style.background = "rgb(78, 197, 78)";
        color_status = BackgroundIs.GREEN;
        let first = new Date();
        first_click = first.getTime();
        console.log(first_click);
    }, time);
}

function end_game() {
    clearTimeout(start_timeout);
    clearTimeout(end_timeout);
    if (color_status === BackgroundIs.GREEN && game_status === GameIs.STOP) {
        let second = new Date();
        second_click = second.getTime();
        console.log(second_click);
        play_time = (second_click - first_click - 90);
        //time_text.innerHTML = play_time + " ms";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText(play_time + " мс", canvas.width / 2, canvas.height / 2);
    } else if (game_status === GameIs.START) { // if there was no click
        //time_text.innerHTML = "Too late!";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText("Слишком поздно!", canvas.width / 2, canvas.height / 2);
    } else {
        //time_text.innerHTML = "Too soon!"; // if the click was before green
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText("Слишком рано!", canvas.width / 2, canvas.height / 2);
    }
    canvas.style.background = "rgb(86, 86, 231)"; // blue (default)
    game_status = GameIs.STOP;
}

function end_until(time) {
    end_timeout = setTimeout(function() {
        end_game();
    }, time);
}

canvas.addEventListener(
    'click',
    function() {
        if (game_status === GameIs.START) {
            let d1 = new Date();
            let d2 = d1.getTime();
            console.log(d2);
            game_status = GameIs.STOP;
            end_game();
        } else {
            let d1 = new Date();
            let d2 = d1.getTime();
            console.log(d2);
            game_status = GameIs.START;
            start_game();
        }
    }
);