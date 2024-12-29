class Mouse extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehaviour(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }
    }

    startBehaviour(state, behaviour) {
        this.direction = behaviour.direction;

        if (behaviour.type = "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }

            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 32;
            this.updateSprite(state);
        }

        if (behaviour.type = "stand") {
            setTimeout(() => {
                toolbox.emitEvent("MouseStandingComplete", {
                    whoId: this.id
                })
            }, behaviour.time)
        }
    }

    updatePosition() {
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining--;
        }

        if (this.movingProgressRemaining === 0) {
            toolbox.emitEvent("MouseWalkingComplete", {
                whoId: this.id
            })
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }

        this.sprite.setAnimation("idle-" + this.direction);
    }
}