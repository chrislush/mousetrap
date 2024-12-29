class TitleSequence {
    constructor({ textA, textB, onComplete }) {
        this.textA = textA;
        this.textB = textB;
        this.onComplete = onComplete;
        this.elementA = null;
        this.elementB = null;
    }

    createElementA() {
        this.elementA = document.createElement("div");
        this.elementA.classList.add("title-div");
        this.elementA.innerHTML = (`
            <h1 class="title"></h1>
        `);
        
        this.revealingTextA = new RevealingText({
            element: this.elementA.querySelector(".title"),
            text: this.textA,
            speed: 120
        })
    }
    
    createElementB() {
        this.elementB = document.createElement("div");
        this.elementB.classList.add("instructions-div");
        this.elementB.innerHTML = (`
            <h2 class="instructions"></h2>
        `);

        this.revealingTextB = new RevealingText({
            element: this.elementB.querySelector(".instructions"),
            text: this.textB
        })

        this.keyPressListener = new UniversalKeyPressListener(() => {
            this.done();
        });
    }

    done() {
        if (this.revealingTextB.isDone) {
            this.elementA.remove();
            this.elementB.remove();
            this.keyPressListener.unbind();
            this.onComplete();
        };
    }
    
    init(container) {
        setTimeout(() => {
            this.createElementA();
            container.appendChild(this.elementA);
            this.revealingTextA.init();
        }, 1000);

        setTimeout(() => {
            this.createElementB();
            container.appendChild(this.elementB);
            this.revealingTextB.init();
        }, 2750);
    }
}
    