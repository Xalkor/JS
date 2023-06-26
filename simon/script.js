let context;
let oscillator;
let gainNode;

const smoothingInterval = 0.02;
const beepLengthInSeconds = 0.5;
function play(color, duration) {
    oscillator.frequency.value = buttons[color].freq;

    const now = context.currentTime;
    gainNode.gain.setTargetAtTime(0, now, smoothingInterval);
    gainNode.gain.setTargetAtTime(1, now + duration/2, smoothingInterval);
    gainNode.gain.setTargetAtTime(0, now + duration, smoothingInterval);
}

let input = false;

let r = document.getElementById('r');
let g = document.getElementById('g');
let b = document.getElementById('b');
let y = document.getElementById('y');

r.freq = 196;
g.freq = 261;
y.freq = 329;
b.freq = 392;

r.onclick = () => onclick('r');
g.onclick = () => onclick('g');
b.onclick = () => onclick('b');
y.onclick = () => onclick('y');

let buttons = {
    'r':r, 'g':g, 'b':b, 'y':y
}

function onclick(color) {
    if(!input) return;

    play(color, 0.4);

    playerSequence += color;

    if(playerSequence != sequence.slice(0, playerSequence.length)) {
        playButton.innerText = "Game Over, Try Again?";
        playButton.disabled = false;
        messageSpan.innerText = `Score: ${sequence.length-1}`;
        playerSequence = "";
        sequenceIndex = 0;
        
        return;
      }
      
      if( playerSequence.length == sequence.length ) {
        
        //println("[" + playerSequence + "]");
        //println("[" + sequence + "]\n");

        messageSpan.innerText = "Good!";
        setTimeout( ()=>messageSpan.innerText="",500 );

        setTimeout( ()=>{
            r.classList.add('highlight');
            g.classList.add('highlight');
            b.classList.add('highlight');
            y.classList.add('highlight');
        }, 250 );

        setTimeout( ()=>{
            r.classList.remove('highlight');
            g.classList.remove('highlight');
            b.classList.remove('highlight');
            y.classList.remove('highlight');
        }, 750 );

        playerSequence = "";
        sequence += randChar();
        sequenceIndex = 0;
        playSequence(1000, 0, true, null);        

      }
}

function randChar() {
    return "rgyb"[Math.floor(Math.random()*4)];  
}

let messageSpan = document.getElementById('messageSpan');
let playButton = document.getElementById('playButton');
playButton.onclick = () => {
    context = new AudioContext();
    oscillator = context.createOscillator();    
    oscillator.type = 'square';

    gainNode = context.createGain();
    gainNode.connect(context.destination);
    gainNode.gain.setValueAtTime(0, context.currentTime);

    oscillator.connect(gainNode);
    oscillator.start();

    playButton.disabled = true;
    playButton.innerText = '';
    sequence = randChar();
    playSequence(100, 0, true, null);
}

function playSequence(time, i, on, curr) {
    if(i >= sequence.length) {
        input = true;
        return;
    }

    setTimeout( () => {
        if(on) {
            curr = buttons[sequence[i]];
            curr.classList.add('highlight');
            play(sequence[i], 0.4);
            playSequence(400, i, false, curr);
        } else {
            curr.classList.remove('highlight');
            playSequence(100, i+1, true, null);
        }        
    }, time );
}

let sequenceIndex = 0;
let sequence = '';

let playerSequence = '';