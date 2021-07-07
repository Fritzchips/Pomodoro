const time = document.getElementById("time");

let swap = true;
let goGo;
let clock = false;

const run = () => {
  goGo = setInterval(countDown, 1000);
  clock = true;
};

const halt = () => {
  clearInterval(goGo);
  clock = false;
};

const beep = document.querySelector("audio");
const alarm = () => {
  beep.play();
  beep.loop = true;
};

const stopAlarm = () => {
  beep.pause();
  !swap ? working() : resting();
};

let seconds = 0;
let minutes = 25;
const appendLeadingZero = (value) => (value < 10 ? `0${value}` : value);
const countDown = () => {
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
};

const working = () => {
  minutes = 25;
  seconds = 0;
  time.textContent = `${minutes}:${appendLeadingZero(seconds)}`;
  swap = true;
  halt();
};

const resting = () => {
  minutes = 5;
  seconds = 0;
  time.textContent = `${minutes}:${appendLeadingZero(seconds)}`;
  swap = false;
  halt();
};

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
