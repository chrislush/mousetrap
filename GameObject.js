class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./images/tom-spritesheet.png",
            width: config.width || 128,
            height: config.height || 128,
            offsetX: config.offsetX || 0,
            offsetY: config.offsetY || 0,
            useShadow: config.useShadow
        });

        this.interacting = config.interacting || [];
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    update() {
    }
}