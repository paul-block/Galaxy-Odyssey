class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  lastShot = new Date().getTime();;
  dead = false;
  isOnPlatform = false;
  isFlying = false;
  characterXcopy = 120;

  /**
  * Play an animation based on the provided images.
  * @param {string[]} images - The images to display in the animation.
  */
  playAnimation(images) {
    let i = this.currentImg % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImg++;
  }

  /**
  * Play an animation once based on the provided images.
  * @param {string[]} images - The images to display in the animation.
  * @param {number} [frameDuration=50] - The duration of each frame in the animation.
  */
  playAnimationOnce(images, frameDuration = 50) {
    this.currentImg = 0;
    const intervalId = setInterval(() => {
      let i = this.currentImg % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      if (i === images.length - 1) {
        clearInterval(intervalId);
      } else {
        this.currentImg++;
      }
    }, frameDuration);
  }

  /**
   * Show the game over screen.
   */
  gameOver() {
    let endScreen = document.getElementById("endScreenContainer");
    endScreen.style.display = "block";
  }

  /**
   * Check if the current object is on top of the specified object.
   * @param {MovableObject} mo - The object to compare with.
   * @return {boolean} True if this object is on top of the specified object, otherwise false.
   */
  isOnTop(mo) {
    return (
      this.y + this.height &&
      this.x + this.width >= mo.y + mo.height &&
      mo.x + mo.width
    );
  }

  /**
   * Check if the current object is colliding with the specified object.
   * @param {MovableObject} mo - The object to compare with.
   * @return {boolean} True if this object is colliding with the specified object, otherwise false.
   */
  isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  /**
  * Apply damage to the current object.
  */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
  * Check if the current object is dead.
  * @return {boolean} True if the object is dead, otherwise false.
  */
  isDead() {
    return this.energy == 0;
  }

  /**
  * Check if the current object is hurt.
  * @return {boolean} True if the object is hurt, otherwise false.
  */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < .5;
  }

  /**
 * Check if the current object can take damage.
 * @return {boolean} True if the object can take damage, otherwise false.
 */
  canGetDamage() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < 1.5;
  }

  /**
  * Check if the current enemy object can take damage.
  * @return {boolean} True if the enemy can take damage, otherwise false.
  */
  enemyCanGetDamage() {
    let timepassed = new Date().getTime() - this.lastShot;
    timepassed = timepassed / 500;
    return timepassed < 0.25;
  }

  /**
 * Calculate the time passed since the last shot.
 * @return {boolean} True if enough time has passed, otherwise false.
 */
  timepassed() {
    let timepassed = new Date().getTime() - this.lastShot;
    timepassed = timepassed / 1000;
    if (timepassed > 0.3) {
      this.lastShot = new Date().getTime();
      return true;
    }
    else return false;
  }

  /**
   * Move the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
  * Move the object to the right by its speed.
  */
  moveRight() {
    this.x += this.speed;
  }

  /**
 * Apply gravity to the object.
 */
  applyGravity() {
    setStoppableInterval(() => {
      if (!this.isFlying) {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }
    }, 1000 / 25);
  }

  /**
  * Apply flying mode to the object.
  */
  applyFlyMode() {
    setStoppableInterval(() => {
      if (this.world.keyboard.f && this.world.keyboard.up) {
        this.y -= 20;
      } if (this.world.keyboard.f && this.world.keyboard.down) {
        this.y += 20;
      }
    }, 1000 / 25);
  }

  /**
   * Check for platform contact.
   * @return {boolean} True if the object is a PlatformObject, otherwise false.
   */
  platformContact() {
    if (this instanceof PlatformObject) return true;
  }

  /**
   * Check if the object is above the ground.
   * @return {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof Bomb) return this.y < 530;
    if (this.world.character.isOnPlatform) return false;
    else return this.y < 440;
  }

  /**
   * Make the object jump.
   */
  jump() {
    this.speedY = 38;
  }
}
