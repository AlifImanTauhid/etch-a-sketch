const grid = 560;
let rows = 16
let cols = 16;

const container = document.querySelector('.container');
const sliderContainer = document.querySelector('.sliderContainer');
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.value');

container.style.height = container.style.width = `${grid}px`;
sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;


let color = "black"
let isSketching = false;

function setBackgroundColor(e) {
    if (e.type === "mousedown") {
        isSketching = true;
        e.target.style.backgroundColor = "black";
        e.target.style.backgroundColor = color === "random" ? `hsl(${Math.random() * 360}, 100%, 60%)` : color;
    } else if (e.type === "mouseover" && isSketching) {
        e.target.style.backgroundColor = 'black';
        e.target.style.backgroundColor = color === "random" ? `hsl(${Math.random() * 360}, 100%, 60%)` : color;
    } else isSketching = false;
}

function setRandom(colorChoice) {
    color = colorChoice;
}

function reset() {
    const cells = document.querySelectorAll('div');
    cells.forEach(e => {
        e.style.backgroundColor = "white";
    });
}

function createGridCells(squareSide) {
    const square = (squareSide * squareSide);
    const widhtAndHeight = `${(grid / squareSide) - 2}px`;

    for (let i = 0; i < square; i++) {
        const gridCell = document.createElement("div");
        gridCell.style.width = gridCell.style.height = widhtAndHeight;
        gridCell.classList.add('cell');

        container.appendChild(gridCell);
        gridCell.addEventListener("mousedown", (e) => setBackgroundColor(e));
        gridCell.addEventListener("mouseover", (e) => setBackgroundColor(e));
        gridCell.addEventListener("mouseup", (e) => setBackgroundColor(e));

        gridCell.addEventListener("dragstart", (e) => e.preventDefault());
    }
}

function deleteGridCells() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

slider.oninput = function () {
    let text = `${this.value} x ${this.value} (Resolution)`;
    sliderValue.innerHTML = text;

    deleteGridCells();
    createGridCells(this.value);
}

createGridCells(16);