class Enemy1 extends MovableObject {
  height = 200;
  width = 250;
  y = 0;
  x = 400 + Math.random() * 3000;
  hitTimestamp;
  dead = false;

  image_dead = [
    "img/enemies/DeathFx/skeleton-animation_0.png",
    "img/enemies/DeathFx/skeleton-animation_1.png",
    "img/enemies/DeathFx/skeleton-animation_2.png",
    "img/enemies/DeathFx/skeleton-animation_3.png",
    "img/enemies/DeathFx/skeleton-animation_4.png",
    "img/enemies/DeathFx/skeleton-animation_5.png",
    "img/enemies/DeathFx/skeleton-animation_6.png",
    "img/enemies/DeathFx/skeleton-animation_7.png",
    "img/enemies/DeathFx/skeleton-animation_8.png",
    "img/enemies/DeathFx/skeleton-animation_9.png",
    "img/enemies/DeathFx/skeleton-animation_10.png",
    "img/enemies/DeathFx/skeleton-animation_11.png",
    "img/enemies/DeathFx/skeleton-animation_12.png",
    "img/enemies/DeathFx/skeleton-animation_13.png",
    "img/enemies/DeathFx/skeleton-animation_14.png",
    "img/enemies/DeathFx/skeleton-animation_15.png",
    "img/enemies/DeathFx/skeleton-animation_16.png",
    "img/enemies/DeathFx/skeleton-animation_17.png",
    "img/WorldBackground/transparent.png",
    "img/WorldBackground/transparent.png"
  ];

  images_flying = [
    'img/FlyingMonster/Moving/Moving_01.png',
    'img/FlyingMonster/Moving/Moving_02.png',
    'img/FlyingMonster/Moving/Moving_03.png',
    'img/FlyingMonster/Moving/Moving_04.png',
    'img/FlyingMonster/Moving/Moving_05.png',
    'img/FlyingMonster/Moving/Moving_06.png',
    'img/FlyingMonster/Moving/Moving_07.png',
    'img/FlyingMonster/Moving/Moving_08.png',
    'img/FlyingMonster/Moving/Moving_09.png',
    'img/FlyingMonster/Moving/Moving_10.png',
    'img/FlyingMonster/Moving/Moving_11.png',
    'img/FlyingMonster/Moving/Moving_12.png',
    'img/FlyingMonster/Moving/Moving_13.png',
    'img/FlyingMonster/Moving/Moving_14.png',
    'img/FlyingMonster/Moving/Moving_15.png',
    'img/FlyingMonster/Moving/Moving_16.png',
    'img/FlyingMonster/Moving/Moving_17.png',
    'img/FlyingMonster/Moving/Moving_18.png',
    'img/FlyingMonster/Moving/Moving_19.png'
  ];

  images_attack = [
    'img/FlyingMonster/LoseBomb/LoseBomb_01.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_02.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_03.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_04.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_05.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_06.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_07.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_08.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_09.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_10.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_11.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_12.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_13.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_14.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_15.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_16.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_17.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_18.png',
    'img/FlyingMonster/LoseBomb/LoseBomb_19.png'
  ];

  offset = {
    top: 45,
    left: 90,
    right: 90,
    bottom: 45
  };
  hitted = false;
  dead = false;
  audio_hitted = new Audio("audio/pop.mp3");
  hp = 20;
  drop = false;

  /**
  * Constructs a new instance of Enemy1.
  *
  * @param {number} bombTime - The time interval for setting random drops.
  * @param {number} x - The initial x-coordinate of the object.
  * @param {number} y - The initial y-coordinate of the object.
  * @param {number} [speed=0.5 + Math.random() * 0.35] - The speed of the object (default is a random value between 0.5 and 0.85).
  */
  constructor(bombTime, x, y, speed = 0.5 + Math.random() * 0.35) {
    super().loadImage("img/FlyingMonster/Moving/Moving_01.png");
    this.loadImages(this.images_flying);
    this.loadImages(this.image_dead);
    this.loadImages(this.images_attack);
    this.animate();
    this.speed = speed;
    this.x = x;
    this.y = y;
    setInterval(() => {
      this.setRandomDrop();
    }, bombTime);
  }

  /**
  * Starts the animations for the object and triggers the right one based on given conditions
  */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.hitted) this.playAnimation(this.images_flying);
      if (this.hp == 10 && this.hitted) {
        if (this.speed <= 0.5) {
          this.speed = this.speed + Math.random() * 0.1;
        }
        this.playAnimation(this.images_flying);
      }
      if (this.hp <= 0 && !this.isDying) {
        this.isDying = true;
        this.playAnimationOnce(this.image_dead);
        this.speed = 0;
      }
    }, 50);
  }

  /**
  * Sets the drop variable for the bomb animation
  */
  setRandomDrop() {
    if (!this.dead) {
      this.drop = true;

      setTimeout(() => {
        this.drop = false;
      }, 20);
    }
  }
}
