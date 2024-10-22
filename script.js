/** @type {HTMLCanvasElement} */ 
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Dynamically set canvas width and height based on screen size
const CANVAS_WIDTH = canvas.width = Math.min(500, window.innerWidth);
const CANVAS_HEIGHT = canvas.height = Math.min(1000, window.innerHeight);

let gameCount = 1000;
let enemiesArray = [];
let gameSpeed = 1;
let contained = true;  // Variable to track if enemies are contained

////////////////////////////////////////////////////////////
// Checkbox for containing enemies
const sliderContained = document.getElementById("sliderContained");
sliderContained.checked = contained;

sliderContained.addEventListener("change", function(e){
    contained = e.target.checked;
});
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Slider for game speed
const sliderSpeed = document.getElementById("sliderSpeed");
sliderSpeed.value = gameSpeed;

const showGameSpeed = document.getElementById("gameSpeed");
showGameSpeed.innerHTML = gameSpeed;

sliderSpeed.addEventListener("input", function(e){
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
});
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Slider for enemy count
const sliderCount = document.getElementById("sliderCount");
sliderCount.value = gameCount;

const showGameCount = document.getElementById("gameCount");
showGameCount.innerHTML = gameCount;

sliderCount.addEventListener("input", function(e) {
    gameCount = parseInt(e.target.value);  // Parse to integer
    showGameCount.innerHTML = gameCount;

    // Regenerate the enemies array based on the new count
    enemiesArray = [];
    for (let i = 0; i < gameCount; i++) {
        enemiesArray.push(new Enemy());
    }
});
////////////////////////////////////////////////////////////

class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() * 10 - 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
        this.speedY = (Math.random() * 10 - 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
        this.height = 1;
        this.width = 1;
    }

    update() {
        this.x += this.speedX * gameSpeed;
        this.y += this.speedY * gameSpeed;

        // Apply boundary conditions only if "contained" is true
        if (contained) {
            if (this.x + this.width < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y + this.height < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
    }

    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// Initial population of enemies
for (let i = 0; i < gameCount; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemiesArray.forEach(object => {
        object.update();
        object.draw();
    });

    requestAnimationFrame(animate);
}

animate();
