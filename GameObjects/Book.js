class Book extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/book-spritesheet.png",
            width: 46,
            height: 46,
            offsetX: 8,
            offsetY: 50,
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