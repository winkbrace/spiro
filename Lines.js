class Lines {
    constructor(width) {
        const canvas = document.getElementById('lines');
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = width;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }
}
