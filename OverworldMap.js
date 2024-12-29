class OverworldMap {
    constructor(config) {
        this.scene = null;
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.backgroundImage = new Image();
        this.backgroundImage.src = config.backgroundSrc;
        this.wallShadows = new Image();
        this.wallShadows.src = config.wallShadowsSrc;
        this.light = new Image();
        this.light.src = config.lightSrc;
        this.hasCameraPerson = config.hasCameraPerson || false;
        this.isTitleScreen = config.isTitleScreen || false;

        this.isCutscenePlaying = false;
    }

    drawBackgroundImage(ctx, cameraPerson) {
        ctx.drawImage(this.backgroundImage, toolbox.withGrid(12.5) - cameraPerson.x, toolbox.withGrid(3.5) - cameraPerson.y);
    }

    drawWallShadows(ctx, cameraPerson) {
        ctx.drawImage(this.wallShadows, toolbox.withGrid(12.5) - cameraPerson.x, toolbox.withGrid(3.5) - cameraPerson.y);
    }

    drawLight(ctx, cameraPerson) {
        ctx.drawImage(this.light, toolbox.withGrid(12.5) - cameraPerson.x, toolbox.withGrid(3.5) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = toolbox.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            
            let object = this.gameObjects[key];
            object.id = key;
            
            
            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            const result = await eventHandler.init();
            if (result === "UNSOLVED") {
                break;
            }
        }

        this.isCutscenePlaying = false;
    }

    checkForActionCutscene() {
        const tom = this.gameObjects["tom"];
        const nextCoords = toolbox.nextPosition(tom.x, tom.y, tom.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
        });
        if (!this.isCutscenePlaying && match && match.interacting.length) {

            const relevantScenario = match.interacting.find(scenario => {
                return (scenario.required || []).every(sf => {
                    return playerState.storyFlags[sf];
                });
            });
            relevantScenario && this.startCutscene(relevantScenario.events);
        }
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    
    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = toolbox.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    EscapeRoom: {
        backgroundSrc: "./images/mainbackground.png",
        wallShadowsSrc: "./images/wallshadows.png",
        lightSrc: "./images/blank.png",
        hasCameraPerson: true,
        gameObjects: {
            tom: new Mouse({
                isPlayerControlled: true,
                useShadow: true,
                x: toolbox.withGrid(13),
                y: toolbox.withGrid(5)
            }),
            mirror: new Mirror({
                x: toolbox.withGrid(3),
                y: toolbox.withGrid(-1),
            }),
            chairs: new Chairs({
                x: toolbox.withGrid(2),
                y: toolbox.withGrid(7),
            }),
            fireplace: new Fireplace({
                x: toolbox.withGrid(3),
                y: toolbox.withGrid(0),
                storyFlag: "PUZZLE_ONE_SOLVED",
                interacting: [
                    {
                        required: ["PUZZLE_ONE_SOLVED"],
                        events: [
                            { type: "textMessage", text: "Already solved that one!" },
                            { type: "textMessage", text: "Let's see... The first digit of the exit code is 1, if memory serves?" }
                        ]
                    },
                    {
                        required: ["PUZZLE_ONE_ATTEMPTED"],
                        events: [
                            { type: "textMessage", text: "Let me try this one again." },
                            { type: "puzzleOne" },
                            { type: "addStoryFlag", flag: "PUZZLE_ONE_SOLVED" }
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "Oh now, what's this here?" },
                            { type: "addStoryFlag", flag: "PUZZLE_ONE_ATTEMPTED" },
                            { type: "puzzleOne" },
                            { type: "addStoryFlag", flag: "PUZZLE_ONE_SOLVED" }
                        ]
                    }
                ]
            }),
            wardrobe: new Wardrobe({
                x: toolbox.withGrid(18),
                y: toolbox.withGrid(0),
                storyFlag: "PUZZLE_TWO_SOLVED",
                interacting: [
                    {
                        required: ["PUZZLE_TWO_SOLVED"],
                        events: [
                            { type: "textMessage", text: "Cut and dried, that one." },
                            { type: "textMessage", text: "The second digit of the exit code is 2. Good stuff." }
                        ]
                    },
                    {
                        required: ["PUZZLE_TWO_ATTEMPTED"],
                        events: [
                            { type: "textMessage", text: "Let me try this one again." },
                            { type: "puzzleTwo" },
                            { type: "addStoryFlag", flag: "PUZZLE_TWO_SOLVED" }
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "Hmmm, what have we here?" },
                            { type: "addStoryFlag", flag: "PUZZLE_TWO_ATTEMPTED" },
                            { type: "puzzleTwo" },
                            { type: "addStoryFlag", flag: "PUZZLE_TWO_SOLVED" }
                        ]
                    }
                ]
            }),
            chest: new Chest({
                x: toolbox.withGrid(22),
                y: toolbox.withGrid(6),
                storyFlag: "PUZZLE_THREE_SOLVED",
                interacting: [
                    {
                        required: ["PUZZLE_THREE_SOLVED"],
                        events: [
                            { type: "textMessage", text: "Done and done." },
                            { type: "textMessage", text: "Let's see here... Ahh, yes! The third digit of the exit code is 0, I remember now!" }
                        ]
                    },
                    {
                        required: ["PUZZLE_THREE_ATTEMPTED"],
                        events: [
                            { type: "textMessage", text: "Let me try this one again." },
                            { type: "puzzleThree" },
                            { type: "addStoryFlag", flag: "PUZZLE_THREE_SOLVED" }
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "Most conspicuous!" },
                            { type: "addStoryFlag", flag: "PUZZLE_THREE_ATTEMPTED" },
                            { type: "puzzleThree" },
                            { type: "addStoryFlag", flag: "PUZZLE_THREE_SOLVED" }
                        ]
                    }
                ]
            }),
            book: new Book({
                x: toolbox.withGrid(3),
                y: toolbox.withGrid(7),
                storyFlag: "PUZZLE_FOUR_SOLVED",
                interacting: [
                    {
                        required: ["PUZZLE_FOUR_SOLVED"],
                        events: [
                            { type: "textMessage", text: "Wouldn't mind another one of these... What am I saying? This isn't the time for recreational puzzling!" },
                            { type: "textMessage", text: "The final digit of the exit code is 3, got you." }
                        ]
                    },
                    {
                        required: ["PUZZLE_FOUR_ATTEMPTED"],
                        events: [
                            { type: "textMessage", text: "Let me try this one again." },
                            { type: "puzzleFour" },
                            { type: "addStoryFlag", flag: "PUZZLE_FOUR_SOLVED" }
                        ]
                    },
                    {
                        events: [
                            { type: "textMessage", text: "Good job I've got my magnifying glass with me, else I'd have missed this one..." },
                            { type: "addStoryFlag", flag: "PUZZLE_FOUR_ATTEMPTED" },
                            { type: "puzzleFour" },
                            { type: "addStoryFlag", flag: "PUZZLE_FOUR_SOLVED" }
                        ]
                    }
                ]
            }),
            door: new Door({
                x: toolbox.withGrid(13),
                y: toolbox.withGrid(-1),
                storyFlag: "UNLOCKED_DOOR",
                interacting: [
                    {
                        events: [
                            { type: "textMessage", text: "Let's get out of here!"},
                            { type: "combinationLock" },
                            { type: "addStoryFlag", flag: "UNLOCKED_DOOR" },
                            { type: "outroScreen", text: "To be continued" }
                        ]
                    }
                ]
            }) 
        },
        walls: {
            [toolbox.asGridCoords(0, -1)] : true,
            [toolbox.asGridCoords(1, -1)] : true,
            [toolbox.asGridCoords(2, -1)] : true,
            [toolbox.asGridCoords(3, -1)] : true,
            [toolbox.asGridCoords(4, -1)] : true,
            [toolbox.asGridCoords(5, -1)] : true,
            [toolbox.asGridCoords(6, -1)] : true,
            [toolbox.asGridCoords(7, -1)] : true,
            [toolbox.asGridCoords(8, -1)] : true,
            [toolbox.asGridCoords(9, -1)] : true,
            [toolbox.asGridCoords(10, -1)] : true,
            [toolbox.asGridCoords(11, -1)] : true,
            [toolbox.asGridCoords(12, -1)] : true,
            [toolbox.asGridCoords(13, -1)] : true,
            [toolbox.asGridCoords(14, -1)] : true,
            [toolbox.asGridCoords(15, -1)] : true,
            [toolbox.asGridCoords(16, -1)] : true,
            [toolbox.asGridCoords(17, -1)] : true,
            [toolbox.asGridCoords(18, -1)] : true,
            [toolbox.asGridCoords(19, -1)] : true,
            [toolbox.asGridCoords(20, -1)] : true,
            [toolbox.asGridCoords(21, -1)] : true,
            [toolbox.asGridCoords(22, -1)] : true,
            [toolbox.asGridCoords(23, -1)] : true,
            [toolbox.asGridCoords(24, -1)] : true,
            [toolbox.asGridCoords(25, -1)] : true,
            [toolbox.asGridCoords(26, -1)] : true,
            [toolbox.asGridCoords(0, 10)] : true,
            [toolbox.asGridCoords(1, 10)] : true,
            [toolbox.asGridCoords(2, 10)] : true,
            [toolbox.asGridCoords(3, 10)] : true,
            [toolbox.asGridCoords(4, 10)] : true,
            [toolbox.asGridCoords(5, 10)] : true,
            [toolbox.asGridCoords(6, 10)] : true,
            [toolbox.asGridCoords(7, 10)] : true,
            [toolbox.asGridCoords(8, 10)] : true,
            [toolbox.asGridCoords(9, 10)] : true,
            [toolbox.asGridCoords(10, 10)] : true,
            [toolbox.asGridCoords(11, 10)] : true,
            [toolbox.asGridCoords(12, 10)] : true,
            [toolbox.asGridCoords(13, 10)] : true,
            [toolbox.asGridCoords(14, 10)] : true,
            [toolbox.asGridCoords(15, 10)] : true,
            [toolbox.asGridCoords(16, 10)] : true,
            [toolbox.asGridCoords(17, 10)] : true,
            [toolbox.asGridCoords(18, 10)] : true,
            [toolbox.asGridCoords(19, 10)] : true,
            [toolbox.asGridCoords(20, 10)] : true,
            [toolbox.asGridCoords(21, 10)] : true,
            [toolbox.asGridCoords(22, 10)] : true,
            [toolbox.asGridCoords(23, 10)] : true,
            [toolbox.asGridCoords(24, 10)] : true,
            [toolbox.asGridCoords(25, 10)] : true,
            [toolbox.asGridCoords(26, 10)] : true,
            [toolbox.asGridCoords(0, 0)] : true,
            [toolbox.asGridCoords(0, 1)] : true,
            [toolbox.asGridCoords(0, 2)] : true,
            [toolbox.asGridCoords(0, 3)] : true,
            [toolbox.asGridCoords(0, 4)] : true,
            [toolbox.asGridCoords(0, 5)] : true,
            [toolbox.asGridCoords(0, 6)] : true,
            [toolbox.asGridCoords(0, 7)] : true,
            [toolbox.asGridCoords(26, 0)] : true,
            [toolbox.asGridCoords(26, 1)] : true,
            [toolbox.asGridCoords(26, 2)] : true,
            [toolbox.asGridCoords(26, 3)] : true,
            [toolbox.asGridCoords(26, 4)] : true,
            [toolbox.asGridCoords(26, 5)] : true,
            [toolbox.asGridCoords(26, 6)] : true,
            [toolbox.asGridCoords(26, 7)] : true,
            [toolbox.asGridCoords(1, 0)] : true,
            [toolbox.asGridCoords(2, 0)] : true,
            [toolbox.asGridCoords(4, 0)] : true,
            [toolbox.asGridCoords(5, 0)] : true,
            [toolbox.asGridCoords(16, 0)] : true,
            [toolbox.asGridCoords(17, 0)] : true,
            [toolbox.asGridCoords(19, 0)] : true,
            [toolbox.asGridCoords(20, 0)] : true,
            [toolbox.asGridCoords(21, 6)] : true,
            [toolbox.asGridCoords(23, 6)] : true,
            [toolbox.asGridCoords(1, 7)] : true,
            [toolbox.asGridCoords(2, 7)] : true,
            [toolbox.asGridCoords(2, 8)] : true,
            [toolbox.asGridCoords(2, 9)] : true,
        }
    },
    TitleScreen: {
        isTitleScreen: true,
        backgroundSrc: "./images/titlebackground.png",
        wallShadowsSrc: "./images/titlewallshadows.png",
        lightSrc: "./images/titlelight.png",
        gameObjects: {
            tom: new Mouse({
                useShadow: true,
                x: toolbox.withGrid(25),
                y: toolbox.withGrid(8)
            })
        }
    },
    CreditsScreen: {
        backgroundSrc: "./images/creditsbackground.png",
        wallShadowsSrc: "./images/blank.png",
        lightSrc: "./images/blank.png",
        gameObjects: {}
    }
}