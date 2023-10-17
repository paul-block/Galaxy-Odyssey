class Level {
  /**
    * @property {Object[]} enemies - Array of enemy objects in the level.
    * @property {Object[]} flyingEnemies - Array of flying enemy objects in the level.
    * @property {Object[]} flyingEnemiesWave - Array of wave-pattern flying enemy objects in the level.
    * @property {Object[]} backgroundObjects - Array of background objects in the level.
    * @property {Object[]} platforms1 - Array of the first type of platform objects in the level.
    * @property {Object[]} platforms2 - Array of the second type of platform objects in the level.
    * @property {Object[]} platforms3 - Array of the third type of platform objects in the level.
    * @property {Object[]} collectableThrowingStars - Array of collectable throwing star objects in the level.
    * @property {Object[]} coins - Array of coin objects in the level.
    * @property {Object} finishFlag - Finish flag object marking the end of the level.
    * @property {number} level_end_x - X-coordinate representing the end of the level.
    */

  enemies;
  flyingEnemies;
  flyingEnemiesWave;
  backgroundObjects;
  platforms1;
  platforms2;
  platforms3;
  collectableThrowingStars;
  coins;
  finishFlag;
  level_end_x = 719 * 15;

  /**
   * Creates a new game level.
   * 
   * @param {Object[]} enemies - The enemy objects.
   * @param {Object[]} flyingEnemies - The flying enemy objects.
   * @param {Object[]} flyingEnemiesWave - The wave-pattern flying enemy objects.
   * @param {Object[]} backgroundObjects - The background objects.
   * @param {Object[]} platforms1 - The first type of platform objects.
   * @param {Object[]} platforms2 - The second type of platform objects.
   * @param {Object[]} platforms3 - The third type of platform objects.
   * @param {Object[]} collectableThrowingStars - The collectable throwing star objects.
   * @param {Object[]} coins - The coin objects.
   * @param {Object} finishFlag - The finish flag object.
   */
  constructor(
    enemies,
    flyingEnemies,
    flyingEnemiesWave,
    backgroundObjects,
    platforms1,
    platforms2,
    platforms3,
    collectableThrowingStars,
    coins,
    finishFlag
  ) {
    this.enemies = enemies;
    this.flyingEnemies = flyingEnemies;
    this.flyingEnemiesWave = flyingEnemiesWave;
    this.backgroundObjects = backgroundObjects;
    this.platforms1 = platforms1;
    this.platforms2 = platforms2;
    this.platforms3 = platforms3;
    this.collectableThrowingStars = collectableThrowingStars;
    this.coins = coins;
    this.finishFlag = finishFlag;
  }
}

