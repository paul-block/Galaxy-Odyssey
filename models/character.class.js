class Character extends MovableObject {
  height = 250;
  width = 200;
  y = 440;
  x = 120;
  speed = 4;

  collectedCoins = 0;
  collectedThrowingStars = 0;
  doAnimation = true;
  lastInteraction = 0;
  idle = false;
  mute = true;
  muteBg = true;
  isOnPlatform = false;
  landing = false;
  scoreSet = false;
  superBullet = true;
  canFly = false;
  countingDown;
  count;
  initialFlightMode = false;
  readyToFly = false;
  jumpStartTime;
  isJumping = false;
  doubleJumpCount = 0;
  xPositionBeforeFlightMode;
  set = false;
  createdFlyingEnemiesWave = false;
  drankHealthPotion = false;
  activatedFlyMode = false;
  playedAudioHealthPotion = false;
  playedAudioFlightMode = false;

  offset = {
    top: 87,
    left: 70,
    right: 80,
    bottom: 60
  };

  images_run = [
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_0.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_1.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_2.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_3.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_4.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_5.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_6.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Fast Run/Character-FastRun_7.png"
  ];

  images_walking = [
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_02.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_03.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_04.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_05.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_06.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_07.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_08.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_09.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_10.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_11.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_12.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_13.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_14.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_15.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_16.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_17.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_18.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_19.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_20.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_21.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_22.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_23.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_24.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_25.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_26.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_27.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_28.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_29.png",
  ];
  images_jumping = [
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_02.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_03.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_04.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_05.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_06.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_07.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_08.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_09.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_10.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_11.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_12.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_13.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_14.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_15.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_16.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_17.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_18.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Jump/Character-Jump_19.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_00.png"
  ];
  images_idle = [
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_02.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_03.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_04.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_05.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_06.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_07.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_08.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_09.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_10.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_11.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_12.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_13.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_14.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_15.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_16.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_17.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_18.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_19.png"
  ];

  images_throw = [
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_02.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_03.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_04.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_05.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_06.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_07.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_08.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_09.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_10.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_11.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_12.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_13.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_14.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_15.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_16.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_17.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_18.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_19.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_20.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_21.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_22.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_23.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_24.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_25.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_26.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_27.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_28.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Shoot/Character-Shoot_29.png",
  ];

  images_hit = [
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_14.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_15.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_16.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_17.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_18.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_19.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_20.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_21.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_22.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_23.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_24.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_25.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_26.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_27.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_28.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_29.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_30.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_31.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_32.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_33.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_34.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_35.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_36.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_37.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_38.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Hit/Character-Hit_39.png",
  ];

  images_dying = [
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_02.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_03.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_04.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_05.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_06.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_07.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_08.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_09.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_10.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_11.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_12.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_13.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_14.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_15.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_16.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_17.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_18.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_19.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_20.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_21.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_22.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_23.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_24.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_25.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_26.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_27.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_28.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_29.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_30.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_31.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_32.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_33.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_34.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_35.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_36.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_37.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_38.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_39.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_40.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_41.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_42.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_43.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_44.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_45.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_46.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_47.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_48.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_49.png",
  ];

  images_hurt = [
    "img/main character sprites/Character 01/Png/Character Sprite/Idle/Character-Idle_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/Dead/Character-Dead_02.png"
  ];

  images_flying = [
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_00.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_01.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_02.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_03.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_04.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_05.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_06.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_07.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_08.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_09.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_10.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_11.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_12.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_13.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_14.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_15.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_16.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_17.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_18.png",
    "img/main character sprites/Character 01/Png/Character Sprite/In flying car/Character-In Car_19.png"
  ];

  audio_collectCoin = new Audio("audio/coinCollect1.mp3");
  audio_sword = new Audio("audio/sword.wav");
  audio_throw = new Audio("audio/wurfsternSound.wav");
  audio_jump = new Audio("audio/pop-bouncy-plop-betacut-1-00-02-02.mp3");
  audio_flyShoot = new Audio("audio/spaceShot.wav");
  audio_collectDiamond = new Audio("audio/collectBottle.mp3");
  audio_enemyHit = new Audio("audio/boom.mp3");
  audio_hurt = new Audio("audio/hurt.mp3");
  audio_bg = new Audio("audio/spaceship-ambience-with-effects-21420-01.mp3");
  audio_healthPotion = new Audio("audio/healthPotionReadyPitched.m4a");
  audio_flightMode = new Audio("audio/flightmodeReadyPitched.m4a");
  world;


  /**
  * Create a character instance.
  * @constructor
  */
  constructor() {
    super().loadImage("img/main character sprites/Character 01/Png/Character Sprite/Walk/Character-Walk_00.png");
    this.loadCharacterImages();
    this.animate();
    if (!this.initialFlightMode) {
      this.applyGravity();
    }
    this.applyFlyMode();
    setTimeout(() => {
      this.initialFlightMode = true;
    }, 5000);
  }

  /**
  * Load all image sets for the character.
  */
  loadCharacterImages() {
    const imageSets = [
      this.images_walking,
      this.images_jumping,
      this.images_flying,
      this.images_throw,
      this.images_hit,
      this.images_dying,
      this.images_hurt,
      this.images_idle,
      this.images_run
    ];

    imageSets.forEach(set => this.loadImages(set));
  }

  /**
  * Sets an interval to repeatedly move the character and play character animations.
  */
  animate() {
    setStoppableInterval(() => this.moveCharacter(), 600 / 60);
    setStoppableInterval(() => this.playCharacterAnimations(), 25);
  }

  /**
  * Checks the conditions and moves the character accordingly.
  * It also triggers a camera movement and platform check.
  */
  moveCharacter() {
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      this.jump();
    }
    else if (!this.isAboveGround() && !this.isOnPlatform) {
      this.land();
    }
    this.moveCamera();
    this.checkIfOnPlatform();
  }

  /**
  * Plays various animations for the character based on certain conditions.
  */
  playCharacterAnimations() {
    const animations = [
      { condition: this.idle || (!this.isAboveGround() && !this.isOnPlatform) || this.isOnPlatform, images: this.images_idle },
      { condition: this.world.keyboard.e && !this.flyMode(), images: this.images_hit },
      { condition: this.canShoot() && !this.flyMode(), images: this.images_throw },
      { condition: this.flyMode(), images: this.images_flying },
      { condition: this.isDead() && !this.flyMode(), images: this.images_dying },
      { condition: this.canRun() && !this.flyMode(), images: this.images_run },
      { condition: this.isHurt() && !this.flyMode(), images: this.images_hurt },
      {
        condition: this.isAboveGround() && !this.isFlying && !this.isOnPlatform && !this.attack() ||
          this.jumpOnPlatform() && !this.isFlying && !this.attack(), images: this.images_jumping
      },
      {
        condition: this.characterIsWalkingOnGround() && !this.flyMode() && !this.attack() && !this.isHurt() && !this.canRun() ||
          this.walkOnPlatform() && !this.flyMode() && !this.isHurt() && !this.canRun() && !this.attack(), images: this.images_walking
      }
    ];

    animations.forEach(({ condition, images }) => {
      if (condition) {
        this.playAnimation(images);
      }
    });

    this.runSecondaryAnimations();
  }

  /**
  * Runs a set of secondary animations and sounds, based on collected items.
  */
  runSecondaryAnimations() {
    this.activateFlyMode();
    this.checkHealthPotion();
    this.activateHealthBoost();
  }

  /**
   * Activates flight mode if certain conditions are met.
   */
  activateFlyMode() {
    if (this.collectedCoins >= 5) {
      if (!this.playedAudioFlightMode && !this.world.mute) {
        this.audio_flightMode.playbackRate = 1.2;
        this.audio_flightMode.play();
        this.playedAudioFlightMode = true;
      }
      document.getElementById('flyItem').classList.remove('grayscale');
      document.getElementById('flyItem').classList.add('sizePulse');
      if (this.world.keyboard.f) {
        this.canFly = true;
        this.resetFlymode = true;
      }

    } else if (this.collectedCoins < 5) {
      document.getElementById('flyItem').classList.add('grayscale');
      document.getElementById('flyItem').classList.remove('sizePulse');
      this.playedAudioFlightMode = false;
      return false;
    };
  }

  /**
  * Checks if conditions are met to activate a health potion.
  */
  checkHealthPotion() {
    if (this.collectedCoins >= 3) {
      if (!this.playedAudioHealthPotion && !this.world.mute) {
        this.audio_healthPotion.playbackRate = 1.2;
        this.audio_healthPotion.play();
        this.playedAudioHealthPotion = true;
      }
      document.getElementById('healthPotion').classList.remove('grayscale');
      document.getElementById('healthPotion').classList.add('sizePulse');
    }
    else if (this.collectedCoins < 3) {
      document.getElementById('healthPotion').classList.add('grayscale');
      document.getElementById('healthPotion').classList.remove('sizePulse');
      this.playedAudioHealthPotion = false;
    }
  }

  /**
  * Activates health boost if conditions are met.
  */
  activateHealthBoost() {
    if (this.hasCoinAndPressedQ()) {
      this.consumeHealthPotion();
      this.updateUIAfterConsumption();
      this.resetPotionStatus();
    }
  }

  /**
  * Checks if the character has collected enough coins and if the 'q' key was pressed.
  * @returns {boolean} Returns true if conditions are met, false otherwise.
  */
  hasCoinAndPressedQ() {
    return this.collectedCoins >= 3 && this.world.keyboard.q;
  }

  /**
  * Consumes a health potion, increasing the energy level.
  */
  consumeHealthPotion() {
    if (this.energy < 100 && !this.drankHealthPotion) {
      this.energy = Math.min(this.energy + 40, 100);
      this.drankHealthPotion = true;
      this.collectedCoins = Math.max(this.collectedCoins - 3, 0);
      this.world.updateProgressBarHealthPotion();
      this.world.updateProgressBarFlymode();
    }
  }

  /**
  * Updates the user interface after a health potion is consumed.
  */
  updateUIAfterConsumption() {
    document.getElementById('canvas').classList.add('heal');
    setTimeout(() => {
      document.getElementById('canvas').classList.remove('heal');
    }, 225);
    this.world.Health.score = this.energy;
    this.world.Diamonds.score = this.collectedCoins;
  }

  /**
  * Resets the health potion status after a delay.
  */
  resetPotionStatus() {
    setTimeout(() => {
      this.drankHealthPotion = false;
    }, 3000);
  }

  /**
  * Starts a countdown if it hasn't already started.
  */
  countdown() {
    if (!this.countingDown) {
      this.setupCountdown();
      this.runCountdown();
    }
  }

  /**
  * Prepares for the countdown by revealing the countdown element and initializing the count.
  */
  setupCountdown() {
    document.getElementById('timer').classList.remove('d-none');
    this.count = 11;
    this.countingDown = true;
  }

  /**
  * Starts and runs the countdown timer, updating the countdown element text.
  */
  runCountdown() {
    let countdownTimer = setInterval(() => {
      this.count--;
      if (this.count <= 0 || this.energy == 0) {
        this.clearCountdown(countdownTimer);
      }
      document.getElementById('timer').innerText = this.count;
    }, 1000);
  }

  /**
  * Stops the countdown timer, hides the countdown element and awards extra points.
  * @param {number} countdownTimer - The ID of the countdown timer interval to be cleared.
  */
  clearCountdown(countdownTimer) {
    clearInterval(countdownTimer);
    this.countingDown = false;
    document.getElementById('timer').classList.add('d-none');
    this.world.ExtraPoints.show();
    setTimeout(() => {
      this.world.Score.addScore(this.world.ExtraPoints.score);
    }, 2999);
  }

  /**
  * Determines if the character can enter flight mode.
  * If so, prepares and activates flight mode.
  * If not, deactivates flight mode and performs a landing.
  * @returns {boolean} Returns true if flight mode is activated, false otherwise.
  */
  flyMode() {
    if (this.canFly && this.world.keyboard.f) {
      this.prepareForFlight();
      this.activateFlightMode();
      return true;
    } else {
      this.deactivateFlightMode();
      this.performLanding();
    }
  }

  /**
  * Prepares the character for flight by saving the current x position and setting the x position for flight mode.
  * Afterwards starting the countdown.
  */
  prepareForFlight() {
    if (!this.set) {
      this.xPositionBeforeFlightMode = this.x;
      this.set = true;
    }
    this.x = 120;
    this.countdown();
  }

  /**
  * Activates flight mode by setting related properties and decrementing the collected coins.
  */
  activateFlightMode() {
    document.getElementById("touchBtnMobileUpAndDown").classList.remove('d-none');
    this.isFlying = true;
    this.world.characterIsFlying = true;
    if (!this.activatedFlyMode) {
      this.collectedCoins -= 5;
      this.world.updateProgressBarFlymode();
      this.world.updateProgressBarHealthPotion();
      this.world.Diamonds.score = this.collectedCoins;
      this.activatedFlyMode = true;
    }
    setTimeout(this.resetFlightMode.bind(this), 11000);
  }

  /**
  * Resets flight mode related properties.
  */
  resetFlightMode() {
    document.getElementById("touchBtnMobileUpAndDown").classList.add('d-none');
    this.canFly = false;
    this.readyToFly = false;
    this.createdFlyingEnemiesWave = false;
    this.world.keyboard.f = false;
    this.activatedFlyMode = false;
  }

  /**
  * Deactivates flight mode and resetting the characters x position.
  */
  deactivateFlightMode() {
    if (!this.canFly && this.set) {
      this.x = this.xPositionBeforeFlightMode;
      this.set = false;
    }
  }

  /**
  * Performs a landing by adjusting the y position until the character reaches the ground.
  * Also resets the flying states.
  */
  performLanding() {
    if (this.y < 440 && this.landing) {
      this.y += 1;
      this.landing = !this.landing;
    } else {
      this.isFlying = false;
      this.world.characterIsFlying = false;
    }
  }

  /**
   * Checks if enough time has passed for the machine gun to be fired.
   * @returns {boolean} Returns true if the gun can be fired, false otherwise.
   */
  machineGunTimepassed() {
    let timepassed = new Date().getTime() - this.lastShot;
    timepassed = timepassed / 1000;
    if (timepassed > 0.05) {
      this.lastShot = new Date().getTime();
      return true;
    }
    else return false;
  }

  /**
  * Triggers an attack animation and sound effect if 'e' key is pressed.
  * Also sets the character's offset accordingly.
  * @returns {boolean} Returns true if an attack is initiated, false otherwise.
  */
  attack() {
    if (this.world.keyboard.e) {
      if (!this.world.mute) {
        this.audio_sword.play();
      }
      this.offset = {
        top: 50,
        left: 70,
        right: 40,
        bottom: 60
      };
      return true;
    }
    if (this.world.keyboard.left || this.world.keyboard.right || this.world.keyboard.space)
      this.offset = {
        top: 87,
        left: 70,
        right: 80,
        bottom: 60
      };
    return false;
  }

  /**
  * Checks if the character is walking on a platform.
  * @returns {boolean} Returns true if character is walking on a platform, false otherwise.
  */
  walkOnPlatform() {
    if (this.world.keyboard.left && this.isOnPlatform || this.world.keyboard.right && this.isOnPlatform) {
      return true;
    } else return false;
  }

  /**
  * Checks if the character is jumping on a platform.
  * @returns {boolean} Returns true if character is jumping on a platform, false otherwise.
  */
  jumpOnPlatform() {
    if (this.world.keyboard.space && this.isOnPlatform) {
      return true;
    } else return false;
  }

  /**
   * Checks if the character can run and sets speed accordingly.
   * @returns {boolean} Returns true if character can run, false otherwise.
   */
  canRun() {
    if (this.world.keyboard.shift && this.world.keyboard.right ||
      this.world.keyboard.shift && this.world.keyboard.left) {
      this.speed = 8;
      return true;
    }
    else {
      this.speed = 4;
      return false;
    }
  }

  /**
  * Checks if the character can throw a star and plays the throw sound effect if 'd' key is pressed.
  * @returns {boolean} Returns true if character can throw a star, false otherwise.
  */
  canShoot() {
    if (this.world.keyboard.d && this.collectedThrowingStars > 0) {
      if (!this.world.mute) {
        this.audio_throw.play();
      }
      return true;
    }
    if (this.world.keyboard.left || this.world.keyboard.right)
      return false;
  }

  /**
  * Checks if the character can move right based on the current state and position.
  * @returns {boolean} Returns true if character can move right, false otherwise.
  */
  canMoveRight() {
    if (!this.isFlying)
      return this.world.keyboard.right && this.x < this.world.level.level_end_x;
  }

  /**
  * Moves the character to the right and updates the last interaction timestamp.
  */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.lastInteraction = new Date().getTime();
  }

  /**
  * Checks if the character can move left based on the current state and position.
  * @returns {boolean} Returns true if character can move left, false otherwise.
  */
  canMoveLeft() {
    if (!this.isFlying)
      return this.world.keyboard.left && this.x > 0;
  }

  /**
  * Moves the character to the left and updates the last interaction timestamp.
  */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.lastInteraction = new Date().getTime();
  }

  /**
  * Checks if the character can jump based on the current state.
  * @returns {boolean} Returns true if character can jump, false otherwise.
  */
  canJump() {
    return this.world.keyboard.space && (this.isOnPlatform || !this.isJumping)
      || this.world.keyboard.left && this.isOnPlatform && this.world.keyboard.space && this.doubleJumpCount < 2
      || this.world.keyboard.right && this.isOnPlatform && this.world.keyboard.space && this.doubleJumpCount < 2;
  }

  /**
  * Triggers a jump, setting related properties and playing a sound effect if needed.
  */
  jump() {
    super.jump();
    this.isJumping = true;
    this.jumpStartTime = Date.now() / 1000;
    this.lastInteraction = new Date().getTime();
    if (!this.isFlying && !this.world.mute) {
      this.audio_jump.volume = .3;
      this.audio_jump.play();
    }
    this.moveCamera();
  }

  /**
  * Lands the character, marking it as not jumping.
  */
  land() {
    this.isJumping = false;
  }

  /**
  * Deactivates the character's idle mode.
  */
  deactivateIdleMode() {
    this.idle = false;
  }

  /**
  * Moves the camera according to the character's x position.
  * @returns {number} The new position of the camera.
  */
  moveCamera() {
    return (this.world.camera_x = -this.x + 100);
  }

  /**
  * Checks if the character is inactive based on keyboard inputs.
  * The character is inactive if the right, left, or space keys are not being pressed.
  * @returns {boolean} Returns true if the character is inactive, false otherwise.
  */
  inactive() {
    return (
      !this.world.keyboard.right ||
      !this.world.keyboard.left ||
      !this.world.keyboard.space
    );
  }

  /**
  * Checks if the character is walking on the ground.
  * The character is considered to be walking on the ground if either the right or left keys are being pressed, and it is not above the ground.
  * @returns {boolean} Returns true if the character is walking on the ground, false otherwise.
  */
  characterIsWalkingOnGround() {
    return (
      (this.world.keyboard.right && !this.isAboveGround() ||
        this.world.keyboard.left && !this.isAboveGround())
    );
  }

  /**
  * Checks if the character is on a platform.
  * If the character is not on a platform, not above the ground, and not jumping, it is set to a default y position.
  * If the character is on a platform, it is marked as not jumping.
  */
  checkIfOnPlatform() {
    if (!this.isOnPlatform && !this.isAboveGround() && !this.isJumping) this.y = 440;
    else if (this.isOnPlatform) this.isJumping = false;
  }
}

