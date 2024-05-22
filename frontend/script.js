const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const onFail = new Event("onfail");

const myBird = new Image();
const enemyBird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

myBird.src = "img/myBird.png";
enemyBird.src = "img/myBird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

const gravity = 1;
let fallSpeed = 0;
let jumpSpeed = 0;

let xPos;
let yPos;

let enemyXPos;
let enemyYPos;
let enemyFallSpeed = 0;
let enemyJumpSpeed = 0;

let pipes = [];

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipes.length; i++) {
    ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + 120);

    if (pipes[i].x === -1 * pipeUp.width) {
      pipes[i].x = bg.width + 300;
      pipes[i].y = -1 * Math.floor(Math.random() * 100);
    }

    if (
      ((yPos < pipes[i].y + pipeUp.height || yPos + myBird.height > pipes[i].y + pipeUp.height + 120) &&
        (xPos + myBird.width > pipes[i].x && xPos < pipes[i].x + pipeUp.width)) ||
      (myBird.height + yPos > canvas.height - fg.height)
    ) {
      return document.dispatchEvent(onFail);
    }

    if (
      ((enemyYPos < pipes[i].y + pipeUp.height || enemyYPos + enemyBird.height > pipes[i].y + pipeUp.height + 120) &&
        (enemyXPos + enemyBird.width > pipes[i].x && enemyXPos < pipes[i].x + pipeUp.width)) ||
      (myBird.height + enemyYPos > canvas.height - fg.height)
    ) {
      return;
    }

    pipes[i].x -= 1;
  }

  ctx.drawImage(myBird, xPos, yPos);
  ctx.drawImage(enemyBird, enemyXPos, enemyYPos);

  ctx.drawImage(fg, 0, canvas.height - fg.height);

  if (fallSpeed < 3) {
    fallSpeed++;
  }

  yPos += fallSpeed + gravity;
  enemyYPos += fallSpeed + gravity;
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", moveUp);

function moveUp() {
  jumping();
  jumpSpeed = 0;
  fallSpeed = 0;
}

function enemyMoveUp() {
  enemyJumping();
  enemyJumpSpeed = 0;
  enemyFallSpeed = 0;
}

function jumping() {
  if (jumpSpeed < 20) {
    jumpSpeed += 2;
    yPos -= jumpSpeed;
    requestAnimationFrame(jumping);
  } else {
    jumpSpeed = 0;
    fallSpeed = 0;
  }
}

function enemyJumping() {
  if (enemyJumpSpeed < 20) {
    enemyJumpSpeed += 2;
    enemyYPos -= enemyJumpSpeed;
    requestAnimationFrame(enemyJumping);
  } else {
    enemyJumpSpeed = 0;
    enemyFallSpeed = 0;
  }
}

function onStart() {
  xPos = 50;
  yPos = 150;

  enemyXPos = 50;
  enemyYPos = 150;

  pipes = [
    {
      x: 180,
      y: 0,
    },
    {
      x: 320,
      y: 0,
    },
    {
      x: 420,
      y: 0,
    },
    {
      x: 520,
      y: 0,
    },
  ];
  draw();
}

document.addEventListener("onfail", function() {
  showScene(startScene);
  hideScene(searchScene);
});