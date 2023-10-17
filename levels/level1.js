let level1;
let level2;

/**
 * Initialize game level by creating various game objects.
 */
function initLevel() {
  level1 = new Level(
    createEnemies(),
    createFlyingEnemies(),
    createFlyingEnemiesWave(),
    createBackgroundLayers(),
    createPlatforms1(),
    createPlatforms2(),
    createPlatforms3(),
    createCollectableThrowingStar(),
    createDiamonds(),
    createFinishFlag()
  );
}

/**
 * Creates the enemies for the game level.
 * @returns {Enemy[]} Array of Enemy objects.
 */
function createEnemies() {
  return [
    new Enemy5(500),
    new Enemy2(600),
    new Enemy2(800),
    new Enemy3(900),
    new Enemy2(1000),
    new Enemy2(1300),
    new Enemy2(1400),
    new Enemy3(1500),
    new Enemy5(1600),
    new Enemy3(1800),
    new Enemy3(2000),
    new Enemy5(2200),
    new Enemy2(2500),
    new Enemy5(2600),
    new Enemy2(2800),
    new Enemy2(3200),
    new Enemy2(3400),
    new Enemy3(3600),
    new Enemy2(3900),
    new Enemy3(4250),
    new Enemy5(4300),
    new Enemy3(4400),
    new Enemy2(4500),
    new Enemy5(4800),
    new Enemy5(5000),
    new Enemy5(5300),
    new Enemy3(5600),
    new Enemy2(5900),
    new Enemy5(6000),
    new Enemy2(6200),
    new Enemy3(6600),
    new Enemy2(6800),
    new Enemy3(6900),
    new Enemy5(4300),
    new Enemy4(220, 660, 80, 30),
    new Enemy4(60, 2000, 200, 160),
    new Enemy4(2200, 3550, 40, 25),
    new Enemy4(60, 4250, 150, 10),
    new Enemy4(60, 4150, 150, 20),
    new Enemy4(220, 4500, 150, 60),
    new Enemy4(220, 5650, 50, 25)
  ];
}

/**
 * Creates the flying enemies for the game level.
 * @returns {Enemy1[]} Array of Enemy1 objects.
 */
function createFlyingEnemies() {
  return [
    new Enemy1(2750, 3000, 0),
    new Enemy1(5200, 1500, 0),
    new Enemy1(6000, 5500, 0),
    new Enemy1(3320, 4500, 0)
  ];
}

/**
 * Creates the flying enemies wave for the game level.
 * @returns {Object[]} Empty array.
 */
function createFlyingEnemiesWave() {
  return [];
}

/**
 * Creates the background layers for the game level.
 * @returns {BackgroundObject[]} Array of BackgroundObject objects.
 */
function createBackgroundLayers() {
  return [
    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      -719
    ),

    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      0
    ),

    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719
    ),

    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 2
    ),

    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 4
    ),

    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 5
    ),
    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 6
    ),
    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 7
    ),
    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 8
    ),
    new BackgroundObject(
      "img/WorldBackground/spaceGround.png",
      719 * 9
    )
  ];
}

/**
 * Creates the first type of platforms for the game level.
 * @returns {PlatformObject[]} Array of PlatformObject objects.
 */
function createPlatforms1() {
  return [
    new PlatformObject(
      "img/WorldBackground/spaceGround.png",
      360, 320
    ),
    new PlatformObject(
      "img/WorldBackground/spaceGround.png",
      2700, 320
    ),
    new PlatformObject(
      "img/WorldBackground/spaceGround.png",
      3500, 320
    ),
    new PlatformObject(
      "img/WorldBackground/spaceGround.png",
      4780, 320
    ),
    new PlatformObject(
      "img/WorldBackground/spaceGround.png",
      5280, 320
    )
  ];
}

/**
 * Creates the second type of platforms for the game level.
 * @returns {PlatformObject2[]} Array of PlatformObject2 objects.
 */
function createPlatforms2() {
  return [
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      600, 160
    ),
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      1400, 160
    ),
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      1550, 160
    ),
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      2450, 160
    ),
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      3740, 160
    ),
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      4400, 160
    ),
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      4560, 160
    ),
    new PlatformObject2(
      "img/WorldBackground/spaceGround.png",
      5600, 160
    )
  ];
}

/**
 * Creates the third type of platforms for the game level.
 * @returns {PlatformObject3[]} Array of PlatformObject3 objects.
 */
function createPlatforms3() {
  return [
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      800, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      980, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      1160, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      1800, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      1980, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      2160, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      4000, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      4160, 0
    ),
    new PlatformObject3(
      "img/WorldBackground/spaceGround.png",
      5900, 0
    ),
  ];
}

/**
 * Creates the collectable throwing stars for the game level.
 * @returns {CollectableThrowingStar[]} Array of CollectableThrowingStar objects.
 */
function createCollectableThrowingStar() {
  return [
    new CollectableThrowingStar(950, 80),
    new CollectableThrowingStar(950 + 75, 80),
    new CollectableThrowingStar(950 + 150, 80),
    new CollectableThrowingStar(2515, 185),
    new CollectableThrowingStar(2755, 380)

  ];
}

/**
 * Creates the diamonds for the game level.
 * @returns {CollectableObject[]} Array of CollectableObject objects.
 */
function createDiamonds() {
  return [
    new CollectableObject(420, 325),
    new CollectableObject(1460, 180),
    new CollectableObject(1460 + 75, 180),
    new CollectableObject(1460 + 150, 180),
    new CollectableObject(2450, 180),
    new CollectableObject(2450 + 120, 180),
    new CollectableObject(3750, 180),
    new CollectableObject(3775 + 75, 180),
    new CollectableObject(4530, 180),
    new CollectableObject(4835, 325)
  ];
}

/**
 * Creates the finish flag for the game level.
 * @returns {FinishFlag[]} Array of FinishFlag objects.
 */
function createFinishFlag() {
  return [
    new FinishFlag(6000)
  ];
}