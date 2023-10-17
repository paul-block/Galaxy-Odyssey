class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  camera_y = 20;
  levelSize = 100;
  Diamonds = new Diamonds();
  Health = new Health();
  ThrowingStars = new ThrowingStars();
  Score = new Score();
  ExtraPoints = new ExtraPoints();
  showExtraPoints = false;
  doAnimation = true;
  clearIntervals;
  collectedDiamondsStorage = [];
  collectedThrowingStars = [];
  droppedBombs = [];
  bullets = [];
  superBullets = [];
  characterIsFlying = false;
  shootingAnimationFlying = [];
  scaleChange = 0.005;
  scale = 1;
  scoreManager;
  username;
  mute;

  /**
   * Sets up the game with necessary elements and states.
   * @param {HTMLCanvasElement} canvas - The canvas on which the game is drawn.
   * @param {Object} keyboard - Tracks user keyboard inputs for game interaction.
   * @param {Function} clearIntervals - Function to stop all time-dependent operations when needed.
   * @param {string} username - The username of the player.
   * @param {Object} scoreManager - Manages the score updates and displays during the game.
   * @param {boolean} mute - Flag to control the game sound.
   */
  constructor(canvas, keyboard, clearIntervals, username, scoreManager, mute) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.clearIntervals = clearIntervals;
    this.username = username;
    this.scoreManager = scoreManager;
    this.mute = mute;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Main game loop. Executes every 50ms, triggering necessary checks and actions like collision detections, 
   * enemy interactions, item collections, and game state evaluations.
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkCollisionPlatform();
      this.flyingEnemyDropBomb();
      this.checkCollissionBombs();
      this.checkOnTopOfEnemy();
      this.checkCollectingCoins();
      this.checkCollectingThrowingStars();
      this.checkThrow();
      this.swordAttack();
      this.checkThrowingStarCollisionWithEnemies();
      this.shootFlyMode();
      this.checkEnemyCollisionBullets();
      this.stopGame();
      this.checkBgMusic();
    }, 50);
  }

  /**
   * Handles the collision between the character and an enemy. 
   * Checks if the character can collide and if they're actually colliding.
   * Applies damage to the character and adjusts game state accordingly.
   * @param {Object} enemy - The enemy object with which collision is checked.
   */
  handleCollisionWithEnemy(enemy) {
    if (this.characterCanCollide(enemy)) {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
      }
      if (!this.mute) {
        this.character.audio_hurt.play();
      }
      this.displayHurtCanvas();
      this.Score.minusScore(5);
      this.playHurtSound();
      this.Health.score = this.character.energy;
    }
  }

  /**
   * Checks for any collisions between the character and enemies (grounded or flying). 
   * If collision occurs, character gets hit and loses points.
   */
  checkCollisions() {
    if (this.character.isFlying) {
      this.level.flyingEnemiesWave.forEach(this.handleCollisionWithEnemy.bind(this));
    } else {
      this.level.enemies.forEach(this.handleCollisionWithEnemy.bind(this));
      this.level.flyingEnemies.forEach(this.handleCollisionWithEnemy.bind(this));
    }
  }

  /**
   * Checks for a collision between the character and a platform. 
   * If a collision occurs and the character isn't jumping or flying, 
   * it adjusts the character's position to the top of the platform.
   * @param {Array} platforms - Array of platform objects.
   * @param {number} positionY - Y position to place the character on after collision.
   */
  checkPlatformCollision(platforms, positionY) {
    const jumpCooldown = .35;
    const currentTime = Date.now() / 1000;

    platforms.forEach((platform) => {
      if (this.character.isColliding(platform) && !this.keyboard.space && !this.character.isFlying && currentTime - this.character.jumpStartTime > jumpCooldown) {
        this.character.isOnPlatform = true;
        this.character.y = positionY;
      }
    });
  }

  /**
   * Checks if the character is colliding with any platforms in the game. 
   * If yes, adjusts the character's position to keep it on the platform.
   */
  checkCollisionPlatform() {
    if (!this.character.isFlying || this.character.landing) {
      this.character.isOnPlatform = false;

      this.checkPlatformCollision(this.level.platforms1, 277);
      this.checkPlatformCollision(this.level.platforms2, 118);
      this.checkPlatformCollision(this.level.platforms3, -42);
    }
  }

  /**
   * Controls the bomb dropping behaviour of flying enemies. Creates new bombs and manages their lifecycle.
   */
  flyingEnemyDropBomb() {
    this.level.flyingEnemies.forEach((enemy) => {
      if (enemy.drop) {
        enemy.playAnimation(enemy.images_attack);
        let bomb = new Bomb(
          enemy.x + 100,
          enemy.y + 100
        );
        this.droppedBombs.push(bomb);
        setTimeout(() => {
          this.droppedBombs.splice(bomb, 1);
          if (!this.character.isFlying && !this.mute)
            this.character.audio_enemyHit.play();
        }, 1000);
      }
    });
  }

  /**
  * Checks for any collisions between the character or enemies and the dropped bombs.
  * If there is a collision, respective damage is applied.
  */
  checkCollissionBombs() {
    if (!this.character.isFlying) {
      this.droppedBombs.forEach((bomb) => {
        this.checkCharacterBombCollision(bomb);
        this.checkEnemiesBombCollision(bomb);
      });
    }
  }

  /**
  * Checks for a collision between the character and a bomb. 
  * If a collision occurs, it applies damage to the character.
  * @param {Object} bomb - The bomb object with which collision is checked.
  */
  checkCharacterBombCollision(bomb) {
    if (this.character.isColliding(bomb)) {
      this.character.hit();
      if (!this.mute) {
        this.character.audio_hurt.play();
      }
      this.Health.score = this.character.energy;
    }
  }

  /**
  * Checks for a collision between enemies and a bomb. 
  * If a collision occurs, it applies damage to the enemy and removes it if necessary.
  * @param {Object} bomb - The bomb object with which collision is checked.
  */
  checkEnemiesBombCollision(bomb) {
    let deadEnemies = [];
    this.level.enemies.forEach((enemy) => {
      if (enemy.isColliding(bomb)) {
        enemy.hitted = true;
        enemy.hp -= 10;
        if (enemy.hp <= 0 && !enemy.dead) {
          enemy.dead = true;
          enemy.playAnimation(enemy.image_dead);
          deadEnemies.push(enemy);
        }
      }
    });
    this.removeDeadEnemies(deadEnemies);
  }

  /**
  * Removes the dead enemies from the enemies array.
  * @param {Array} deadEnemies - Array of dead enemy objects to be removed.
  */
  removeDeadEnemies(deadEnemies) {
    deadEnemies.forEach((deadEnemy) => {
      let deadEnemyIndex = this.level.enemies.indexOf(deadEnemy);
      if (deadEnemyIndex !== -1) {
        this.level.enemies.splice(deadEnemyIndex, 1);
      }
    });
  }

  /**
  * Schedules the removal of enemy objects from an array after a certain delay.
  * @param {Array} enemiesToRemove - Array of enemy objects to be removed.
  * @param {Array} enemiesArray - The array from which the enemies should be removed.
  * @param {number} delay - Time in milliseconds after which the enemies should be removed.
  */
  removeEnemiesAfterDelay(enemiesToRemove, enemiesArray, delay) {
    enemiesToRemove.forEach(enemy => {
      setTimeout(() => {
        const index = enemiesArray.indexOf(enemy);
        if (index > -1) {
          enemiesArray.splice(index, 1);
        }
      }, delay);
    });
  }

  /**
   * Checks if the character is on top of an enemy. If yes, it handles enemy defeat and score update.
   */
  checkOnTopOfEnemy() {
    if (!this.character.isFlying) {
      let enemiesToRemove = this.handleOnTopAttack(this.level.enemies, 10);
      let flyingEnemiesToRemove = this.handleOnTopAttack(this.level.flyingEnemies, 20);

      this.removeEnemiesAfterDelay(enemiesToRemove, this.level.enemies, 1000);
      this.removeEnemiesAfterDelay(flyingEnemiesToRemove, this.level.flyingEnemies, 1000);
    }
  }

  /**
  * Checks if the character is on top of any enemy and applies damage to the enemy accordingly. 
  * Handles enemy defeat and schedules enemy removal.
  * @param {Array} enemies - Array of enemy objects to be checked.
  * @param {number} score - Score to add when an enemy is defeated.
  */
  handleOnTopAttack(enemies, score = 10) {
    let enemiesToRemove = [];

    enemies.forEach((enemy) => {
      const now = Date.now();
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() && this.character.speedY < 0 &&
        !enemy.dead && (!enemy.hitTimestamp || now - enemy.hitTimestamp >= 150)
      ) {
        if (!enemy.hitTimestamp) {
          enemy.hitTimestamp = now;
        }
        enemy.hitted = true;
        enemy.hp = 0;
        enemy.dead = true;
        if (enemy.hp === 0) {
          enemiesToRemove.push(enemy);
          if (!this.mute) {
            enemy.audio_hitted.play();
          }
          this.Score.addScore(score);
          if (this.character.speedY <= 20) {
            this.character.speedY = 20;

          }
        }
      }
    });

    return enemiesToRemove;
  }

  /**
   * Handles the collection of items, updates scores, and removes collected items from the game.
   * @param {Array} collection - The array of item objects to be collected.
   * @param {string} scoreObject - The score type to be updated.
   * @param {string} scoreIncrement - The property name to be incremented on character object.
   * @param {Object} audio - The audio object to be played when an item is collected.
   */
  collectItems(collection, scoreObject, scoreIncrement, audio) {
    let itemsToRemove = [];
    collection.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        if (!this.mute) {
          this.character.audio_collectDiamond.play();
        }
        this.character[scoreIncrement]++;
        this[scoreObject].score = this.character[scoreIncrement];
        itemsToRemove.push(index);

        if (scoreIncrement === 'collectedCoins') {
          this.updateProgressBarHealthPotion.call(this);
          this.updateProgressBarFlymode.call(this);
        }
      }
    });
    for (let i = itemsToRemove.length - 1; i >= 0; i--) {
      collection.splice(itemsToRemove[i], 1);
    }
  }

  /**
   * Updates the health potion progress bar based on the collected coins.
   */
  updateProgressBarHealthPotion() {
    const progressBar = document.getElementById('diamondsProgress');
    const rawPercentage = (this.character['collectedCoins'] / 3) * 100;
    const percentage = Math.min(rawPercentage, 100);

    progressBar.style.width = `${percentage}%`;
  }

  /**
  * Updates the flymode progress bar based on the collected coins.
  */
  updateProgressBarFlymode() {
    const progressBar = document.getElementById('diamondsProgressFlymode');
    const rawPercentage = (this.character['collectedCoins'] / 5) * 100;
    const percentage = Math.min(rawPercentage, 100);

    progressBar.style.width = `${percentage}%`;
  }

  /**
  * Checks if the character is collecting any coins. If yes, updates the score and progress bars.
  */
  checkCollectingCoins() {
    if (!this.character.isFlying) {
      this.collectItems(
        this.level.coins,
        "Diamonds",
        "collectedCoins",
        this.character.audio_collectDiamond
      );
    }
  }

  /**
  * Checks if the character is collecting any throwing stars. If yes, updates the score.
  */
  checkCollectingThrowingStars() {
    if (!this.character.isFlying) {
      this.collectItems(
        this.level.collectableThrowingStars,
        "ThrowingStars",
        "collectedThrowingStars",
        this.character.audio_collectCoin
      );
    }
  }

  /**
   * If the character has collected throwing stars, this function allows the character to throw them.
   */
  checkThrow() {
    if (this.keyboard.d && this.character.collectedThrowingStars > 0 && this.character.timepassed()) {
      let direction = 'right';
      if (this.character.otherDirection) {
        direction = 'left';
      }
      let star = new AttackThrowingStar(
        this.character.x + 120,
        this.character.y + 100,
        direction
      );
      this.collectedThrowingStars.push(star);
      this.character.collectedThrowingStars--;
      this.ThrowingStars.score = this.character.collectedThrowingStars;
    }

  }

  /**
   * Handles the sword attack towards both grounded and flying enemies and removes them after a delay.
   */
  swordAttack() {
    let enemiesToRemove = this.handleEnemiesAttack(this.level.enemies);
    let flyingEnemiesToRemove = this.handleEnemiesAttack(this.level.flyingEnemies, 30);

    this.removeEnemiesAfterDelay(enemiesToRemove, this.level.enemies, 750);
    this.removeEnemiesAfterDelay(flyingEnemiesToRemove, this.level.flyingEnemies, 2000);
  }

  /**
  * Checks if the character has initiated an attack and applies damage to the enemy accordingly. 
  * Handles enemy defeat and schedules enemy removal.
  * @param {Array} enemies - Array of enemy objects to be checked.
  * @param {number} score - Score to add when an enemy is defeated.
  */
  handleEnemiesAttack(enemies, score = 10) {
    let enemiesToRemove = [];

    enemies.forEach((enemy) => {
      const now = Date.now();
      if (this.character.isColliding(enemy) && this.character.attack() && !enemy.dead && (!enemy.hitTimestamp || now - enemy.hitTimestamp >= 150)) {
        if (!enemy.hitTimestamp) {
          enemy.hitTimestamp = now;
        }
        enemy.hitted = true;
        enemy.hp -= 10;
        if (enemy.hp <= 0) {
          enemy.dead = true;
          if (!this.mute) {
            enemy.audio_hitted.play();
          }
          this.Score.addScore(score);
          enemiesToRemove.push(enemy);
        }
      }
    });

    return enemiesToRemove;
  }

  /**
  * Checks for collisions between throwing stars and enemies, handles the damage inflicted and removes dead enemies and used stars.
  */
  checkThrowingStarCollisionWithEnemies() {
    let starsToRemove = [];
    let enemiesToRemove = [];

    this.collectedThrowingStars.forEach((star, starIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (star.isColliding(enemy) && !enemy.dead) {
          enemy.hitted = true;
          enemy.hp -= 10;
          starsToRemove.push(starIndex);
          if (enemy.hp == 0) {
            this.level.enemies[enemyIndex].dead = true;
            if (!this.mute) {
              enemy.audio_hitted.play();
            }
            enemiesToRemove.push(enemyIndex);
          }
        }
      });

      this.level.flyingEnemies.forEach((enemy, enemyIndex) => {
        if (star.isColliding(enemy) && !enemy.dead) {
          enemy.hitted = true;
          enemy.hp -= 10;
          starsToRemove.push(starIndex);
          if (enemy.hp == 0) {
            this.level.flyingEnemies[enemyIndex].dead = true;
            if (!this.mute) {
              enemy.audio_hitted.play();
            }
            enemiesToRemove.push(enemyIndex);
          }
        }
      });
    });

    starsToRemove.sort((a, b) => b - a).forEach(starIndex => this.collectedThrowingStars.splice(starIndex, 1));
    enemiesToRemove.sort((a, b) => b - a).forEach(enemyIndex => this.level.enemies.splice(enemyIndex, 1));
  }

  /**
   * Adds shooting animations to the 'shootingAnimationFlying' array and removes them after a small delay.
   * @param {Object} shoot - The first shooting animation to be handled.
   * @param {Object} shoot2 - The second shooting animation to be handled.
   */
  handleShootAnimations(shoot, shoot2) {
    this.shootingAnimationFlying.push(shoot, shoot2);

    setTimeout(() => {
      let shootIndex = this.shootingAnimationFlying.indexOf(shoot);
      if (shootIndex !== -1) {
        this.shootingAnimationFlying.splice(shootIndex, 2);
      }
    }, 10);
  }

  /**
  * This function handles shooting while the character is in flying mode.
  */
  shootFlyMode() {
    if (this.characterIsFlying && this.keyboard.space && this.character.machineGunTimepassed()) {

      let shoot = new ShootAnimation(this.character.x + 162, this.character.y + 155);
      let shoot2 = new ShootAnimation(this.character.x + 130, this.character.y + 156);

      this.handleShootAnimations(shoot, shoot2);

      if (this.character.superBullet) {
        let superBullet = new Bullet(this.character.x + 165, this.character.y + 163);
        this.superBullets.push(superBullet);
        let audioClone = this.character.audio_flyShoot.cloneNode();
        if (!this.mute) {
          audioClone.play();
        }
      } else {
        setTimeout(() => {
          let bulletIndex = this.bullets.indexOf(bullet);
          if (bulletIndex !== -1) {
            this.bullets.splice(bulletIndex, 1);
          }
        }, 1500);
      }
    }
  }

  /**
  * Checks for collisions between bullets and flying enemies, and removes hit enemies.
  */
  checkEnemyCollisionBullets() {
    if (this.character.isFlying && this.character.superBullet) {
      let flyingEnemiesToRemove = [];

      for (let bulletIndex = this.superBullets.length - 1; bulletIndex >= 0; bulletIndex--) {
        this.checkBulletCollisionWithEnemies(bulletIndex, flyingEnemiesToRemove);
      }

      this.removeFlyingEnemies(flyingEnemiesToRemove);
    }
  }

  /**
 * Checks for a collision between a given bullet and all flying enemies, and handles it if a collision is detected.
 * @param {number} bulletIndex - Index of the bullet being checked for collision.
 * @param {Array} flyingEnemiesToRemove - Array of flying enemies to be removed.
 */
  checkBulletCollisionWithEnemies(bulletIndex, flyingEnemiesToRemove) {
    let bullet = this.superBullets[bulletIndex];

    for (let enemyIndex = this.level.flyingEnemiesWave.length - 1; enemyIndex >= 0; enemyIndex--) {
      let enemy = this.level.flyingEnemiesWave[enemyIndex];

      if (enemy.isColliding(bullet)) {
        this.handleBulletEnemyCollision(bulletIndex, enemy, flyingEnemiesToRemove);
        break;
      }
    }
  }

  /**
  * Handles a collision between a bullet and an enemy, inflicting damage and potentially removing the enemy.
  * @param {number} bulletIndex - Index of the bullet that collided with the enemy.
  * @param {Object} enemy - The enemy that was hit.
  * @param {Array} flyingEnemiesToRemove - Array of flying enemies to be removed.
  */
  handleBulletEnemyCollision(bulletIndex, enemy, flyingEnemiesToRemove) {
    enemy.hitted = true;
    enemy.hp -= 20;
    this.superBullets.splice(bulletIndex, 1);

    if (enemy.hp <= 0) {
      enemy.playAnimation(enemy.image_dead);
      if (!this.mute) {
        enemy.audio_hitted.play();
      }
      this.ExtraPoints.addScore(10);
      flyingEnemiesToRemove.push(enemy);
    }
  }

  /**
  * Removes the specified flying enemies from the game after a delay.
  * @param {Array} flyingEnemiesToRemove - Array of flying enemies to be removed.
  */
  removeFlyingEnemies(flyingEnemiesToRemove) {
    flyingEnemiesToRemove.forEach(enemy => {
      setTimeout(() => {
        let index = this.level.flyingEnemiesWave.indexOf(enemy);
        if (index !== -1) {
          this.level.flyingEnemiesWave.splice(index, 1);
        }
      }, 50);
    });
  }

  /**
  * Plays a sound effect to indicate that the character has been hurt.
  */
  playHurtSound() {
    let hurtsound = this.character.audio_hurt;
    hurtsound.playbackRate = 3;
    if (!this.mute) hurtsound.play();
  }

  /**
  * Displays a "hurt" effect on the canvas.
  */
  displayHurtCanvas() {
    document.getElementById('canvas').classList.add('hurt');
    setTimeout(() => {
      document.getElementById('canvas').classList.remove('hurt');
    }, 225);
  }

  /**
  * Stops the game if the character's energy is depleted or the character has collided with a finish flag.
  */
  stopGame() {
    if (this.character.energy == 0) {
      this.character.playAnimation(this.character.images_dying);
      this.setScore();
      setTimeout(() => {
        this.showEndscreen();
        this.character.collectedCoins = 0;
        this.updateProgressBarFlymode();
        this.updateProgressBarHealthPotion();
      }, 250);
    }
    this.level.finishFlag.forEach((flag) => {
      if (this.character.isColliding(flag)) {
        this.setScore();
        setTimeout(() => {
          this.showEndscreen();
          this.character.collectedCoins = 0;
          this.updateProgressBarFlymode();
          this.updateProgressBarHealthPotion();
        }, 150);
      }
    });
  }

  /**
  * Displays the end screen, updating the displayed score and other relevant elements.
  */
  showEndscreen() {
    document.getElementById("endScreenContainer").classList.remove('d-none');
    document.getElementById('endScreenText').classList.remove('d-none');
    document.getElementById('score').classList.remove('d-none');
    this.level.finishFlag.forEach((flag) => {
      if (this.character.isColliding(flag)) {
        document.getElementById('endScreenText').innerText = 'YOU WON !';
        document.getElementById('score').innerText = `Score: ${this.Score.score}`;
      }
    });
    if (this.character.energy == 0) {
      document.getElementById('endScreenText').innerText = 'YOU DIED !';
      document.getElementById('score').innerText = `Score: ${this.Score.score}`;
    }
    if (window.innerWidth <= 900) {
      document.getElementById('touchBtnContainer').classList.add('d-none');
      document.getElementById('header').classList.remove('d-none');
    }
    this.clearIntervals();
  }

  /**
  * Updates the score if the current score is higher than the previous score, using the scoreManager to persist the data.
  */
  async setScore() {
    const scoresArr = await this.scoreManager.loadAndSortScores('scores');
    const previousScoreObj = scoresArr.find(scoreObj => scoreObj.name === this.username);
    if (!previousScoreObj || previousScoreObj.score < this.Score.score) {
      const scoreObject = { [this.username]: this.Score.score };
      await this.scoreManager.updateScore('scores', 'n2M7UreVn3hZLmfAKw4A', scoreObject);
    }
  }

  /**
  * Sets the character's world to the current world instance.
  */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Determines whether the character is allowed to collide with a given enemy based on certain conditions.
   * @param {Object} enemy - The enemy object with which collision is checked.
   */
  characterCanCollide(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !enemy.dead &&
      this.characterCanBeHurt()
    );
  }

  /**
  * Determines whether the character can be hurt based on its current status and position.
  */
  characterCanBeHurt() {
    return (
      !this.character.isAboveGround() &&
      !this.character.canGetDamage() &&
      !this.character.attack() ||
      this.character.isFlying && !this.character.isHurt()
    );
  }

  /**
  * Controls the background music based on the current game state.
  */
  checkBgMusic() {
    if (!this.character.energy <= 0 && !this.mute ||
      this.level.enemies.length <= 0 && !this.mute ||
      this.character.x >= 6300 && !this.mute) {
      this.character.audio_bg.play();

    }
    else this.character.audio_bg.pause();
  }

  /**
  * Clears the canvas and adds all game objects to it, then calls the next frame of the animation.
  */
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);

    if (!this.character.isFlying) {
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.platforms1);
      this.addObjectsToMap(this.level.platforms2);
      this.addObjectsToMap(this.level.platforms3);
      this.addObjectsToMap(this.level.finishFlag);
    }

    if (this.character.doAnimation) {
      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);
      this.addStatusbars();
      this.ctx.translate(this.camera_x, 0);
      this.addAllObjects(this.ctx);
      this.ctx.translate(-this.camera_x, 0);
      let self = this;

      this.animateDiamonds();

      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
  * Animates the diamonds by changing their scale over time.
  */
  animateDiamonds() {
    this.scale += this.scaleChange;
    if (this.scale > 1.075 || this.scale < 1) {
      this.scaleChange = -this.scaleChange;
    }
  }

  /**
  * Flips an image horizontally.
  * @param {Object} mo - The MovableObject to be flipped.
  */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
  * Restores an image to its original orientation.
  * @param {Object} mo - The MovableObject to be restored.
  */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
  * Adds all game objects to the canvas.
  * @param {Object} ctx - The canvas context to draw on.
  */
  addAllObjects(ctx) {
    this.addObjectsToMap(this.shootingAnimationFlying);
    if (!this.character.isFlying) {
      this.addObjectsToMap(this.level.flyingEnemies);
      this.addObjectsToMap(this.droppedBombs);
      this.addObjectsToMap(this.level.enemies);

      this.addObjectsToMap(this.level.collectableThrowingStars);
      this.addAnimatedDiamonds(ctx);
      this.addObjectsToMap(this.collectedThrowingStars);
    }

    if (this.character.isFlying) {
      if (this.character.superBullet) {
        this.addObjectsToMap(this.superBullets);
      }
      this.addObjectsToMap(this.level.flyingEnemiesWave);

      if (this.character.y > 100 && !this.character.readyToFly) {
        this.character.y -= 10;
        setTimeout(() => {
          this.character.readyToFly = true;
        }, 500);
      }
      if (this.character.readyToFly) {
        if (this.level.flyingEnemiesWave.length < 50) {
          this.level.flyingEnemiesWave.push(new FlyingEnemy2(500, Math.random() * 450, Math.random() * 4), new FlyingEnemy3(500, Math.random() * 450, Math.random() * 5));
          this.character.createdFlyingEnemiesWave = true;
        }
      }
    }
    if (this.character.collectedCoins < 3 && !this.character.createdFlyingEnemiesWave) {
      this.level.flyingEnemiesWave = [];
    }
  }

  /**
  * Adds status bars (for health, score, etc.) to the canvas.
  */
  addStatusbars() {
    this.addScoreToMap(this.Diamonds);
    this.addScoreToMap(this.Health);
    this.addScoreToMap(this.ThrowingStars);
    this.addScoreToMap(this.Score);
  }

  /**
   * Adds diamonds to the canvas, applying a scaling transformation to animate them.
   * @param {Object} ctx - The canvas context to draw on.
   */
  addAnimatedDiamonds(ctx) {
    this.level.coins.forEach(coin => {
      ctx.save();
      ctx.translate(coin.x + coin.width / 2, coin.y + coin.height / 2);
      ctx.scale(this.scale, this.scale);
      ctx.translate(-(coin.x + coin.width / 2), -(coin.y + coin.height / 2));
      this.addToMap(coin);
      ctx.restore();
    });
  }

  /**
  * Adds a set of objects to the canvas.
  * @param {Array} objects - The objects to be added to the canvas.
  */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
  * Adds a single object to the canvas.
  * @param {Object} mo - The MovableObject to be added.
  */
  addToMap(mo) {
    if (mo.otherDirection && !this.character.isFlying) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection && !this.character.isFlying) {
      this.flipImageBack(mo);
    }
  }

  /**
  * Adds a score display to the canvas.
  * @param {Object} mo - The MovableObject representing the score to be added.
  */
  addScoreToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.drawScore(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
}
