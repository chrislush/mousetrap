class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <img src="./images/tom-portrait.png" alt="Tom's Portrait">
            <div class="text-container">
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
            </div>
        `);

        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text
        })

        this.element.querySelector("button").addEventListener("click", () => {
            this.done();
        });

        this.enterListener = new KeyPressListener("Enter", () => {
            this.done();
        });
    }

    done() {
        if (this.revealingText.isDone) {
            this.element.remove();
            this.enterListener.unbind();
            this.onComplete();
        } else {
            this.revealingText.skipToEnd();
        }   
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}