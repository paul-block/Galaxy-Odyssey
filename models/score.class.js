class Score extends DrawableObject {

    score = 0;
    fontSize = '42px';
    fontColor = 'lightblue';

    /**
    * Create a score object.
    */
    constructor() {
        super();
        this.x = 910;
        this.y = 60;
        this.width = 60;
        this.height = 60;
    }

    /**
    * Add to the current score.
    * @param {number} newScore - The score to be added.
    */
    addScore(newScore) {
        this.score += newScore;
    }

    /**
    * Subtract from the current score.
    * @param {number} newScore - The score to be subtracted.
    */
    minusScore(newScore) {
        this.score -= newScore;
    }
}
