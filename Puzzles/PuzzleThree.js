class PuzzleThree {
    constructor({ onComplete }) {
        this.onComplete = onComplete;
        this.element = null;
        this.solved = false;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Puzzle");
        this.element.innerHTML = (`
            <div class="puzzle-container">
            <div class="tall"></div>
            <div class="mid"></div>
            <div class="wide"></div>

            <div class="content">
            <h1>PUZZLE N<sup>o</sup> 3</h1>

            <div class="puzzle-description" id="puzzle-3">
            <p>Ella, Cam and Bert each have some sweets.</p>
            <p>Ella gives one third of her sweets to Cam. Cam gives one third of all the sweets she now has to Bert. Bert then gives one third of all the sweets he now has to Ella.</p>
            <p>All three friends end up having the same number of sweets, as is fair, they decide.</p>
            <p>Bert began with 40 sweets (sugar free, of course). How many sweets did Cam have originally?</p>
            </div>
            
            <div class="answer-div">
            <label for="answer-input">Enter your answer below:</label>
            <input id="answer-input" value="" type="number" min="0" max="999"/>
            <div class="options-div">
            <button type="button" id="check-btn">SUBMIT</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>

            <img src="./images/candycane.png">

            </div>
            </div>
        `);

        this.element.querySelector("#check-btn").addEventListener("click", () => {
            this.checkAnswer();
        });

        this.element.querySelector("#return-btn").addEventListener("click", () => {
            this.done();
        });
    }

    checkAnswer() {
        if (this.element.querySelector("#answer-input").value === "") {
            alert("Please input something. You never know...");
            return;
        }

        if (this.element.querySelector("#answer-input").value === "50") {
            this.element.querySelector(".content").innerHTML = (`
                <h1 id="result">CORRECT</h1>
                <h2 id="message">The third digit of the exit code is 0</h2>
                <div class="options-div">
                <button type="button" id="return-btn">RETURN TO GAME</button>
                </div>
            `);
            this.solved = true;
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
            <h1>PUZZLE N<sup>o</sup> 3</h1>

            <div class="puzzle-description" id="puzzle-3">
            <p>Ella, Cam and Bert each have some sweets.</p>
            <p>Ella gives one third of her sweets to Cam. Cam gives one third of all the sweets she now has to Bert. Bert then gives one third of all the sweets he now has to Ella.</p>
            <p>All three friends end up having the same number of sweets, as is fair, they decide.</p>
            <p>Bert began with 40 sweets (sugar free, of course). How many sweets did Cam have originally?</p>
            </div>
            
            <div class="answer-div">
            <label for="answer-input">Enter your answer below:</label>
            <input id="answer-input" value="" type="number" min="0" max="999"/>
            <div class="options-div">
            <button type="button" id="check-btn">SUBMIT</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>

            <img src="./images/candycane.png">
        `);
        
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