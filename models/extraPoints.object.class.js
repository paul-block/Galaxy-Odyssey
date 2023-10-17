class ExtraPoints extends DrawableObject {
    x;
    y;
    score = 0;
    fontSize = '64px';
    fontColor = 'lightblue';

    /**
     * Creates a new instance of the class. 
     * Initializes width, height, and coordinates to default values.
     */
    constructor() {
        super();
        this.width = 120;
        this.height = 120;
        this.x = 500;
        this.y = 380;
    }

    /**
     * Displays the current score on the user interface.
     * The score is automatically hidden after 3 seconds and reset to zero.
     */
    show() {
        document.getElementById('extraPointsContainer').classList.remove('d-none');
        document.getElementById('extraPoints').innerText = this.score;
        setTimeout(() => {
            document.getElementById('extraPointsContainer').classList.add('d-none');
            this.score = 0;
        }, 3000);
    }

    /**
    * Increases the score by the given value.
    *
    * @param {number} newScore - The value by which the score is to be increased.
    */
    addScore(newScore) {
        this.score += newScore;
    }

    /**
    * Decreases the score by the given value.
    *
    * @param {number} newScore - The value by which the score is to be decreased.
    */
    minusScore(newScore) {
        this.score -= newScore;
    }
}
