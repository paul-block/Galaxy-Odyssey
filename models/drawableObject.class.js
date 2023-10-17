class DrawableObject {
  x = 120;
  y = 0;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImg = 0;

  /**
  * Loads an image from a given path.
  *
  * @param {string} path - The path to the image.
  */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
  * Loads multiple images from an array of paths.
  *
  * @param {Array<string>} arr - The array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
  * Draws the image of this object on the provided canvas context.
  *
  * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas where the image will be drawn.
  */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
  * Draws the score of this object on the provided canvas context.
  *
  * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas where the score will be drawn.
  */
  drawScore(ctx) {
    ctx.font = this.fontSize + ' Space Mono';
    ctx.fillStyle = this.fontColor;
    ctx.fillText(this.score, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around this object on the provided canvas context, if `canDrawFrame` returns true.
   *
   * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas where the frame will be drawn.
   */
  drawFrame(ctx) {
    if (
      this.canDrawFrame()
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Checks if this object is an instance of a specific list of classes.
   *
   * @returns {boolean} True if this object is an instance of any of the specified classes; otherwise, false.
   */
  canDrawFrame() {
    return this instanceof Character ||
      this instanceof Enemy1 ||
      this instanceof Enemy2 ||
      this instanceof Enemy3 ||
      this instanceof Enemy4 ||
      this instanceof Enemy5 ||
      this instanceof FlyingEnemy2 ||
      this instanceof FlyingEnemy3 ||
      this instanceof CollectableObject ||
      this instanceof CollectableThrowingStar ||
      this instanceof PlatformObject ||
      this instanceof PlatformObject2 ||
      this instanceof PlatformObject3;
  }
}
