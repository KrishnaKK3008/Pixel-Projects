const shipImage = 'https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png';
const waterImage = 'https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp';
let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#resetButton');
let shipCount = 0;
let totalClicks = 0;

function generateRandomShips() {
    let randomIndices = [];
    while (randomIndices.length < 5) {
        let temp = Math.floor(Math.random() * 16);
        if (!randomIndices.includes(temp)) {
            randomIndices.push(temp);
        }
    }
    boxes.forEach((box, idx) => {
        if (randomIndices.includes(idx)) {
            box.dataset.ship = true;
        } else {
            box.dataset.ship = false;
        }
        box.style.backgroundImage = 'none';
    });
}
function handleBoxClick(event) {
    const box = event.target;
    totalClicks++;
    console.log(`Total clicks: ${totalClicks}`);
    if (totalClicks > 8) {
        alert(`You exceeded max clicks. Game over!`);
        boxes.forEach((box) => {
            if (box.dataset.ship === 'true') {
                box.style.backgroundImage = `url(${shipImage})`;
            } else {
                box.style.backgroundImage = `url(${waterImage})`;
            }
        });
        boxes.forEach(box => box.removeEventListener('click', handleBoxClick));
        return;
    }
    if (box.dataset.ship === 'true') {
        box.style.backgroundImage = `url(${shipImage})`;
        shipCount++;
        if (shipCount === 5 && totalClicks <= 8) {
            alert('Congratulations! You won!');
            boxes.forEach(box => box.removeEventListener('click', handleBoxClick));
        }
    } else {
        box.style.backgroundImage = `url(${waterImage})`;
    }
    box.removeEventListener('click', handleBoxClick);
}
function resetGame() {
    boxes.forEach(box => {
        box.style.backgroundImage = 'none';
        box.addEventListener('click', handleBoxClick);
    });
    shipCount = 0;
    totalClicks = 0;
    generateRandomShips();
}
boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);
generateRandomShips(); 
