class Chairs extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/chairs.png",
            width: 148,
            height: 148,
            offsetX: -40,
            offsetY: 32,
            useShadow: false,
            animations: {
                "default" : [ [0, 0] ],
            },
            currentAnimation: "default"
        });
    }
}