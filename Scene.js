class Scene {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    gameLoopStepWork() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let cameraPerson;
        if (this.map.hasCameraPerson) {
            cameraPerson = this.map.gameObjects.tom; 
        } else {
            cameraPerson = {
                x: toolbox.withGrid(12.5),
                y: toolbox.withGrid(3.5)
            }
        }
        
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.directionInput.direction,
                map: this.map
            })
        })

        this.map.drawBackgroundImage(this.ctx, cameraPerson);

        Object.values(this.map.gameObjects).sort((a, b) => {
            return a.y - b.y;
        }).forEach(object => {
            object.sprite.draw(this.ctx, cameraPerson);
        })

        this.map.drawWallShadows(this.ctx, cameraPerson);

        this.map.drawLight(this.ctx, cameraPerson);
    }

    startGameLoop() {
        let previousMs;
        const step = 1/80;

        const stepFn = (timestampMs) => {
            if (previousMs === undefined) {
                previousMs = timestampMs;   
            }
            
            let delta = (timestampMs - previousMs) / 1000;
            while (delta >= step) {
                this.gameLoopStepWork();
                delta -= step;
            }
            previousMs = timestampMs - (delta * 1000);
            
            requestAnimationFrame(stepFn)
        }
        requestAnimationFrame(stepFn);
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            this.map.checkForActionCutscene();
        });
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.scene = this;
        this.map.mountObjects();
    }

    init() {
        this.startMap(window.OverworldMaps.TitleScreen);

        this.bindActionInput();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

        this.map.startCutscene([
            { type: "titleSequence", textA: "MOUSETRAP", textB: "PRESS ANY KEY TO START" },
            { who: "tom", type: "walk", direction: "left" },
            { who: "tom", type: "walk", direction: "left" },
            { who: "tom", type: "walk", direction: "left" },
            { who: "tom", type: "walk", direction: "left" },
            { who: "tom", type: "walk", direction: "left" },
            { who: "tom", type: "walk", direction: "up" },
            { who: "tom", type: "walk", direction: "up" },
            { type: "introScreen",
                text1: "Renowned private investigator Tom D'Auvergne is hot on the heels of his latest lead. All clues have led him here, but little does our sleuth know, a trap has been laid, and it's up to this cunning mouse to puzzle his way out.",
                text2: "Controls:",
                text3: "Navigate game interface - WASD and/or arrow keys",
                text4: "Investigate - enter",
                text5: "Input answer - (computer) mouse and keyboard ",
                text6: "Now, let's cut to the cheese"
            },
            { type: "textMessage", text: "Urghhh, my head... What in the name of Saint Uguzo just happened? Where am I?" },
            { type: "textMessage", text: "Magnifying glass is still intact, at least." },
            { type: "textMessage", text: "Well, as I see it, there's nothing to be done but take a good look around!" }
        ]);
    }
}