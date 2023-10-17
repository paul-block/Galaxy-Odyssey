class BackgroundObject extends MovableObject {
  width = 1000;
  height = 700;


  /**
  * Creates a new BackgroundObject.
  * 
  * @param {string} imagePath - The path to the image file for this background object.
  * @param {number} x - The initial x-position of this background object.
  */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
  }
}
