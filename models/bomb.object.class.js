class Bomb extends MovableObject {
    image_bomb = [
        "img/bomb.png"
    ];

    image_explosion = [
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_0.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_1.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_2.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_3.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_4.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_5.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_6.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_7.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_8.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_9.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_10.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_11.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_12.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_13.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_14.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_15.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_16.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_17.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_18.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_19.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_20.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_21.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_22.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_23.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_24.png",
        "img/expolosionen sprites/PNG/Fx12/Effect-fx03_text_25.png",
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
    * Creates a new Bomb object and applies gravity and animations.
    * 
    * @param {number} x - The initial x-coordinate of this Bomb.
    * @param {number} y - The initial y-coordinate of this Bomb.
    */
    constructor(x, y) {
        super().loadImage(
            "img/bomb.png",
        );
        this.loadImages(this.image_bomb);
        this.loadImages(this.image_explosion);
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 45;
        this.animate();
        this.applyGravity();
    }

    /**
    * Animates the bomb by switching between two images based on its y-coordinate.
    * If the y-coordinate is less than 470, it plays the bomb image animation.
    * If the y-coordinate is greater than 520, it plays the explosion image animation.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.y < 470) {
                this.playAnimation(this.image_bomb);
            }
        }, 100);
        setStoppableInterval(() => {
            if (this.y > 520) {
                this.playAnimation(this.image_explosion);
            }
        }, 10);
    }
}
