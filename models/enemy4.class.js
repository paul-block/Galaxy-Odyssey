class Enemy4 extends MovableObject {
    height = 80;
    width = 110;
    y = 545;
    x = 800;
    endPlatformLeft;
    endPlatfromRight;
    attackY;
    otherDirection = false;
    hitTimestamp;

    images_idle = [
        "img/enemies/Char03/Idle/skeleton-Idle_0.png",
        "img/enemies/Char03/Idle/skeleton-Idle_1.png",
        "img/enemies/Char03/Idle/skeleton-Idle_2.png",
        "img/enemies/Char03/Idle/skeleton-Idle_3.png",
        "img/enemies/Char03/Idle/skeleton-Idle_4.png",
        "img/enemies/Char03/Idle/skeleton-Idle_5.png",
        "img/enemies/Char03/Idle/skeleton-Idle_6.png",
        "img/enemies/Char03/Idle/skeleton-Idle_7.png",
        "img/enemies/Char03/Idle/skeleton-Idle_8.png",
        "img/enemies/Char03/Idle/skeleton-Idle_9.png",
        "img/enemies/Char03/Idle/skeleton-Idle_10.png",
        "img/enemies/Char03/Idle/skeleton-Idle_11.png",
        "img/enemies/Char03/Idle/skeleton-Idle_12.png",
        "img/enemies/Char03/Idle/skeleton-Idle_13.png",
        "img/enemies/Char03/Idle/skeleton-Idle_14.png",
        "img/enemies/Char03/Idle/skeleton-Idle_15.png",
        "img/enemies/Char03/Idle/skeleton-Idle_16.png",
        "img/enemies/Char03/Idle/skeleton-Idle_17.png"
    ];
    images_walking = [
        "img/enemies/Char03/Walk/skeleton-Walk_0.png",
        "img/enemies/Char03/Walk/skeleton-Walk_1.png",
        "img/enemies/Char03/Walk/skeleton-Walk_2.png",
        "img/enemies/Char03/Walk/skeleton-Walk_3.png",
        "img/enemies/Char03/Walk/skeleton-Walk_4.png",
        "img/enemies/Char03/Walk/skeleton-Walk_5.png",
        "img/enemies/Char03/Walk/skeleton-Walk_6.png",
        "img/enemies/Char03/Walk/skeleton-Walk_7.png",
        "img/enemies/Char03/Walk/skeleton-Walk_8.png",
        "img/enemies/Char03/Walk/skeleton-Walk_9.png",
        "img/enemies/Char03/Walk/skeleton-Walk_10.png",
        "img/enemies/Char03/Walk/skeleton-Walk_11.png",
        "img/enemies/Char03/Walk/skeleton-Walk_12.png",
        "img/enemies/Char03/Walk/skeleton-Walk_13.png",
        "img/enemies/Char03/Walk/skeleton-Walk_14.png",
        "img/enemies/Char03/Walk/skeleton-Walk_15.png",
        "img/enemies/Char03/Walk/skeleton-Walk_16.png",
        "img/enemies/Char03/Walk/skeleton-Walk_17.png"
    ];
    image_dead = [
        "img/enemies/DeathFx/skeleton-animation_0.png",
        "img/enemies/DeathFx/skeleton-animation_1.png",
        "img/enemies/DeathFx/skeleton-animation_2.png",
        "img/enemies/DeathFx/skeleton-animation_3.png",
        "img/enemies/DeathFx/skeleton-animation_4.png",
        "img/enemies/DeathFx/skeleton-animation_5.png",
        "img/enemies/DeathFx/skeleton-animation_6.png",
        "img/enemies/DeathFx/skeleton-animation_7.png",
        "img/enemies/DeathFx/skeleton-animation_8.png",
        "img/enemies/DeathFx/skeleton-animation_9.png",
        "img/enemies/DeathFx/skeleton-animation_10.png",
        "img/enemies/DeathFx/skeleton-animation_11.png",
        "img/enemies/DeathFx/skeleton-animation_12.png",
        "img/enemies/DeathFx/skeleton-animation_13.png",
        "img/enemies/DeathFx/skeleton-animation_14.png",
        "img/enemies/DeathFx/skeleton-animation_15.png",
        "img/enemies/DeathFx/skeleton-animation_16.png",
        "img/enemies/DeathFx/skeleton-animation_17.png",
        "img/WorldBackground/transparent.png",
        "img/WorldBackground/transparent.png"
    ];

    images_attack = [
        "img/enemies/Char03/Attack/skeleton-Attack_0.png",
        "img/enemies/Char03/Attack/skeleton-Attack_1.png",
        "img/enemies/Char03/Attack/skeleton-Attack_2.png",
        "img/enemies/Char03/Attack/skeleton-Attack_3.png",
        "img/enemies/Char03/Attack/skeleton-Attack_4.png",
        "img/enemies/Char03/Attack/skeleton-Attack_5.png",
        "img/enemies/Char03/Attack/skeleton-Attack_6.png",
        "img/enemies/Char03/Attack/skeleton-Attack_7.png",
        "img/enemies/Char03/Attack/skeleton-Attack_8.png",
        "img/enemies/Char03/Attack/skeleton-Attack_9.png",
        "img/enemies/Char03/Attack/skeleton-Attack_10.png",
        "img/enemies/Char03/Attack/skeleton-Attack_11.png",
        "img/enemies/Char03/Attack/skeleton-Attack_12.png",
        "img/enemies/Char03/Attack/skeleton-Attack_13.png",
        "img/enemies/Char03/Attack/skeleton-Attack_14.png",
        "img/enemies/Char03/Attack/skeleton-Attack_15.png",
        "img/enemies/Char03/Attack/skeleton-Attack_16.png",
        "img/enemies/Char03/Attack/skeleton-Attack_17.png",
        "img/enemies/Char03/Attack/skeleton-Attack_18.png",
        "img/enemies/Char03/Attack/skeleton-Attack_19.png",
        "img/enemies/Char03/Attack/skeleton-Attack_20.png",
        "img/enemies/Char03/Attack/skeleton-Attack_21.png",
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    hitted = false;
    audio_hitted = new Audio("audio/pop.mp3");
    hp = 20;

    /**
 * Constructs a new instance of Enemy4.
 *
 * @param {number} y - The y-coordinate of the object.
 * @param {number} x - The x-coordinate of the object.
 * @param {number} walkToLeft - The distance to walk to the left.
 * @param {number} walkToRight - The distance to walk to the right.
 */
    constructor(y, x, walkToLeft, walkToRight) {
        super().loadImage("img/enemies/Char03/Idle/skeleton-Idle_0.png");
        this.loadImages(this.images_walking);
        this.loadImages(this.image_dead);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_idle);
        this.animate();
        this.attackY = y;
        this.y = y;
        this.x = x;
        this.endPlatformLeft = x - walkToLeft;
        this.endPlatfromRight = x + walkToRight;
        this.speed = 0.25 + Math.random() * 0.25;
    }

    /**
  * Starts the animations for the object and triggers the right one based on given conditions
  */
    animate() {
        setInterval(() => {
            if (this.otherDirection == false) {
                if (this.x <= this.endPlatformLeft) {
                    this.otherDirection = true;
                } else {
                    this.moveLeft();
                }
            } else {
                if (this.x >= this.endPlatfromRight) {
                    this.otherDirection = false;
                } else {
                    this.moveRight();
                }
            }
        }, 1000 / 60);


        setInterval(() => {
            if (!this.hitted) this.playAnimation(this.images_walking);
            else if (this.hp == 10 && this.hitted) {
                this.playAnimation(this.images_attack);
                this.height = 85;
                this.width = 115;
                this.y = this.attackY;
            }
        }, 35);

        setInterval(() => {
            if (this.hp <= 0 && !this.isDying) {
                this.isDying = true;
                this.playAnimationOnce(this.image_dead);
                this.speed = 0;
            }
        }, 50);
    }

    /**
 * Plays the death animation of the object.
 *
 * @returns {Promise} - A promise that resolves after the death animation finishes.
 */
    playDeathAnimation() {
        this.playAnimation(this.image_dead);
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

}
