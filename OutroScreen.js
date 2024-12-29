class OutroScreen {
    constructor({ text, onComplete }) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("OutroScreen");

        this.element.innerHTML = (`
            <div class="ending-message-container">
            <h1 class="ending-message"></h1>
            </div>
        `);
    }

    writeMessage() {
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".ending-message"),
            text: this.text,
            speed: 50
        });

        this.revealingText.init();

        setTimeout(() => {
            this.element.querySelector(".ending-message-container").insertAdjacentHTML("beforeend", `<p class="continue">Enter</p>`);
            this.element.querySelector(".continue").classList.add("fade-in");
            this.messageDoneListener = new KeyPressListener("Enter", () => {
                this.done();
            });
        }, 2000);
    }
    
    fadeOut() {
        this.element.querySelector(".ending-message-container").classList.add("fade-out");
        this.element.addEventListener("animationend", () => {
            this.element.classList.add("fade-out");
            this.element.addEventListener("animationend", () => {
                this.element.remove();
            }, { once: true });
        }, { once: true });
    }

    done() {
        if (this.revealingText.isDone) {
            this.onComplete();
            this.messageDoneListener.unbind();
        }  
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        this.element.addEventListener("animationend", () => {
            setTimeout(() => {
                this.writeMessage();
            }, 750);
        }, { once: true });
    }
}