class OverworldEvent {
    constructor({ map, event }) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehaviour({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        const completeHandler = e => {
            if(e.detail.whoId === this.event.who) {
                document.removeEventListener("MouseStandingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("MouseStandingComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehaviour({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction
        })

        const completeHandler = e => {
            if(e.detail.whoId === this.event.who) {
                document.removeEventListener("MouseWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("MouseWalkingComplete", completeHandler)
    }

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"));
    }

    changeMap(resolve) {
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.scene.startMap(window.OverworldMaps[this.event.map]);
            resolve();
            sceneTransition.fadeOut();
        });    
    }

    introScreen(resolve) {
        const introScreen = new IntroScreen({
            text1: this.event.text1,
            text2: this.event.text2,
            text3: this.event.text3,
            text4: this.event.text4,
            text5: this.event.text5,
            text6: this.event.text6,
            map: this.map,
            onComplete: () => resolve()
        });
        introScreen.init(document.querySelector(".game-container"));
    }

    outroScreen(resolve) {
        const outroScreen = new OutroScreen({
            text: this.event.text,
            onComplete: () => {
                this.map.scene.startMap(window.OverworldMaps.CreditsScreen);
                outroScreen.fadeOut();
                resolve();
                const credits = new Credits();
                setTimeout(() => {
                    credits.init(document.querySelector(".game-container")); 
                }, 3500);
            }
        });
        outroScreen.init(document.querySelector(".game-container"));
    }

    titleSequence(resolve) {
        const titles = new TitleSequence({
            textA: this.event.textA,
            textB: this.event.textB,
            onComplete: () => resolve()
        })
        titles.init(document.querySelector(".game-container"));
    }

    puzzleOne(resolve) {
        const puzzleOne = new PuzzleOne({
            onComplete: (solved) => {
                resolve(solved ? "SOLVED" : "UNSOLVED");
            }
        })
        puzzleOne.init(document.querySelector(".game-container"));
    }

    puzzleTwo(resolve) {
        const puzzleTwo = new PuzzleTwo({
            onComplete: (solved) => {
                resolve(solved ? "SOLVED" : "UNSOLVED");
            }
        })
        puzzleTwo.init(document.querySelector(".game-container"));
    }

    puzzleThree(resolve) {
        const puzzleThree = new PuzzleThree({
            onComplete: (solved) => {
                resolve(solved ? "SOLVED" : "UNSOLVED");
            }
        })
        puzzleThree.init(document.querySelector(".game-container"));
    }

    puzzleFour(resolve) {
        const puzzleFour = new PuzzleFour({
            onComplete: (solved) => {
                resolve(solved ? "SOLVED" : "UNSOLVED");
            }
        })
        puzzleFour.init(document.querySelector(".game-container"));
    }

    combinationLock(resolve) {
        const combinationLock = new CombinationLock({
            onComplete: (solved) => {
                resolve(solved ? "SOLVED" : "UNSOLVED");
            }
        })
        combinationLock.init(document.querySelector(".game-container"));
    }

    addStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = true;
        resolve();
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}