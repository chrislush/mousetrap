class IntroScreen {
    constructor(config) {
        this.text1 = config.text1;
        this.text2 = config.text2;
        this.text3 = config.text3;
        this.text4 = config.text4;
        this.text5 = config.text5;
        this.text6 = config.text6;
        this.map = config.map;
        this.onComplete = config.onComplete;
        this.element = null;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("IntroScreen");
    }

    getPaper() {
        this.element.innerHTML = (`
            <div class="letter">
            <p class="letter_p1"></p>
            <p class="letter_p2"></p>
            <p class="letter_p3 controls"></p>
            <p class="letter_p4 controls"></p>
            <p class="letter_p5 controls"></p>
            <p class="letter_p6 gotime"></p>
            </div>
        `);
    }

    writeLetter() {
        this.revealingText1 = new RevealingText({
            element: this.element.querySelector(".letter_p1"),
            text: this.text1,
            speed: 80
        });

        this.revealingText2 = new RevealingText({
            element: this.element.querySelector(".letter_p2"),
            text: this.text2,
            speed: 80
        });

        this.revealingText3 = new RevealingText({
            element: this.element.querySelector(".letter_p3"),
            text: this.text3,
            speed: 80
        });

        this.revealingText4 = new RevealingText({
            element: this.element.querySelector(".letter_p4"),
            text: this.text4,
            speed: 80
        });

        this.revealingText5 = new RevealingText({
            element: this.element.querySelector(".letter_p5"),
            text: this.text5,
            speed: 80
        });

        this.revealingText6 = new RevealingText({
            element: this.element.querySelector(".letter_p6"),
            text: this.text6,
            speed: 80
        });

        this.revealingText1.init();
        this.element.querySelector(".letter").insertAdjacentHTML("beforeend", `<p class="next">Press enter to continue</p>`);
    }
    
    fadeOut() {
        this.element.querySelector(".letter").classList.add("fade-out");
        this.element.addEventListener("animationend", () => {
            this.map.scene.startMap(window.OverworldMaps.EscapeRoom);
            this.element.classList.add("fade-out");
            this.element.addEventListener("animationend", () => {
                this.element.remove();
                this.onComplete();
            }, { once: true });
        }, { once: true });
    }

    partOneDone() {
        if (this.revealingText1.isDone) {
            this.partOneListener.unbind();
            this.partTwoListener = new KeyPressListener("Enter", () => {
                this.partTwoDone();
            });
            this.revealingText2.init();
        } else {
            this.revealingText1.skipToEnd();
        }   
    }

    partTwoDone() {
        if (this.revealingText2.isDone) {
            this.partTwoListener.unbind();
            this.partThreeListener = new KeyPressListener("Enter", () => {
                this.partThreeDone();
            });
            this.revealingText3.init();
        } else {
            this.revealingText2.skipToEnd();
        }     
    }

    partThreeDone() {
        if (this.revealingText3.isDone) {
            this.partThreeListener.unbind();
            this.partFourListener = new KeyPressListener("Enter", () => {
                this.partFourDone();
            });
            this.revealingText4.init();
        } else {
            this.revealingText3.skipToEnd();
        }     
    }

    partFourDone() {
        if (this.revealingText4.isDone) {
            this.partFourListener.unbind();
            this.partFiveListener = new KeyPressListener("Enter", () => {
                this.partFiveDone();
            });
            this.revealingText5.init();
        } else {
            this.revealingText4.skipToEnd();
        }     
    }

    partFiveDone() {
        if (this.revealingText5.isDone) {
            this.partFiveListener.unbind();
            this.partSixListener = new KeyPressListener("Enter", () => {
                this.partSixDone();
            });
            this.revealingText6.init();
        } else {
            this.revealingText5.skipToEnd();
        }     
    }

    partSixDone() {
        if (this.revealingText6.isDone) {
            this.fadeOut();
            this.partSixListener.unbind();
        } else {
            this.revealingText6.skipToEnd();
        }   
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        this.element.addEventListener("animationend", () => {
            const audio1 = new Audio("./music/door-creaking.mp3");
            const audio2 = new Audio("./music/footsteps.mp3");
            const audio3 = new Audio("./music/impact.mp3");
            
            audio1.addEventListener("ended", () => {
                audio2.play();
            });
            
            audio2.addEventListener("ended", () => {
                audio3.play();
            });
            
            audio3.addEventListener("ended", () => {
                this.getPaper();
                
                this.element.addEventListener("animationend", () => {
                    this.writeLetter();
                }, { once: true });
                
                this.partOneListener = new KeyPressListener("Enter", () => {
                    this.partOneDone();
                });
            });
            
            audio1.play();
        }, { once: true });   
    }
}