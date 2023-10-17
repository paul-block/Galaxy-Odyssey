class AttackThrowingStar extends MovableObject {
    image_throwingStar = [
        "img/main character sprites/Character 01/Png/Projectile/P1.png",
        "img/main character sprites/Character 01/Png/Projectile/P1_01.png",
        "img/main character sprites/Character 01/Png/Projectile/P1_02.png",
        "img/main character sprites/Character 01/Png/Projectile/P1_03.png",
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };


    /**
    * Create a new throwing star object.
    * @param {number} x - Initial x position of the throwing star.
    * @param {number} y - Initial y position of the throwing star.
    */
    constructor(x, y, direction) {
        super().loadImage(
            "img/main character sprites/Character 01/Png/Projectile/P1.png",
        );
        this.loadImages(this.image_throwingStar);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.animate();
        this.shoot(direction);
    }

    /**
     * Animate the throwing star using the images in `image_throwingStar` array.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.image_throwingStar);
        }, 100);
    }

    /**
     * Shoot the throwing star by updating its x position in fixed intervals.
     */
    shoot(direction) {
        setStoppableInterval(() => {
            if (direction === 'right')
                this.x += 30;
            else this.x -= 30;
        }, 25);
    }
}
