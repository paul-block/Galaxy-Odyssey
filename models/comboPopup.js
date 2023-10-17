class ComboPupup extends DrawableObject {
    x;
    y;
    score;
    fontSize = '42px';
    fontColor = 'orange';

    /**
      * Constructs a new object, inherits properties and methods from the superclass,
      * and sets the width and height properties of the object.
      */
    constructor() {
        super();
        this.width = 60;
        this.height = 60;
    }

    /**
     * Sets the 'Combo' score and position (x, y) of the object.
     *
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    show(x, y) {
        this.score = 'Combo';
        this.x = x;
        this.y = y;
    }
}
