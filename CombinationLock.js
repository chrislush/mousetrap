class CombinationLock {
    constructor({ onComplete }) {
        this.onComplete = onComplete;
        this.element = null;
        this.solved = false;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Door");
        this.element.innerHTML = (`
            <div class="lock-container">
            <div class="tall"></div>
            <div class="mid"></div>
            <div class="wide"></div>

            <div class="content">
            <h1>THE FINAL PROBLEM</h1>
            
            <div class="answer-div">
            <label for="input-div">Enter the exit code below:</label>
            <div class="input-div">
            <button type="button" class="answer-input" id="answer-input-1">0</button>
            <button type="button" class="answer-input" id="answer-input-2">0</button>
            <button type="button" class="answer-input" id="answer-input-3">0</button>
            <button type="button" class="answer-input" id="answer-input-4">0</button>
            </div>
            <div class="options-div">
            <button type="button" id="check-btn">SUBMIT</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>

            </div>
            </div>
        `);

        this.element.querySelector("#answer-input-1").addEventListener("click", () => {
            this.incrementValue(1);
        });

        this.element.querySelector("#answer-input-2").addEventListener("click", () => {
            this.incrementValue(2);
        });

        this.element.querySelector("#answer-input-3").addEventListener("click", () => {
            this.incrementValue(3);
        });

        this.element.querySelector("#answer-input-4").addEventListener("click", () => {
            this.incrementValue(4);
        });

        this.element.querySelector("#check-btn").addEventListener("click", () => {
            this.checkAnswer();
        });

        this.element.querySelector("#return-btn").addEventListener("click", () => {
            this.done();
        });
    }

    incrementValue(value) {
        this.element.querySelector(`#answer-input-${value}`).innerText = parseInt(this.element.querySelector(`#answer-input-${value}`).innerText) < 9 ? (parseInt(this.element.querySelector(`#answer-input-${value}`).innerText) + 1).toString() : "0";
    }

    checkAnswer() {
        if (this.element.querySelector("#answer-input-1").innerText === "1" && 
        this.element.querySelector("#answer-input-2").innerText === "2" && 
        this.element.querySelector("#answer-input-3").innerText === "0" && 
        this.element.querySelector("#answer-input-4").innerText === "3") {
            this.element.querySelector(".content").innerHTML = (`
                <h1 id="correct-result">CORRECT</h1>
            `);
            this.solved = true;
            setTimeout(() => {
                this.done();
            }, 1500);
        } else {
            this.element.querySelector(".content").innerHTML = (`
                <h1 id="result">INCORRECT</h1>
                <h2 id="message">Nice try, but not quite...</h2>
                <div class="options-div">
                <button type="button" id="retry-btn">TRY AGAIN</button>
                <button type="button" id="return-btn">RETURN TO GAME</button>
                </div>
            `);
            this.element.querySelector("#retry-btn").addEventListener("click", () => {
                this.retry();
            });
        }
        this.element.querySelector("#return-btn").addEventListener("click", () => {
            this.done();
        });
    }

    retry() {
        this.element.querySelector(".content").innerHTML = (`
            <h1>THE FINAL PROBLEM</h1>
            
            <div class="answer-div">
            <label for="input-div">Enter the exit code below:</label>
            <div class="input-div">
            <button type="button" class="answer-input" id="answer-input-1">0</button>
            <button type="button" class="answer-input" id="answer-input-2">0</button>
            <button type="button" class="answer-input" id="answer-input-3">0</button>
            <button type="button" class="answer-input" id="answer-input-4">0</button>
            </div>
            <div class="options-div">
            <button type="button" id="check-btn">SUBMIT</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>
        `);

        this.element.querySelector("#answer-input-1").addEventListener("click", () => {
            this.incrementValue(1);
        });

        this.element.querySelector("#answer-input-2").addEventListener("click", () => {
            this.incrementValue(2);
        });

        this.element.querySelector("#answer-input-3").addEventListener("click", () => {
            this.incrementValue(3);
        });

        this.element.querySelector("#answer-input-4").addEventListener("click", () => {
            this.incrementValue(4);
        });
        
        this.element.querySelector("#check-btn").addEventListener("click", () => {
            this.checkAnswer();
        });

        this.element.querySelector("#return-btn").addEventListener("click", () => {
            this.done();
        });
    }

    done() {
        this.element.remove();
        this.onComplete(this.solved);
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}