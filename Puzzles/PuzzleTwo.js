class PuzzleTwo {
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
            <h1>PUZZLE N<sup>o</sup> 2</h1>

            <div class="puzzle-description">
            <p>A census taker approaches a woman leaning on her gate and asks about the ages of her children. She says, "I have three children and the product of their ages, all integers (whole numbers), is 36." The census taker claims that this information will not suffice. The woman continues, "The sum of their ages is the number on this gate." The census taker does some calculations and claims still not to have enough information. The woman enters her house, but before slamming the door tells the census taker, "I have to see to my eldest child who is in bed with measles." The census taker departs, satisfied.</p>
            <p>How old are the woman's three children?</p>
            </div>
            
            <div class="answer-div">
            <label for="answer-input">Enter your answers below in ascending order, starting with the youngest child's age on the far left:</label>
            <div class="answer-input-container">
            <input class="answer-input" id="answer-input1" value="" type="number" min="0" max="999"/>
            <input class="answer-input" id="answer-input2" value="" type="number" min="0" max="999"/>
            <input class="answer-input" id="answer-input3" value="" type="number" min="0" max="999"/>
            </div>
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
        if (this.element.querySelector("#answer-input1").value === "" || this.element.querySelector("#answer-input2").value === "" || this.element.querySelector("#answer-input3").value === "") {
            alert("Please input something. You never know...");
            return;
        }

        if (this.element.querySelector("#answer-input1").value === "2" && this.element.querySelector("#answer-input2").value === "2" && this.element.querySelector("#answer-input3").value === "9") {
            this.element.querySelector(".content").innerHTML = (`
                <h1 id="result">CORRECT</h1>
                <h2 id="message">The second digit of the exit code is 2</h2>
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
            <h1>PUZZLE N<sup>o</sup> 2</h1>

            <div class="puzzle-description">
            <p>A census taker approaches a woman leaning on her gate and asks about the ages of her children. She says, "I have three children and the product of their ages, all integers (whole numbers), is 36." The census taker claims that this information will not suffice. The woman continues, "The sum of their ages is the number on this gate." The census taker does some calculations and claims still not to have enough information. The woman enters her house, but before slamming the door tells the census taker, "I have to see to my eldest child who is in bed with measles." The census taker departs, satisfied.</p>
            <p>How old are the woman's three children?</p>
            </div>
            
            <div class="answer-div">
            <label for="answer-input">Enter your answers below in ascending order, starting with the youngest child's age on the far left:</label>
            <div class="answer-input-container">
            <input class="answer-input" id="answer-input1" value="" type="number" min="0" max="999"/>
            <input class="answer-input" id="answer-input2" value="" type="number" min="0" max="999"/>
            <input class="answer-input" id="answer-input3" value="" type="number" min="0" max="999"/>
            </div>
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