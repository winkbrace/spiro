class Disc {
    canvas;
    ctx;

    constructor() {
        this.canvas = document.getElementById('disc');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.globalAlpha = 0.5;
    }

    drawDisc(radius, center) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'yellow'
        this.ctx.fill();
    }
}
