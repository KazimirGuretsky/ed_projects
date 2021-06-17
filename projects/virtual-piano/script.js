const fullscreenButton = document.querySelector(".fullscreen");
const notesButton = document.querySelector(".btn-notes");
const lettersButton = document.querySelector(".btn-letters");
const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

function activateFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen(); // W3C spec
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
    }
}

function deactivateFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function fullscreenSwitcher(e) {
    if (e.target.classList.contains("openfullscreen")) {
        activateFullscreen(document.body);
        e.target.classList.toggle("openfullscreen");
        e.target.classList.toggle("closefullscreen");
    } else if (e.target.classList.contains("closefullscreen")) {
        deactivateFullscreen();
        e.target.classList.toggle("closefullscreen");
        e.target.classList.toggle("openfullscreen");
    }
}

fullscreenButton.onclick = fullscreenSwitcher;

function notesLettersSwitcher(e) {
    pianoKeys.forEach((element) => {
        element.classList.toggle("letter");
    });
    lettersButton.classList.toggle("btn-active");
    notesButton.classList.toggle("btn-active");
}

notesButton.addEventListener('click', notesLettersSwitcher);
lettersButton.addEventListener('click', notesLettersSwitcher);

let isMouseDown = false;

function playAudioKey(e) {
    if (e.type === 'mousedown') {
        isMouseDown = true;
        e.target.classList.toggle('piano-key-active');
        e.target.classList.toggle('piano-key-active-pseudo');
        playAudio(e.target.dataset.note)
    } else if (e.type === 'mouseup' && isMouseDown) {
        isMouseDown = false;
        pianoKeys.forEach(element => {
            if (element.classList.contains('piano-key-active')) {
                e.target.classList.toggle('piano-key-active');
                e.target.classList.toggle('piano-key-active-pseudo');
            }
        });
    }
}

function playAudio(note) {
    const audio = new Audio();
    audio.src = `./assets/audio/${note}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

function playAudioMouse(e) {
    if (isMouseDown && e.target.classList.contains('piano-key') && e.type === 'mouseover') {
        e.target.classList.toggle('piano-key-active');
        e.target.classList.toggle('piano-key-active-pseudo');
        playAudio(e.target.dataset.note)
    } else if (isMouseDown && e.target.classList.contains('piano-key') && e.type === 'mouseout') {
        e.target.classList.toggle('piano-key-active');
        e.target.classList.toggle('piano-key-active-pseudo');
    }
}

piano.addEventListener('mousedown', playAudioKey);
window.addEventListener('mouseup', playAudioKey);
piano.addEventListener('mouseover', playAudioMouse);
piano.addEventListener('mouseout', playAudioMouse);

window.addEventListener('keydown', (event) => {
    pianoKeys.forEach(element => {
        if (`Key${element.dataset.letter}` === event.code && !element.classList.contains('piano-key-active')) {
            element.classList.toggle('piano-key-active');
            playAudio(element.dataset.note)
        }
    });
});
window.addEventListener('keyup', (event) => {
    pianoKeys.forEach(element => {
        if (`Key${element.dataset.letter}` === event.code && element.classList.contains('piano-key-active')) {
            element.classList.toggle('piano-key-active');
        }
    });
});

