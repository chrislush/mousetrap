class Fireplace extends GameObject {
    constructor(config) {
        super(config);
        this.sprite = new Sprite({
            gameObject: this,
            src: "./images/fireplace-spritesheet.png",
            width: 100,
            height: 100,
            offsetX: 14,
            offsetY: 23,
            useShadow: false,
            animations: {
                "unlit" : [ [0, 0] ],
                "lit" : [ [1, 0] ]
            },
            currentAnimation: "unlit"
        });

        this.storyFlag = config.storyFlag;
    }

    update() {
        this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag] ? "lit" : "unlit";
    }
}