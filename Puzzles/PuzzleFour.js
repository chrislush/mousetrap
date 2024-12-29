class PuzzleFour {
    constructor({ onComplete }) {
        this.onComplete = onComplete;
        this.element = null;
        this.solved = false;
        this.solutionNumbers = [[1, 3, 5, 2, 4], 
                                [3, 2, 4, 5, 1], 
                                [5, 4, 3, 1, 2], 
                                [2, 5, 1, 4, 3], 
                                [4, 1, 2, 3, 5]];
        this.solutionShapes = [["diamond", "star", "circle", "square", "hexagon"], 
                               ["square", "circle", "diamond", "hexagon", "star"], 
                               ["star", "square", "hexagon", "circle", "diamond"], 
                               ["hexagon", "diamond", "square", "star", "circle"], 
                               ["circle", "hexagon", "star", "diamond", "square"]];
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
            <h1>PUZZLE N<sup>o</sup> 4</h1>

            <div class="puzzle-description" id="puzzle-4">
            <p>Each horizontal row and vertical column should contain five different shapes (square, circle, diamond, star and hexagon) and five different numbers (1 to 5).</p>
            <p>Every square will contain one number and one shape and no combination may be repeated anywhere else in the puzzle. If, for instance, a square contains a 3 and a diamond, no other square containing a 3 will also contain a diamond and no other square with a diamond will contain a 3.</p>
            <p>Click the tile you want to change: use the left mouse button to cycle through the numbers 1 to 5, and the right mouse button to cycle through the five shapes.</p>
            </div>
            
            <div class="answer-div">
            <div class="options-div">
            <button type="button" id="start-btn">START PUZZLE</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>

            </div>
            </div>
        `);
        
        this.element.querySelector("#start-btn").addEventListener("click", () => {
            this.startPuzzle();
        });

        this.element.querySelector("#return-btn").addEventListener("click", () => {
            this.done();
        });
    }

    startPuzzle() {
        this.element.querySelector(".content").innerHTML = (`
            <h1>PUZZLE N<sup>o</sup> 4</h1>

            <div class="combiku-board">
            </div>
            
            <div class="answer-div">
            <div class="options-div">
            <button type="button" id="back-btn">INSTRUCTIONS</button>
            <button type="button" id="check-btn">SUBMIT</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>
        `);

        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
                let newTile = document.createElement("div");
                newTile.classList.add("tile");
                newTile.id = `row${i}-col${j}`;
                this.element.querySelector(".combiku-board").appendChild(newTile);
                
                this.element.querySelector(`#row${i}-col${j}`).addEventListener("contextmenu", event => {
                    event.preventDefault();
                });

                if (!(((i == 1) && (j == 1)) || ((i == 1) && (j == 2)) 
                    || ((i == 3) && (j == 2)) || ((i == 3) && (j == 3)) 
                    || ((i == 4) && (j == 1)) || ((i == 4) && (j == 2)) 
                    || ((i == 4) && (j == 3)) || ((i == 4) && (j == 5)) 
                    || ((i == 5) && (j == 1)) || ((i == 5) && (j == 2)))) {
                    this.element.querySelector(`#row${i}-col${j}`).addEventListener("contextmenu", event => {
                        this.incrementShape(i, j);
                    });
                }

                if (!(((i == 1) && (j == 2)) || ((i == 2) && (j == 2)) 
                    || ((i == 2) && (j == 4)) || ((i == 4) && (j == 2)) 
                    || ((i == 4) && (j == 3)) || ((i == 4) && (j == 5)))) {
                    this.element.querySelector(`#row${i}-col${j}`).addEventListener("click", event => {
                        this.incrementNumber(i, j)
                    });
                }
            }
        }

        // Set permanent tiles
        this.element.querySelector("#row1-col1").classList.add("diamond");
        this.element.querySelector("#row1-col2").classList.add("star");
        this.element.querySelector("#row3-col2").classList.add("square");
        this.element.querySelector("#row3-col3").classList.add("hexagon");
        this.element.querySelector("#row4-col1").classList.add("hexagon");
        this.element.querySelector("#row4-col2").classList.add("diamond");
        this.element.querySelector("#row4-col3").classList.add("square");
        this.element.querySelector("#row4-col5").classList.add("circle");
        this.element.querySelector("#row5-col1").classList.add("circle");
        this.element.querySelector("#row5-col2").classList.add("hexagon");

        this.element.querySelector("#row1-col2").innerText = "3";
        this.element.querySelector("#row2-col2").innerText = "2";
        this.element.querySelector("#row2-col4").innerText = "5";
        this.element.querySelector("#row4-col2").innerText = "5";
        this.element.querySelector("#row4-col3").innerText = "1";
        this.element.querySelector("#row4-col5").innerText = "3";
        

        this.element.querySelector("#back-btn").addEventListener("click", () => {
            this.giveInstructions();
        });
        
        this.element.querySelector("#check-btn").addEventListener("click", () => {
            this.checkAnswer();
        });

        this.element.querySelector("#return-btn").addEventListener("click", () => {
            this.done();
        });
    }

    giveInstructions() {
        this.element.querySelector(".content").innerHTML = (`
            <h1>PUZZLE N<sup>o</sup> 4</h1>

            <div class="puzzle-description" id="puzzle-4">
            <p>Each horizontal row and vertical column should contain five different shapes (square, circle, diamond, star and hexagon) and five different numbers (1 to 5).</p>
            <p>Every square will contain one number and one shape and no combination may be repeated anywhere else in the puzzle. If, for instance, a square contains a 3 and a diamond, no other square containing a 3 will also contain a diamond and no other square with a diamond will contain a 3.</p>
            <p>Click the tile you want to change: use the left mouse button to cycle through the numbers 1 to 5, and the right mouse button to cycle through the five shapes.</p>
            </div>
            
            <div class="answer-div">
            <div class="options-div">
            <button type="button" id="start-btn">START PUZZLE</button>
            <button type="button" id="return-btn">RETURN TO GAME</button>
            </div>
            </div>
        `);

        this.element.querySelector("#start-btn").addEventListener("click", () => {
            this.startPuzzle();
        });

        this.element.querySelector("#return-btn").addEventListener("click", () => {
            this.done();
        });
    }

    incrementNumber(row, column) {
        if (this.element.querySelector(`#row${row}-col${column}`).innerText === "") {
            this.element.querySelector(`#row${row}-col${column}`).innerText = "1";
        } else if (parseInt(this.element.querySelector(`#row${row}-col${column}`).innerText) < 5) {
            this.element.querySelector(`#row${row}-col${column}`).innerText = (parseInt(this.element.querySelector(`#row${row}-col${column}`).innerText) + 1).toString();
        } else {
            this.element.querySelector(`#row${row}-col${column}`).innerText = "";
        }
    }

    incrementShape(row, column) {
        if (!(this.element.querySelector(`#row${row}-col${column}`).classList.length > 1)) {
            this.element.querySelector(`#row${row}-col${column}`).classList.add("square");
        } else if (this.element.querySelector(`#row${row}-col${column}`).classList.contains("square")) {
            this.element.querySelector(`#row${row}-col${column}`).classList.remove("square");
            this.element.querySelector(`#row${row}-col${column}`).classList.add("circle");
        } else if (this.element.querySelector(`#row${row}-col${column}`).classList.contains("circle")) {
            this.element.querySelector(`#row${row}-col${column}`).classList.remove("circle");
            this.element.querySelector(`#row${row}-col${column}`).classList.add("diamond");
        } else if (this.element.querySelector(`#row${row}-col${column}`).classList.contains("diamond")) {
            this.element.querySelector(`#row${row}-col${column}`).classList.remove("diamond");
            this.element.querySelector(`#row${row}-col${column}`).classList.add("star");
        } else if (this.element.querySelector(`#row${row}-col${column}`).classList.contains("star")) {
            this.element.querySelector(`#row${row}-col${column}`).classList.remove("star");
            this.element.querySelector(`#row${row}-col${column}`).classList.add("hexagon");
        } else {
            this.element.querySelector(`#row${row}-col${column}`).classList.remove("hexagon");
        }
    }

    checkAnswer() {
        let tickCount = 0;

        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
                if (this.element.querySelector(`#row${i}-col${j}`).classList.contains(this.solutionShapes[i - 1][j - 1]) && this.element.querySelector(`#row${i}-col${j}`).innerText == this.solutionNumbers[i - 1][j - 1]) {
                    tickCount++;
                }
            }
        }

        if (tickCount === 25) {
            this.element.querySelector(".content").innerHTML = (`
                <h1 id="result">CORRECT</h1>
                <h2 id="message">The first digit of the exit code is 4</h2>
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
                this.startPuzzle();
            });
        }

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