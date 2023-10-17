class FinishFlag extends MovableObject {
    width = 100;
    height = 158;
    y = 7;

    offset = {
        top: 10,
        left: 20,
        right: 25,
        bottom: 0,
    };

    imagePath = ['img/finishFlag.png'];

    /**
    * Constructs an instance, loading an image at the given path.
    *
    * @param {number} x - The initial horizontal position of the object.
    */
    constructor(x) {
        super().loadImage(this.imagePath);
        this.x = x;
    }
}
