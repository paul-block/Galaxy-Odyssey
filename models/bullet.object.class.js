class Bullet extends MovableObject {
    image_bullet = [
        "img/itemBullet.png"
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
    * Creates a new Bullet object and sets its animation and shooting behaviour.
     * 
    * @param {number} x - The initial x-coordinate of this Bullet.
    * @param {number} y - The initial y-coordinate of this Bullet.
    */
    constructor(x, y) {
        super().loadImage(
            "img/itemBullet.png"
        );
        this.loadImages(this.image_bullet);
        this.x = x;
        this.y = y;
        this.height = 25;
        this.width = 25;
        this.animate();
        this.shoot();
    }

    /**
    * Animates the bullet by playing the bullet image animation when its y-coordinate is less than 280.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.y < 280) {
                this.playAnimation(this.image_bullet);
            }
        }, 100);
    }

    /**
    * Simulates shooting behaviour by increasing the bullet's x-coordinate by 20 every 25 milliseconds.
    */
    shoot() {
        setStoppableInterval(() => {
            this.x += 20;
        }, 25);
    }
}
