class Door extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/door-spritesheet.png",
            width: 144,
            height: 144,
            offsetX: -8,
            offsetY: 4,
            useShadow: false,
            animations: {
                "closed" : [ [0, 0] ],
                "open" : [ [1, 0] ]
            },
            currentAnimation: "closed"
        });

        this.storyFlag = config.storyFlag;
    }

    update() {
        this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag] ? "open" : "closed";
    }
}