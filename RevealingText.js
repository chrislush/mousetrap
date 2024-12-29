class RevealingText {
    constructor(config) {
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 70;

        this.timeout = null;
        this.isDone = false;
    }

    revealOneCharacter(list) {
        const next = list.splice(0, 1)[0];
        next.span.classList.add("revealed");

        if (list.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list);
            }, next.delayAfter);
        } else {
            this.isDone = true;
        }
    }

    skipToEnd() {
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        });
    }

    init() {
        let characters = [];
        this.text.split("").forEach(character => {

            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);

            let delayAfter;

            if (character === " ") {
                delayAfter = 0;
            } else if (character === ",") {
                delayAfter = 400;
            } else if (character === "." || character === "?" || character === "!") {
                delayAfter = 600;
            } else {
                delayAfter = this.speed;
            }

            characters.push({
                span,
                delayAfter
            });
        })

        this.revealOneCharacter(characters);
    }
}