const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerImg = new Image();
playerImg.src = "assets/player.png";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  width: 60,
  height: 60,
  speed: 8
};

// Game Data
let bullets = [];
let enemies = [];
let explosions = [];
let score = 0;
let health = 3;

// Touch Control
canvas.addEventListener("touchmove", (e) => {
  player.x = e.touches[0].clientX - player.width / 2;

  if (player.x < 0) player.x = 0;
  if (player.x > canvas.width - player.width)
    player.x = canvas.width - player.width;
});

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
}, 1000);function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  bullets.forEach((bullet, bIndex) => {
    bullet.y -= bullet.speed;

    ctx.fillStyle = "yellow";
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    if (bullet.y < -20) {
      bullets.splice(bIndex, 1);
    }
  });
}

function drawEnemies() {
  enemies.forEach((enemy, eIndex) => {

    enemy.y += enemy.speed;

    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // Enemy screen ke niche gaya
    if (enemy.y > canvas.height) {
      enemies.splice(eIndex, 1);
      health--;

      if (health <= 0) {
        alert("Game Over!\nScore: " + score);
        location.reload();
      }
    }

    bullets.forEach((bullet, bIndex) => {

      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {

        explosions.push({
          x: enemy.x,
          y: enemy.y,
          size: 20,
          life: 20
        });

        enemies.splice(eIndex, 1);
        bullets.splice(bIndex, 1);

        score += 10;
      }

    });

  });
}function drawExplosions() {
  explosions.forEach((exp, index) => {
    ctx.beginPath();
    ctx.arc(exp.x + 20, exp.y + 20, exp.size, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();

    exp.size += 1;
    exp.life--;

    if (exp.life <= 0) {
      explosions.splice(index, 1);
    }
  });
}

function drawHUD() {
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText("Score: " + score, 20, 40);

  ctx.fillStyle = "lime";
  ctx.fillText("Health: " + health, 20, 75);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer(function drawPlayer() {
  ctx.drawImage(
    playerImg,
    player.x,
    player.y,
    player.width,
    player.height
  );
                 });
  drawBullets();
  drawEnemies();
  drawExplosions();
  drawHUD();

  requestAnimationFrame(gameLoop);
}

gameLoop();
