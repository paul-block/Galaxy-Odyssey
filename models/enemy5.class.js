class Enemy5 extends MovableObject {
    height = 350;
    width = 330;
    y = 310;
    x = 600 + Math.random() * 3000;
    images_walking = [
        'img/enemy5/Walk/Walk_00.png',
        'img/enemy5/Walk/Walk_01.png',
        'img/enemy5/Walk/Walk_02.png',
        'img/enemy5/Walk/Walk_03.png',
        'img/enemy5/Walk/Walk_04.png',
        'img/enemy5/Walk/Walk_05.png',
        'img/enemy5/Walk/Walk_06.png',
        'img/enemy5/Walk/Walk_07.png',
        'img/enemy5/Walk/Walk_08.png',
        'img/enemy5/Walk/Walk_09.png',
        'img/enemy5/Walk/Walk_10.png',
        'img/enemy5/Walk/Walk_11.png',
        'img/enemy5/Walk/Walk_12.png',
        'img/enemy5/Walk/Walk_13.png',
        'img/enemy5/Walk/Walk_14.png',
        'img/enemy5/Walk/Walk_15.png',
        'img/enemy5/Walk/Walk_16.png',
        'img/enemy5/Walk/Walk_17.png',
        'img/enemy5/Walk/Walk_18.png',
        'img/enemy5/Walk/Walk_19.png',
        'img/enemy5/Walk/Walk_20.png',
        'img/enemy5/Walk/Walk_21.png',
        'img/enemy5/Walk/Walk_22.png',
        'img/enemy5/Walk/Walk_23.png',
        'img/enemy5/Walk/Walk_24.png',
        'img/enemy5/Walk/Walk_25.png',
        'img/enemy5/Walk/Walk_26.png',
        'img/enemy5/Walk/Walk_27.png',
        'img/enemy5/Walk/Walk_28.png',
        'img/enemy5/Walk/Walk_29.png'
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
        'img/enemy5/Attack/Attack_00.png',
        'img/enemy5/Attack/Attack_01.png',
        'img/enemy5/Attack/Attack_02.png',
        'img/enemy5/Attack/Attack_03.png',
        'img/enemy5/Attack/Attack_04.png',
        'img/enemy5/Attack/Attack_05.png',
        'img/enemy5/Attack/Attack_06.png',
        'img/enemy5/Attack/Attack_07.png',
        'img/enemy5/Attack/Attack_08.png',
        'img/enemy5/Attack/Attack_09.png',
        'img/enemy5/Attack/Attack_10.png',
        'img/enemy5/Attack/Attack_11.png',
        'img/enemy5/Attack/Attack_12.png',
        'img/enemy5/Attack/Attack_13.png',
        'img/enemy5/Attack/Attack_14.png',
        'img/enemy5/Attack/Attack_15.png',
        'img/enemy5/Attack/Attack_16.png',
        'img/enemy5/Attack/Attack_17.png',
        'img/enemy5/Attack/Attack_18.png',
        'img/enemy5/Attack/Attack_19.png',
        'img/enemy5/Attack/Attack_20.png',
        'img/enemy5/Attack/Attack_21.png',
        'img/enemy5/Attack/Attack_22.png',
        'img/enemy5/Attack/Attack_23.png',
        'img/enemy5/Attack/Attack_24.png',
        'img/enemy5/Attack/Attack_25.png',
        'img/enemy5/Attack/Attack_26.png',
        'img/enemy5/Attack/Attack_27.png',
        'img/enemy5/Attack/Attack_28.png',
        'img/enemy5/Attack/Attack_29.png',
    ];

    offset = {
        top: 190,
        left: 110,
        right: 110,
        bottom: 40
    };
    hitted = false;
    audio_hitted = new Audio("audio/pop.mp3");
    hp = 20;
    hitTimestamp;

    /**
    * Constructs a new instance of Enemy2.
    *
    * @param {number} x - The initial x-coordinate of the object.
    */
    constructor(x) {
        super().loadImage("img/enemy5/Walk/Walk_00.png");
        this.loadImages(this.images_walking);
        this.loadImages(this.image_dead);
        this.loadImages(this.images_attack);
        this.animate();
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
}
