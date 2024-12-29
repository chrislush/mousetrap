class Mirror extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/mirror.png",
            width: 90,
            height: 90,
            offsetX: 19,
            offsetY: -22,
            useShadow: false,
            animations: {
                "default" : [ [0, 0] ]
            },
            currentAnimation: "default"
        });
    }
}