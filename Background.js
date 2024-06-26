class Background {
    constructor() {
        const canvas = document.getElementById('background');
        this.ctx = canvas.getContext("2d");
    }

    // draw outer circle in the background
    drawOutline(center, radius) {
        this.ctx.lineWidth = 4
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'black'
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = '#aaa';
        this.ctx.fill();
    }
}
