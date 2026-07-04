let explosions = [];const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 8
};

function drawPlayer(){
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPlayer();
    requestAnimationFrame(update);
}

update();

canvas.addEventListener("touchmove",(e)=>{
    player.x = e.touches[0].clientX - player.width/2;
});
// Bullets
let bullets = [];
let enemies = [];
let score = 0;

// Auto Fire
setInterval(() => {
    bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 15,
        speed: 10
    });
}, 250);

// Enemy Spawn
setInterval(() => {
    enemies.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        speed: 3
    });
}, 1000);

// Draw & Update
function gameObjects() {

    bullets.forEach((bullet, bIndex) => {
        bullet.y -= bullet.speed;
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.y < 0) bullets.splice(bIndex, 1);
    });
ctx.fillStyle = "lime";
ctx.font = "25px Arial";
ctx.fillText("Health : " + health, 20, 70);
    enemies.forEach((enemy, eIndex// Enemy screen ke niche chala gaya
if (enemy.y > canvas.height) {
    enemies.splice(eIndex, 1);
    health--;
explosions.forEach((exp, index) => {
    ctx.beginPath();
    ctx.arc(exp.x + 20, exp.y + 20, exp.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();

    exp.life--;
    exp.size += 1;

    if (exp.life <= 0) {
        explosions.splice(index, 1);
    }
});
    if (health <= 0) {
        alert("Game Over!\nScore: " + score);
        location.reload();
    }
      }) => {
        enemy.y += enemy.speed;
        ctx.fillStyle = "red";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        bullets.forEach((bullet, bIndex) => {

            if (if (
    bullet.x < enemy.x + enemy.width &&
    bullet.x + bullet.width > enemy.x &&
    bullet.y < enemy.y + enemy.height &&
    bullet.y + bullet.height > enemy.y
) {
    explosions.push({
        x: enemy.x,
        y: enemy.y,
        size: 40,
        life: 20
    });

    enemies.splice(eIndex, 1);
    bullets.splice(bIndex, 1);
    score += 10;
}
                
            ) {
                enemies.splice(eIndex, 1);
                bullets.splice(bIndex, 1);
                score += 10;
            }

        });

    });

    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("Score : " + score, 20, 40);
}let health = 3;
