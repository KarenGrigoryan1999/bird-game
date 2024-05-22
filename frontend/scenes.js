const startScene = document.getElementById('start-scene');
const searchScene = document.getElementById('search-scene');

function showScene(scene) {
  scene.classList.remove('scene--hidden');
  scene.classList.add('scene--showed');
}

function hideScene(scene) {
  scene.classList.add('scene--hidden');
  scene.classList.remove('scene--showed');
}