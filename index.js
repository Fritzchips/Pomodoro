let work = document.getElementById('work');
let rest = document.getElementById('rest');
let time = document.getElementById('time');
let start = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let reset = document.getElementById('reset');
let beep = document.querySelector('audio');

let seconds = 0;
let tenthSeconds = 0;
let minutes = 25; 


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

function alarm() {
    beep.play();
} 

function stopAlarm() {
    beep.pause();

    if(swap === false) {
        working();  
    } else {
        resting();
    }
    
} 

function countDown() {
    if(seconds == 0) {
        moveTime();
        time.innerText =  minutes + ':' + tenthSeconds + seconds;
    } else if (seconds == 1) {
        seconds = 0;
        time.innerText = minutes + ':' + tenthSeconds + seconds;
    } else {
        seconds --;
        time.innerText = minutes + ':' + tenthSeconds + seconds;
    }
} 

function moveTime() {
    if( tenthSeconds == 0 && minutes == 0 && seconds == 0) {
        stopBtn.innerText = "Stop";
        alarm();

    } else if(seconds == 0){

        if(tenthSeconds == 0 && minutes == 0){
            tenthSeconds = 0;
        } else if(tenthSeconds == 0){
            tenthSeconds = 5;
        } else {
           tenthSeconds --; 
        }
        
        if(tenthSeconds == 5){
            if(minutes > 0){
               minutes--; 
            } else {
                minutes = 0;
            }
        }

        seconds = 9;
    }
}

function working() {
    time.innerText = "25:00";
    seconds = 0;
    tenthSeconds = 0;
    minutes = 25;
    swap = true;
    halt();
}

function resting() {
    time.innerText = "5:00";
    seconds = 0;
    tenthSeconds = 0;
    minutes = 5;
    swap = false;
    halt();
} 

work.addEventListener('click', () => {
    working();
})

rest.addEventListener('click', () => {
    resting();
})

stopBtn.addEventListener('click', () => {
    if( tenthSeconds == 0 && minutes == 0 && seconds == 0) {
        stopAlarm();
        stopBtn.innerText = "Pause";
    } else if (clock === true) {
        halt();
    }
    
})

reset.addEventListener('click', () => {
    if(swap === true) {
        working();
    } else {
        resting();
    }
})

start.addEventListener('click', ()=> {
    if(clock === false) {
        run();
    }
})

