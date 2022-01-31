const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const increaseBtn = document.getElementById('increase') as HTMLButtonElement;
const decreaseBtn = document.getElementById('decrease') as HTMLButtonElement;
const colorEl = document.getElementById('color') as HTMLInputElement;
const sizeEl = document.getElementById('size') as HTMLSpanElement;
const clearEl = document.getElementById('clear') as HTMLButtonElement;
const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color = 'black';
let x: number | undefined;
let y: number | undefined;

function drawCircle(cx: number, cy: number) {
  ctx!.beginPath();
  ctx!.arc(cx, cy, size, 0, Math.PI * 2);
  ctx!.fillStyle = color;
  ctx!.fill();
}

function drawLine(x1: number, y1: number, x2: number, y2: number) {
  ctx!.beginPath();
  ctx!.moveTo(x1, y1);
  ctx!.lineTo(x2, y2);
  ctx!.strokeStyle = color;
  ctx!.lineWidth = size * 2;
  ctx!.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerText = size.toString();
}

canvas.addEventListener('mousedown', (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

colorEl.addEventListener('change', (e) => {
  color = (e.target as HTMLInputElement).value;

  return color;
});

increaseBtn.addEventListener('click', () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});

clearEl.addEventListener('click', () =>
  ctx!.clearRect(0, 0, canvas.width, canvas.height)
);
