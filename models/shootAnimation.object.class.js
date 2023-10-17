
class ShootAnimation extends MovableObject {
    image_shoot = [
        "img/OtherAssets/1.png"
    ];


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
    * Create a shoot animation.
    * @param {number} x - The x position of the shoot animation.
    * @param {number} y - The y position of the shoot animation.
    */
    constructor(x, y) {
        super().loadImage(
            "img/OtherAssets/1.png"
        );
        this.loadImages(this.image_shoot);
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 45;
        this.animate();
    }

    /**
    * Play the shoot animation.
    */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.image_shoot);
        }, 100);
    }
}
