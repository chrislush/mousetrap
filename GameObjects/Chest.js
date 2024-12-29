class Chest extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/chest-spritesheet.png",
            width: 104,
            height: 104,
            offsetX: 12,
            offsetY: 32,
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