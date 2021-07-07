const time = document.getElementById("time");

let swap = true;

let goGo;
let clock = false;

function run() {
  goGo = setInterval(countDown, 1000);
  clock = true;
}

function halt() {
  clearInterval(goGo);
  clock = false;
}

const beep = document.querySelector("audio");
function alarm() {
  beep.play();
}

function stopAlarm() {
  beep.pause();
  !swap ? working() : resting();
}

let seconds = 0;
let minutes = 25;
const appendLeadingZero = (value) => (value < 10 ? `0${value}` : value);
function countDown() {
  if (minutes === 0 && seconds === 1) {
    stopBtn.textContent = "Stop";
    halt();
    alarm();
  }
  if (seconds === 0) {
    seconds = 60;
    minutes--;
  }
  seconds--;

  time.textContent = `${minutes}:${appendLeadingZero(seconds)}`;
}

function working() {
  minutes = 25;
  seconds = 0;
  time.textContent = `${minutes}:${appendLeadingZero(seconds)}`;
  swap = true;
  halt();
}

function resting() {
  minutes = 0;
  seconds = 10;
  time.textContent = `${minutes}:${appendLeadingZero(seconds)}`;
  swap = false;
  halt();
}

const work = document.getElementById("work");
work.addEventListener("click", () => working());

const rest = document.getElementById("rest");
rest.addEventListener("click", () => resting());

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", () => {
  if (minutes === 0 && seconds === 0) {
    stopAlarm();
    stopBtn.textContent = "Pause";
  } else if (clock === true) {
    halt();
  }
});

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  swap ? working() : resting();
});

const start = document.getElementById("start");
start.addEventListener("click", () => {
  if (clock === false) {
    run();
  }
});
