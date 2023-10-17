class CollectableObject extends MovableObject {
  images_coins = ["img/crystal.png"];
  height = 60;
  width = 60;
  offset = {
    top: 0,
    left: 10,
    right: 10,
    bottom: 0,
  };
  collected = false;
  scale = 1;

  /**
  * Constructs a new object, loads the image for the object, sets its initial position, 
  * loads a set of images for coin animations, and starts the animation.
  *
  * @param {number} x - The initial x-coordinate of the object.
  * @param {number} y - The initial y-coordinate of the object.
  */
  constructor(x, y) {
    super();

    this.loadImage("img/crystal.png");
    this.loadImages(this.images_coins);
    this.x = x;
    this.y = y;
  }
}


