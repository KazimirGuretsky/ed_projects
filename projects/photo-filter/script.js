let dateNow = new Date(Date.now());
let dateHour = dateNow.getHours();

let root = document.querySelector(':root');
let rootStyles = getComputedStyle(root);

let picture = document.querySelector('.editor>img');
let canvas = document.getElementById('canvas');

let filters = document.querySelector('.filters');
let filtersInput = document.querySelectorAll('.filters>label>input');

let resetBtn = document.querySelector('.btn-reset');
let nextBtn = document.querySelector('.btn-next');
let loadBtn = document.querySelector('.btn-load--input');
let saveBtn = document.querySelector('.btn-save');
let fullscreenBtn = document.querySelector(".fullscreen");

let images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

let timeOfDay = '';
if (dateHour >= 6 && dateHour < 12) {
    timeOfDay = 'morning';
} else if (dateHour >= 12 && dateHour < 18) {
    timeOfDay = 'day'
} else if (dateHour >= 18 && dateHour < 24) {
    timeOfDay = 'evening'
} else if (dateHour >= 0 && dateHour < 6) {
    timeOfDay = 'night'
}

let base = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/`;

filters.addEventListener('input', applyFilters);

nextBtn.addEventListener('click', getImage);
resetBtn.addEventListener('click', resetFilters);
loadBtn.addEventListener('change', addPicture);
saveBtn.addEventListener('click', downloadPic);
fullscreenBtn.addEventListener('click',fullscreenSwitcher)

function applyFilters(e) {
    root.style.setProperty(`--${e.target.name}`, `${e.target.value}${e.target.dataset.sizing}`)
    e.target.nextElementSibling.innerHTML = e.target.value;
}

function resetFilters(e) {
    filtersInput.forEach(element => {
        element.value = element.name != 'saturate' ? element.min : 100;
        element.nextElementSibling.innerHTML = element.value;
    });
    root.style.setProperty('--blur', '0px');
    root.style.setProperty('--invert', '0%');
    root.style.setProperty('--sepia', '0%');
    root.style.setProperty('--saturate', '100%');
    root.style.setProperty('--hue', '0deg');
}

function nextImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        picture.src = src;
    };
}

function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    nextImage(imageSrc);
    i++;
    nextBtn.disabled = true;
    setTimeout(function () { nextBtn.disabled = false }, 300);
}

function addPicture(e) {
    const file = loadBtn.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        let img = new Image();
        img.src = reader.result;
        picture.src = img.src;
    }
    reader.readAsDataURL(file);
    loadBtn.value="";
    
}

function drawImage() {
    let picBlur = rootStyles.getPropertyValue('--blur').trim();
    let picInvert = rootStyles.getPropertyValue('--invert').trim();
    let picSepia = rootStyles.getPropertyValue('--sepia').trim();
    let picSaturate = rootStyles.getPropertyValue('--saturate').trim();
    let picHue = rootStyles.getPropertyValue('--hue').trim();
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = picture.src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.filter = `blur(${picBlur}) invert(${picInvert}) sepia(${picSepia}) saturate(${picSaturate}) hue-rotate(${picHue})`;
        ctx.drawImage(img, 0, 0);
    };
}
function downloadPic(e) {
    drawImage();
    setTimeout(()=>{
        let link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;

    },1000)
};

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
        activateFullscreen(document.documentElement);
        e.target.classList.toggle("openfullscreen");
    }else {
        deactivateFullscreen();
        e.target.classList.toggle("openfullscreen");
    }
}