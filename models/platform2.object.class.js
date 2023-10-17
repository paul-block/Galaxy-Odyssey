class PlatformObject2 extends MovableObject {
    width = 180;
    height = 158;
    offset = {
        top: 140,
        left: 20,
        right: 25,
        bottom: 0,
    };

    /**
    * Create a platform object.
    * @param {string} imagePath - The image path for the platform object.
    * @param {number} x - The x position of the platform object.
    * @param {number} y - The y position of the platform object.
    */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}
