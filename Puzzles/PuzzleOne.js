class PuzzleOne {
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
            <h1>PUZZLE N<sup>o</sup> 1</h1>

            <div class="puzzle-description">
            <p>Brie loves testing the logic of her friends Ella, Cam and Bert, so she announces, "I'll write a positive integer (whole number) on each of your foreheads. None of the numbers are the same, and two of the numbers add up to the third."</p>
            <p>She writes the numbers on their heads, then asks Ella what her number is. Ella sees that Cam has 20 on her forehead and Bert has 30 on his. She thinks for a moment and says, "I don't know what my number is." Cam pipes in, "I also don't know my number", and Bert adds, "Me neither."</p>
            <p>Brie gleefully exclaims, "I've finally stumped you guys!" Ella responds, "Not so fast, now I know my number."</p>
            <p>What is Ella's number?</p>
            </div>
            
            <div class="answer-div">
            <label for="answer-input">Enter your answer below:</label>
            <input id="answer-input" value="" type="number" min="0" max="999"/>
            <div class="options-div">
            <button type="button" id="check-btn">SUBMIT</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>

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
                <h2 id="message">The first digit of the exit code is 1</h2>
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
            <h1>PUZZLE N<sup>o</sup> 1</h1>

            <div class="puzzle-description">
            <p>Brie loves testing the logic of her friends Ella, Cam and Bert, so she announces, "I'll write a positive integer (whole number) on each of your foreheads. None of the numbers are the same, and two of the numbers add up to the third."</p>
            <p>She writes the numbers on their heads, then asks Ella what her number is. Ella sees that Cam has 20 on her forehead and Bert has 30 on his. She thinks for a moment and says, "I don't know what my number is." Cam pipes in, "I also don't know my number", and Bert adds, "Me neither."</p>
            <p>Brie gleefully exclaims, "I've finally stumped you guys!" Ella responds, "Not so fast, now I know my number."</p>
            <p>What is Ella's number?</p>
            </div>
            
            <div class="answer-div">
            <label for="answer-input">Enter your answer below:</label>
            <input id="answer-input" value="" type="number" min="0" max="999"/>
            <div class="options-div">
            <button type="button" id="check-btn">SUBMIT</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
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

    done() {
        this.element.remove();
        this.onComplete(this.solved);
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}