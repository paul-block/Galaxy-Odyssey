class Diamonds extends DrawableObject {
    score = 0;
    fontSize = '32px';
    fontColor = 'lightblue';

    /**
     * Constructs a new object, inherits properties and methods from the superclass,
     * and sets the x, y, width, and height properties of the object.
     */
    constructor() {
        super();
        this.x = 70;
        this.y = 120;
        this.width = 60;
        this.height = 60;
    }

    /**
    * Adds the specified score to the object's current score.
    *
    * @param {number} newScore - The score to add.
    */
    addScore(newScore) {
        this.score += newScore;
    }

    /**
    * Subtracts the specified score from the object's current score.
    *
    * @param {number} newScore - The score to subtract.
    */
    minusScore(newScore) {
        this.score -= newScore;
    }
}
