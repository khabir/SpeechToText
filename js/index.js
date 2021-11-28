// Speech Recognition API Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
//recognition.lang = 'en-US';
//recognition.lang = 'bn-BD';

const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');
const talkingStatus = document.querySelector('#talkingStatus');
const textPreview = document.querySelector('#textPreview');
const language = document.querySelector('#language');

const styleTag = document.createElement('style');


// variables
let TextString = '';
const accuracy = 0.7;

// functions
const handleStart = () => {
    //recognition.lang = 'ja-JP';
    recognition.lang = language.value;

    startButton.disabled = true;
    startButton.classList.remove('bg-green');
    startButton.classList.add('disabled');

    stopButton.disabled = false;
    stopButton.classList.add('bg-red');
    stopButton.classList.remove('disabled');

    talkingStatus.innerText = 'Talking';
    talkingStatus.classList.add('blink');
    recognition.start();
};

const handleStop = () => {
    stopButton.disabled = true;
    stopButton.classList.remove('bg-green');
    stopButton.classList.add('disabled');
    
    startButton.disabled = false;
    startButton.classList.add('bg-green');
    startButton.classList.remove('disabled');

    talkingStatus.innerText = 'Not Talking';
    talkingStatus.classList.remove('blink');
    recognition.stop();
};

const handleClear = () =>{
    textPreview.innerHTML = '';
};

const handleUnrecognized = () => {
    talkingStatus.innerText = 'Not Talking';
    alert('Could not understand your text!');
    talkingStatus.classList.remove('blink');
    recognition.stop();
};

const processResult = (result) => {
    console.log(result);
    textPreview.innerHTML += result;
};

const handleResults = (event) => {
    const { results, resultIndex } = event;
    const { transcript, confidence } = results[resultIndex][0];
    if (confidence > accuracy) {
        processResult(transcript);
    }
};

// add the css style tag
document.head.appendChild(styleTag);

// add event listeners
startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);
clearButton.addEventListener('click', handleClear);
recognition.addEventListener('result', handleResults);
