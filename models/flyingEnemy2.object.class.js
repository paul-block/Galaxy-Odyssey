class FlyingEnemy2 extends MovableObject {
    height = 60;
    width = 90;
    y = 20;
    x = this.characterXcopy + 1000;

    image_dead = [
        "img/DeadSprite/DeadFx_00.png",
        "img/DeadSprite/DeadFx_01.png",
        "img/DeadSprite/DeadFx_02.png",
        "img/DeadSprite/DeadFx_03.png",
        "img/DeadSprite/DeadFx_04.png",
        "img/DeadSprite/DeadFx_05.png",
        "img/DeadSprite/DeadFx_06.png",
        "img/DeadSprite/DeadFx_07.png",
        "img/DeadSprite/DeadFx_08.png",
        "img/DeadSprite/DeadFx_09.png",
        "img/DeadSprite/DeadFx_10.png",
        "img/DeadSprite/DeadFx_11.png",
        "img/DeadSprite/DeadFx_12.png",
        "img/DeadSprite/DeadFx_13.png",
        "img/DeadSprite/DeadFx_14.png",
        "img/DeadSprite/DeadFx_15.png",
        "img/DeadSprite/DeadFx_16.png",
        "img/DeadSprite/DeadFx_17.png",
        "img/DeadSprite/DeadFx_18.png",
        "img/DeadSprite/DeadFx_19.png",
        "img/WorldBackground/transparent.png",
        "img/WorldBackground/transparent.png"
    ];

    images_flying = [
        'img/FlyingEnemy2/Fly/skeleton-Fly_0.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_1.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_2.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_3.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_4.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_5.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_6.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_7.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_8.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_9.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_10.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_11.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_12.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_13.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_14.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_15.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_16.png',
        'img/FlyingEnemy2/Fly/skeleton-Fly_17.png'
    ];

    images_attack = [
        'img/FlyingEnemy2/Attack/skeleton-Attack_0.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_1.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_2.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_3.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_4.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_5.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_6.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_7.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_8.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_9.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_10.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_11.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_12.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_13.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_14.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_15.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_16.png',
        'img/FlyingEnemy2/Attack/skeleton-Attack_17.png'
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    hitted = false;
    dead = false;
    audio_hitted = new Audio("audio/pop.mp3");
    hp = 20;
    drop = false;


    /**
     * Constructs an instance, loading and animating several images and initializing properties.
     *
     * @param {number} bombtime - The bombtime parameter (unused in the constructor, might be used in the extended class).
     * @param {number} y - The initial vertical position of the object.
     * @param {number} [speed=3.5 + Math.random() * 0.75] - The speed of the object.
     */
    constructor(bombtime, y, speed = 3.5 + Math.random() * 0.75) {
        super().loadImage('img/FlyingEnemy2/Fly/skeleton-Fly_0.png');
        this.loadImages(this.images_flying);
        this.loadImages(this.image_dead);
        this.loadImages(this.images_attack);
        this.animate();
        this.speed = speed;
        this.y = y;
    }

    /**
    * Starts the animations for the object and triggers the right one based on given conditions
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.images_attack);
            if (this.hp == 0 && this.dead) {
                this.playAnimationOnce(this.image_dead);
                this.speed = 0;
            }
        }, 50);
    }
}
