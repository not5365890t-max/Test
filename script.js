// script.js

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 360;

ctx.imageSmoothingEnabled = false;

// ======================
// プレイヤー画像
// ======================

const playerImage = new Image();
playerImage.src = "assets/player.png";

// ======================
// 背景画像
// ======================

const roomImage = new Image();

// ======================
// 鍵画像
// ======================

const keyImage = new Image();
keyImage.src = "assets/key.png";

// ======================
// キー入力
// ======================

const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// ======================
// プレイヤー
// ======================

const player = {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  speed: 2
};

// ======================
// 部屋データ
// ======================

let roomData = null;

// ======================
// 部屋読み込み
// ======================

async function loadRoom() {

  const response = await fetch("scenes/room1.json");

  roomData = await response.json();

  roomImage.src = roomData.background;

  player.x = roomData.playerSpawn.x;
  player.y = roomData.playerSpawn.y;
}

loadRoom();

// ======================
// 更新
// ======================

function update() {

  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;
}

// ======================
// 描画
// ======================

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景
  if (roomImage.complete) {
    ctx.drawImage(roomImage, 0, 0, canvas.width, canvas.height);
  }

  // 鍵
  if (roomData) {

    roomData.objects.forEach(obj => {

      if (obj.type === "key") {

        ctx.drawImage(
          keyImage,
          obj.x,
          obj.y,
          32,
          32
        );
      }
    });
  }

  // プレイヤー
  ctx.drawImage(
    playerImage,
    player.x,
    player.y,
    player.width,
    player.height
  );
}

// ======================
// ゲームループ
// ======================

function gameLoop() {

  update();

  draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();