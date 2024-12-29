class Wardrobe extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/wardrobe-spritesheet.png",
            width: 162,
            height: 162,
            offsetX: -17,
            offsetY: -26,
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