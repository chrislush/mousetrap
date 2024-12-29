const toolbox = {
    withGrid(n) {
        return n * 32;
    },
    asGridCoords(x, y) {
        return `${x * 32},${y * 32}`;
    },
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 32;
        if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        } else if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        }
        return {x, y};
    },
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    }
}