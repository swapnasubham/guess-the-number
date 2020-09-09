/* Create a SpeechRecognition Object */
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
/* DOM Element */
const message = document.getElementById("msg");
const randomNumber = getRandomNumber();

/* Functions * /
/* Create a Random Number Between 1 -100 */
function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

/* write message what user speaks */
function writeMessage(output){
    message.innerHTML = `
        <div>You Said:</div>
        <span class="box">${output}</span>`;
}

/* Check whether the message is number or not */
function checkNumber(output){
    let num = +output;
    if(Number.isNaN(num)){
        message.innerHTML += `<div>This is not a valid number</div>`;
    }

    if(num > 100 || num < 0){
        message.innerHTML += `<div>Number Must be Between 1 - 100</div>`;
    }

    if(num === randomNumber){
        document.body.innerHTML = `<h2>Congrats!! You have Guessed The Number!! <br><br><br>
        It was ${num}</h2>
        <button class ="play-again" id ="play-again">Play Again</button>`
    }
    else if (num > randomNumber){
        message.innerHTML += `<div>Go Lower</div>`;
    }
    else if (num < randomNumber){
        message.innerHTML += `<div>Go Higher</div>`;
    }
    
}
/* Capture User Voice */
function onSpeak(event){
    let output = event.results[0][0].transcript;
    console.log(output)
    writeMessage(output);
    checkNumber(output);
}

/* Start SpeechRecognition */
recognition.start();

/* Event */
recognition.addEventListener("result",onSpeak);
recognition.addEventListener("end",() => recognition.start());
document.body.addEventListener("click",event => {
    if(event.target.id == "play-again"){
        window.location.reload()
    }
})