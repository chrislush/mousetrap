class Sprite {
    constructor(config) {
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        this.width = config.width;
        this.height = config.height;
        this.offsetX = config.offsetX;
        this.offsetY = config.offsetY;

        this.shadow = new Image();
        this.useShadow = config.useShadow || false;
        if (this.useShadow) {
            this.shadow.src = "./images/shadow.png";
        }
        
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }
        
        this.animations = config.animations || {
            "idle-down": [ [0, 4], [1, 4] ],
            "idle-right": [ [0, 5], [1, 5] ],
            "idle-up": [ [0, 6], [1, 6] ],
            "idle-left": [ [0, 7], [1, 7] ],
            "walk-down": [ [0, 0], [1, 0], [2, 0], [1, 0]],
            "walk-right": [ [0, 1], [1, 1], [2, 1], [1, 1]],
            "walk-up": [ [0, 2], [1, 2], [2, 2], [1, 2]],
            "walk-left": [ [0, 3], [1, 3], [2, 3], [1, 3]]
        }
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        if (this.currentAnimation === "idle-down" || this.currentAnimation === "idle-right" || this.currentAnimation === "idle-up" || this.currentAnimation === "idle-left") {
            this.animationFrameLimit = 20;
        } else {
            this.animationFrameLimit = config.animationFrameLimit || 12
        }
       
        this.animationFrameProgress = this.animationFrameLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress--;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame++;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + 96 - 64 + toolbox.withGrid(12.5) - cameraPerson.x;
        const y = this.gameObject.y + 252 - 64 - 64 + toolbox.withGrid(3.5) - cameraPerson.y;

        const [frameX, frameY] = this.frame;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
        this.isLoaded && ctx.drawImage(this.image, frameX * this.width, frameY * this.height, this.width, this.height, x + this.offsetX, y + this.offsetY, this.width, this.height);
        
        this.updateAnimationProgress();     
    }
}