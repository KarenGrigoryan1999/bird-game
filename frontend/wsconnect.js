let socket = io.connect('http://localhost:8080');

socket.on("onGamerFly",function (data) {
  enemyJumping();
});

socket.on("onGamerFall",function (data) {
  showScene(startScene);
  alert('Ваш соперник ударился!');
});

socket.on("startGame",function (data) {
  searchScene.style.display = "none";
  onStart();
});

function onStartClick() {
  showScene(searchScene);
  hideScene(startScene);
  socket.emit('findGamer');
}

document.addEventListener("onfail", function() {
  socket.emit('onFall');
});

document.addEventListener("keydown", () => socket.emit('onFly'));