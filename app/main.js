import './css/styles.css';

let canvas, ctx,
    x=0, y=0,
    color = '#000000', border = 5,
    isEraser = false;

function getCoordinates(sX, sY, rect) {
    x = sX - rect.left;
    y = sY - rect.top;
}

function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctx.beginPath();

    ctx.lineWidth = border;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#fff' : color;

    ctx.moveTo(x, y);
    getCoordinates(e.clientX, e.clientY, e.target.getBoundingClientRect());
    ctx.lineTo(x, y);
    ctx.stroke();
}

function updateColor(col) {
    color = col;
}

function updateBorder(rad) {
    border = rad;
    const display = document.getElementById('border-display');
    display.style.backgroundColor = color;
    display.style.height = `${rad}px`;
    display.style.width = `${rad}px`;
    display.style.borderRadius = '50%';
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = 0.6 * window.innerHeight;
}

function clearCanvas() {
    ctx.clearRect(0, 0, 0.8 * window.innerWidth, 0.6 * window.innerHeight);
}

function saveImage() {
    const dataURL = canvas.toDataURL("image/png", 1.0);
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'img.png';
    document.body.appendChild(a);
    a.click();
}

function eraserOn() {
    isEraser = !isEraser;
    const eraser = document.getElementById('erase-canvas');
    eraser.classList.remove('on');
    if(isEraser) {
        eraser.classList.add('on');
        document.getElementById('pencil-canvas').classList.remove('on');
    }
    if(!isEraser){
        pencilOn();
    }
}

function pencilOn() {
    isEraser = false;
    document.getElementById('pencil-canvas').classList.add('on');
    document.getElementById('erase-canvas').classList.remove('on');
}

function init() {
    canvas = document.getElementById('draw-canvas');
    ctx = canvas.getContext('2d');
    resize();
    canvas.addEventListener('mouseenter', (e) => getCoordinates(e.clientX, e.clientY, e.target.getBoundingClientRect()));
    canvas.addEventListener('mousedown', (e) => getCoordinates(e.clientX, e.clientY, e.target.getBoundingClientRect()));
    canvas.addEventListener('mousemove', (e) => draw(e));
    canvas.addEventListener('touchstart', (e) => getCoordinates(e.clientX, e.clientY, e.target.getBoundingClientRect()));
    canvas.addEventListener('touchmove', (e) => draw(e));

    document.getElementById('border-radius').addEventListener('change', (e) => updateBorder(e.target.value));
    document.getElementById('border-color').addEventListener('change', (e) => updateColor(e.target.value));
    document.getElementById('clear-canvas').addEventListener('click', (e) => clearCanvas());
    document.getElementById('save-image').addEventListener('click', (e) => saveImage());
    document.getElementById('erase-canvas').addEventListener('click', (e) => eraserOn());
    document.getElementById('pencil-canvas').addEventListener('click', (e) => pencilOn());
}

init();