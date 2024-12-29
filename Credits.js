class Credits {
    constructor(config) {
        this.element = null;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Credits");

        this.element.innerHTML = (`
            <div class="credits-container">
            <p class="attribution">Old paper texture sourced from indieground.net under the name 'Vintage Paper Texture'</p>
            <p class="attribution">'Door creaking open' by Glitchedtones sourced from uppbeat.io</p>
            <p class="attribution">'Footsteps walking slowly past' by THE FOUNDATION sourced from uppbeat.io</p>
            <p class="attribution">'Building destruction - smashed bricks' by Epic Stock Media sourced from uppbeat.io</p>
            <p class="thank-you">Special thanks to Renate Lush for colouring Tom's sprites, and to Ben Harris for his invaluable counsel :)</p>
            </div>
        `);
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
        this.element.classList.add("fade-in");
    }
}