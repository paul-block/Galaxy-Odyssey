class ThrowingStars extends DrawableObject {
    score = 0;
    fontSize = '32px';
    fontColor = 'lightblue';

    /**
    * Create throwing stars.
    */
    constructor() {
        super();
        this.x = 70;
        this.y = 200;
        this.width = 60;
        this.height = 60;
    }

}
