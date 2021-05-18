let work = document.getElementById('work');
let rest = document.getElementById('rest');
let time = document.getElementById('time');
let start = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let reset = document.getElementById('reset');
let beep = document.querySelector('audio');

let i = 0;
let j = 0;
let k = 25; 
//load set time 

let swap = true;
//true = 25min, false = 5mins

let goGo;
let clock = false;
//clock controls pause and start buttons

function run() {
    goGo = setInterval(countDown, 1000);
    //since clearInterval deletes goGo, this resets goGo value

    clock = true;
} //time counts down

function halt() {
    clearInterval(goGo);
    clock = false;
} //time stops

function alarm() {
    beep.play();
} //beeps

function stopAlarm() {
    beep.pause();

    if(swap === false) {
        working();  
    } else {
        resting();
    }
    
} //beep stops, automatically swaps from working to resting

function countDown() {
    if(i == 0) {
        moveTime();
        time.innerText =  k + ':' + j + i;
    } else if (i == 1) {
        i = 0;
        time.innerText = k + ':' + j + i;
    } else {
        i --;
        time.innerText = k + ':' + j + i;
    }
} //second functionality

function moveTime() {
    if( j == 0 && k == 0 && i == 0) {
        stopBtn.innerText = "Stop";
        alarm();

    } else if(i == 0){

        if(j == 0 && k == 0){
            j = 0;
        } else if(j == 0){
            j = 5;
        } else {
           j --; 
        }
        
        if(j == 5){
            if(k > 0){
               k--; 
            } else {
                k = 0;
            }
        }

        i = 9;
    }
} //boolean for time changes

function working() {
    time.innerText = "25:00";
    i = 0;
    j = 0;
    k = 25;
    swap = true;
    halt();
} //reset to 25 mins

function resting() {
    time.innerText = "5:00";
    i = 0;
    j = 0;
    k = 5;
    swap = false;
    halt();
} //reset to 5 mins

work.addEventListener('click', () => {
    working();
})

rest.addEventListener('click', () => {
    resting();
})

stopBtn.addEventListener('click', () => {
    if( j == 0 && k == 0 && i == 0) {
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

