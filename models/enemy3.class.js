class Enemy3 extends MovableObject {
    height = 120;
    width = 100;
    y = 510;
    x = 600 + Math.random() * 3000;
    images_walking = [
        "img/enemies/Char02/Walk/skeleton-Walk_0.png",
        "img/enemies/Char02/Walk/skeleton-Walk_1.png",
        "img/enemies/Char02/Walk/skeleton-Walk_2.png",
        "img/enemies/Char02/Walk/skeleton-Walk_3.png",
        "img/enemies/Char02/Walk/skeleton-Walk_4.png",
        "img/enemies/Char02/Walk/skeleton-Walk_5.png",
        "img/enemies/Char02/Walk/skeleton-Walk_6.png",
        "img/enemies/Char02/Walk/skeleton-Walk_7.png",
        "img/enemies/Char02/Walk/skeleton-Walk_8.png",
        "img/enemies/Char02/Walk/skeleton-Walk_9.png",
        "img/enemies/Char02/Walk/skeleton-Walk_10.png",
        "img/enemies/Char02/Walk/skeleton-Walk_11.png",
        "img/enemies/Char02/Walk/skeleton-Walk_12.png",
        "img/enemies/Char02/Walk/skeleton-Walk_13.png",
        "img/enemies/Char02/Walk/skeleton-Walk_14.png",
        "img/enemies/Char02/Walk/skeleton-Walk_15.png",
        "img/enemies/Char02/Walk/skeleton-Walk_16.png",
        "img/enemies/Char02/Walk/skeleton-Walk_17.png",
        "img/enemies/Char02/Walk/skeleton-Walk_18.png",
        "img/enemies/Char02/Walk/skeleton-Walk_19.png",
        "img/enemies/Char02/Walk/skeleton-Walk_20.png",
        "img/enemies/Char02/Walk/skeleton-Walk_21.png",
        "img/enemies/Char02/Walk/skeleton-Walk_22.png",
        "img/enemies/Char02/Walk/skeleton-Walk_23.png",
        "img/enemies/Char02/Walk/skeleton-Walk_24.png",
        "img/enemies/Char02/Walk/skeleton-Walk_25.png",
        "img/enemies/Char02/Walk/skeleton-Walk_26.png",
        "img/enemies/Char02/Walk/skeleton-Walk_27.png",
        "img/enemies/Char02/Walk/skeleton-Walk_28.png",
        "img/enemies/Char02/Walk/skeleton-Walk_29.png",
        "img/enemies/Char02/Walk/skeleton-Walk_30.png",
        "img/enemies/Char02/Walk/skeleton-Walk_31.png",
        "img/enemies/Char02/Walk/skeleton-Walk_32.png",
        "img/enemies/Char02/Walk/skeleton-Walk_33.png",
        "img/enemies/Char02/Walk/skeleton-Walk_34.png"
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
        "img/enemies/Char02/Attack/skeleton-Attack_0.png",
        "img/enemies/Char02/Attack/skeleton-Attack_1.png",
        "img/enemies/Char02/Attack/skeleton-Attack_2.png",
        "img/enemies/Char02/Attack/skeleton-Attack_3.png",
        "img/enemies/Char02/Attack/skeleton-Attack_4.png",
        "img/enemies/Char02/Attack/skeleton-Attack_5.png",
        "img/enemies/Char02/Attack/skeleton-Attack_6.png",
        "img/enemies/Char02/Attack/skeleton-Attack_7.png",
        "img/enemies/Char02/Attack/skeleton-Attack_8.png",
        "img/enemies/Char02/Attack/skeleton-Attack_9.png",
        "img/enemies/Char02/Attack/skeleton-Attack_10.png",
        "img/enemies/Char02/Attack/skeleton-Attack_11.png",
        "img/enemies/Char02/Attack/skeleton-Attack_12.png",
        "img/enemies/Char02/Attack/skeleton-Attack_13.png",
        "img/enemies/Char02/Attack/skeleton-Attack_14.png",
        "img/enemies/Char02/Attack/skeleton-Attack_15.png",
        "img/enemies/Char02/Attack/skeleton-Attack_16.png",
        "img/enemies/Char02/Attack/skeleton-Attack_17.png",
        "img/enemies/Char02/Attack/skeleton-Attack_18.png",
        "img/enemies/Char02/Attack/skeleton-Attack_19.png",
        "img/enemies/Char02/Attack/skeleton-Attack_20.png",
        "img/enemies/Char02/Attack/skeleton-Attack_21.png",
        "img/enemies/Char02/Attack/skeleton-Attack_22.png",
        "img/enemies/Char02/Attack/skeleton-Attack_23.png",
        "img/enemies/Char02/Attack/skeleton-Attack_24.png",
        "img/enemies/Char02/Attack/skeleton-Attack_25.png",
        "img/enemies/Char02/Attack/skeleton-Attack_26.png",
        "img/enemies/Char02/Attack/skeleton-Attack_27.png",
        "img/enemies/Char02/Attack/skeleton-Attack_28.png",
        "img/enemies/Char02/Attack/skeleton-Attack_29.png",
        "img/enemies/Char02/Attack/skeleton-Attack_30.png",
    ];

    offset = {
        top: 10,
        left: 0,
        right: 5,
        bottom: 0
    };
    hitted = false;
    audio_hitted = new Audio("audio/pop.mp3");
    hp = 20;
    newXset = false;
    hitTimestamp;

    /**
     * Constructs a new instance of Enemy3.
     *
     * @param {number} x - The initial x-coordinate of the object.
     */
    constructor(x) {
        super().loadImage("img/enemies/Char02/Walk/skeleton-Walk_0.png");
        this.loadImages(this.images_walking);
        this.loadImages(this.image_dead);
        this.loadImages(this.images_attack);
        this.animate();
        this.setXforAttack();
        this.speed = 0.2 + Math.random() * 0.25;
        this.x = x;
    }

    /**
    * Starts the animations for the object and triggers the right one based on given conditions
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.hitted) this.playAnimation(this.images_walking);
            else if (this.hp == 10 && this.hitted) {
                if (this.speed <= 0.5) {
                    this.speed = this.speed + Math.random() * 0.1;
                }
                this.height = 210;
                this.width = 200;
                this.y = 450;
                if (!this.newXset) {
                    this.x = this.x - 70;
                    this.newXset = true;
                }
                this.offset = {
                    top: 50,
                    left: 50,
                    right: 40,
                    bottom: 40
                };
                this.playAnimation(this.images_attack);
            }
        }, 30);
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
        return new Promise((resolve) => {
            this.playAnimation(this.image_dead);
            setTimeout(resolve, 2000);
        });
    }

    /**
  * Adjusts the x position of the object while attacking
  */
    setXforAttack() {
        if (!this.newXset) {
            this.x = this.x - 100;
        }
    }
}
