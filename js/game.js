let canvas;
let world;
let keyboard = new Keyboard();
let scoreManager = new ScoreManager();
let intervalIds = [];
let scores = [];
let username;
let audio_intro = new Audio("audio/startSound.mp3");
let audio_continue = new Audio("audio/sci_fi_door-6451.mp3");
let audio_click = new Audio("audio/game-ui-sounds-14857-02.mp3");
let audio_athmospehere = new Audio("audio/spaceship-ambience-with-effects-21420-01.mp3");
let mute = false;
let worldInitiated = false;

/**
 * Initializes game parameters and binds event listeners to the game canvas
 */
function init() {
  bindTouchBtns();
  initLevel();
  if (!document.getElementById('endScreenContainer').classList.contains('d-none')) {
    document.getElementById('endScreenContainer').classList.add('d-none');
  }
  canvas = document.getElementById("canvas");
  canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
  });

  canvas.addEventListener('touchend', function (e) {
    e.preventDefault();
  });
  world = new World(canvas, keyboard, function clearIntervals() {
    intervalIds.forEach(clearInterval);
  }, username, scoreManager, mute);

  if (window.innerWidth <= 900 &&
    document.getElementById('touchBtnContainer').classList.contains('d-none') && worldInitiated) {
    document.getElementById('touchBtnContainer').classList.remove('d-none');
    document.getElementById('header').classList.add('d-none');
  }
  worldInitiated = true;
}

/**
 * Checks if username input is empty, if so turns border color into red.
 * Otherwise executes loadGame function
 */
function checkAndLoadGame() {
  var usernameInput = document.getElementById('username').value;

  if (usernameInput.trim() !== "") {
    loadGame();
    document.getElementById('username').style.border = "3px solid white";
  } else {
    document.getElementById('username').style.border = "3px solid red";
  }
}

/**
 * Starts loading the game and initializes various game elements
 */
function loadGame() {
  worldInitiated = false;
  document.getElementById('buttonContainer').classList.add("d-none");
  document.getElementById('loading').classList.remove("d-none");
  document.getElementById('loadingInfo').classList.remove("d-none");
  document.getElementById('status').classList.remove("d-none");

  if (window.innerWidth <= 900) {
    document.getElementById('header').classList.add('d-none');
    document.getElementById('shopFooter').classList.add('d-none');
    document.getElementById('soundLinks').classList.add("d-none");
    document.getElementById('portfolioLink').classList.add("d-none");
  }
  playClickAudio();
  let animationPromise = new Promise(resolve => {
    setTimeout(() => {
      document.getElementById('loading').classList.add("d-none");
      document.getElementById('loadingInfo').classList.add("d-none");
      resolve();
    }, 6000);
  });

  let setUsernamePromise = Promise.resolve(setUsername());
  let initPromise = Promise.resolve(init());

  Promise.all([animationPromise, setUsernamePromise, initPromise])
    .then(() => {
      start();
    });
}

/**
 * Starts the game by changing the display of various elements and setting background image without neon platform
 */
function start() {
  if (window.innerWidth <= 900) {
    document.getElementById('touchBtnContainer').classList.remove('d-none');
    document.getElementById('progressBars').classList.add("d-none");
    document.getElementById("touchBtnMobileUpAndDown").classList.add("d-none");
  }
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('startContainer').classList.add('d-none');
  document.getElementById('progressBars').classList.remove("d-none");
  document.getElementById('healthStatus').classList.remove('d-none');
  document.getElementById('diamondsStatus').classList.remove('d-none');
  document.getElementById('throwingStarsStatus').classList.remove('d-none');
  document.getElementById('name').classList.add('d-none');
  document.body.style.backgroundImage = "url('img/space3upscale.png')";
  document.getElementById('shopContainer').classList.remove('d-none');
  document.getElementById('healthPotion').classList.add('grayscale');
  document.getElementById('flyItem').classList.add('grayscale');
}

/**
 * Plays the click audio effect if sound is not muted.
 */
function playClickAudio() {
  if (!mute) {
    audio_click.play();
  }
}

/**
 * Handles the class manipulation for mobile screen sizes.
 * @param {HTMLElement} hologramContainer - The HTML element representing the hologram container.
 */
function handleMobileHologram(hologramContainer) {
  if (!hologramContainer.classList.contains('controlsMobile')) {
    hologramContainer.classList.remove('shrinkHeight', 'd-none');
    hologramContainer.classList.add('controlsMobile');
  } else {
    hologramContainer.classList.remove('controlsMobile');
    hologramContainer.classList.add('d-none');
  }
}

/**
 * Handles the class manipulation for non-mobile (large) screen sizes.
 * @param {HTMLElement} hologramContainer - The HTML element representing the hologram container.
 */
function handleLargeScreenHologram(hologramContainer) {
  if (!hologramContainer.classList.contains('growHeight')) {
    hologramContainer.classList.remove('shrinkHeight', 'd-none');
    hologramContainer.classList.add('growHeight');
  } else {
    hologramContainer.classList.remove('growHeight');
    hologramContainer.classList.add('shrinkHeight');
  }
}

/**
 * Toggles hologram effect based on the screen size.
 * Plays the click audio effect if sound is not muted.
 * Modifies classes of the hologram container to show correct styling.
 */
function toggleHologram() {
  playClickAudio();

  let hologramContainer = document.getElementById('hologramContainer');

  if (window.innerWidth <= 900) {
    handleMobileHologram(hologramContainer);
  } else {
    handleLargeScreenHologram(hologramContainer);
  }
}

/**
 * Toggles game sound and changes the sound button's image accordingly
 */
function toggleSound() {
  mute = !mute;
  if (!mute) {
    audio_click.play();
    document.getElementById('soundBtn').src = "img/icons/speaker-32.png";
  }
  if (worldInitiated) {
    world.mute = !world.mute;
    if (world.mute) document.getElementById('soundBtn').src = "img/icons/mute-2-32.png";
  }
  if (mute) document.getElementById('soundBtn').src = "img/icons/mute-2-32.png";
}

/**
 * Changes the display of various elements when transitioning from the end screen to the menu
 */
function endScreenToMenu() {
  toggleGameElements();
  hideMenuElements();
  hideStatusBars();
}

/**
 * Hides certain elements and reveals others on the page by manipulating the 'd-none' class.
 */
function toggleGameElements() {
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('progressBars').classList.add('d-none');
  document.getElementById('endScreenText').classList.add('d-none');
  document.getElementById('score').classList.add('d-none');
  document.getElementById('endScreenContainer').classList.add('d-none');
  document.getElementById('buttonContainer').classList.remove('d-none');
  document.getElementById('startContainer').classList.remove('d-none');
  document.getElementById('playBtn').classList.remove('d-none');
  document.getElementById('leaderboardBtn').classList.remove('d-none');
  document.getElementById('name').classList.remove('d-none');
  document.getElementById('soundLinks').classList.remove("d-none");
  document.getElementById('portfolioLink').classList.remove("d-none");
}

/**
 * Hides several elements on the page by adding the 'd-none' class to each of them.
 */
function hideMenuElements() {
  document.getElementById('username').classList.add('d-none');
  document.getElementById('continueBtn').classList.add('d-none');
  document.getElementById('backBtnMenu').classList.add('d-none');
  document.getElementById('shopContainer').classList.add('d-none');
}

/**
 * Hides the status bars for health, diamonds, and throwing stars by adding 'd-none' class to each element.
 */
function hideStatusBars() {
  document.getElementById('healthStatus').classList.add('d-none');
  document.getElementById('diamondsStatus').classList.add('d-none');
  document.getElementById('throwingStarsStatus').classList.add('d-none');
  document.getElementById('status').classList.add('d-none');
}

/**
 * Changes the display of various elements when the play button is clicked
 */
function changeBtnsMenu() {
  playClickAudio();
  document.getElementById('username').classList.remove('d-none');
  document.getElementById('continueBtn').classList.remove('d-none');
  document.getElementById('backBtnMenu').classList.remove('d-none');
  document.getElementById('playBtn').classList.add('d-none');
  document.getElementById('leaderboardBtn').classList.add('d-none');
}

/**
 * Formats a leaderboard entry for display
 * @param {Object[]} scores - The list of score entries to format
 * @returns {string} HTML string representation of the scores
 */
function leaderboardTemplate(scores) {
  let template = "";
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    template += `
      <div class="scoreRow">
      <span class="name">${score.name}</span>
      <span class="score">${score.score}</span>
      </div>
      `;
  }
  return template;
}

/**
 * Opens leaderboard and fetches scores
 */
async function openLeaderboard() {
  playClickAudio();
  if (window.innerWidth <= 1500) {
    document.getElementById('name').classList.add('d-none');
  }
  document.getElementById('leaderboard').classList.remove('d-none');
  document.getElementById('playBtn').classList.add('d-none');
  document.getElementById('leaderboardBtn').classList.add('d-none');
  scores = await scoreManager.loadAndSortScores('scores');
  createLeaderboard();
}

/**
 * Changes the display of various elements when the 'back' button in the menu is clicked
 */
function backBtnMenu() {
  playClickAudio();
  document.getElementById('username').style.border = "3px solid white";
  document.getElementById('username').classList.add('d-none');
  document.getElementById('continueBtn').classList.add('d-none');
  document.getElementById('backBtnMenu').classList.add('d-none');
  document.getElementById('playBtn').classList.remove('d-none');
  document.getElementById('leaderboardBtn').classList.remove('d-none');
}

/**
 * Changes the display of various elements when the 'back' button in the leaderboard is clicked
 */
function backBtnLeaderboard() {
  playClickAudio();
  if (window.innerWidth <= 1500) {
    document.getElementById('name').classList.remove('d-none');
  }
  document.getElementById('leaderboard').classList.add('d-none');
  document.getElementById('backBtn').classList.add('d-none');
  document.getElementById('playBtn').classList.remove('d-none');
  document.getElementById('leaderboardBtn').classList.remove('d-none');
}

/**
 * Renders the leaderboard to the DOM
 */
function createLeaderboard() {
  let leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '<h1>Leaderboard</h1>' + leaderboardTemplate(scores) + '<span id="backBtn" onclick="backBtnLeaderboard()">Back</span>';
}

/**
 * Clears all intervals that are currently active
 */
function clearIntervals() {
  intervalIds.forEach(clearInterval);
};

/**
 * Sets a stoppable interval. The interval ID is stored so it can be cleared later.
 * @param {function} fn - The function to run on each interval
 * @param {number} time - The interval time in milliseconds
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Toggles display of the controls
 */
function openControls() {
  if (document.getElementById("instructions").classList.contains("d-none")) {
    document.getElementById("instructions").classList.remove("d-none");
  } else {
    document.getElementById("instructions").classList.add("d-none");
  }
}

/**
 * Hides the controls
 */
function closeControls() {
  document.getElementById("instructions").classList.add("d-none");
}

/**
 * Removes various classes from elements when the game starts
 */
function removeClasses() {
  document.getElementById("startScreenContainer").style.display = "none";
  document.getElementById("endScreenContainer").style.display = "none";
  document.getElementById("fullscreenBtn").classList.remove("d-none");
  document.getElementById("btn-left").classList.remove("d-none");
  document.getElementById("btn-right").classList.remove("d-none");
  document.getElementById("btn-jump").classList.remove("d-none");
  document.getElementById("btn-throw").classList.remove("d-none");
}

/**
 * Sets the username for the game from the input field
 */
function setUsername() {
  username = "";
  username = document.getElementById('username').value;
}

/**
 * Binds touch event listeners to the touch buttons for mobile screens
 */
function bindTouchBtns() {
  document.getElementById("btn-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.left = true;
  });

  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.left = false;
  });

  document.getElementById("btn-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.right = true;
  });

  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.right = false;
  });

  document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.space = true;
  });

  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.space = false;
  });

  document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.d = true;
  });

  document.getElementById("btn-throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.d = false;
  });

  document.getElementById("btn-heal").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.q = true;
  });

  document.getElementById("btn-heal").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.q = false;
  });

  document.getElementById("btn-fly").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.f = !keyboard.f;
    keyboard.flipF = true;
  });

  document.getElementById("btn-fly").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.flipF = false;
  });

  document.getElementById("btn-attack").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.e = true;
  });

  document.getElementById("btn-attack").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.e = false;
  });

  document.getElementById("btn-up").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.up = true;
  });

  document.getElementById("btn-up").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.up = false;
  });

  document.getElementById("btn-down").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.down = true;
  });

  document.getElementById("btn-down").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.down = false;
  });
}


window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    keyboard.left = true;
  }
  if (event.keyCode == 38) {
    keyboard.up = true;
  }
  if (event.keyCode == 39) {
    keyboard.right = true;
  }
  if (event.keyCode == 40) {
    keyboard.down = true;
  }
  if (event.keyCode == 32) {
    keyboard.space = true;
  }
  if (event.keyCode == 68) {
    keyboard.d = true;
  }
  if (event.keyCode == 69) {
    keyboard.e = true;
  }
  if (event.keyCode == 16) {
    keyboard.shift = true;
  }
  if (event.keyCode == 70 && !keyboard.flipF && world.character.collectedCoins >= 5) {
    keyboard.f = !keyboard.f;
    keyboard.flipF = true;
  }
  if (event.keyCode == 81) {
    keyboard.q = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) {
    keyboard.left = false;
  }
  if (event.keyCode == 38) {
    keyboard.up = false;
  }
  if (event.keyCode == 39) {
    keyboard.right = false;
  }
  if (event.keyCode == 40) {
    keyboard.down = false;
  }
  if (event.keyCode == 32) {
    keyboard.space = false;
  }
  if (event.keyCode == 68) {
    keyboard.d = false;
  }
  if (event.keyCode == 69) {
    keyboard.e = false;
  }
  if (event.keyCode == 16) {
    keyboard.shift = false;
  }
  if (event.keyCode == 70) {
    keyboard.flipF = false;
  }
  if (event.keyCode == 81) {
    keyboard.q = false;
  }
});

