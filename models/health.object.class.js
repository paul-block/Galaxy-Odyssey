class Health extends DrawableObject {
    score = 100;
    fontSize = '32px';
    fontColor = 'lightblue';

    /**
    * Constructs an instance of the Health status, initializing its properties.
    */
    constructor() {
        super();
        this.x = 70;
        this.y = 45;
        this.width = 60;
        this.height = 60;
    }
}
