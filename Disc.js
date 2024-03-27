class Disc {
    constructor(board, radius, color) {
        this.board = board;
        this.radius = radius;
        this.canvas = document.getElementById('disc');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = color
    }

    drawDisc(angle) {
        const center = {
            x: this.board.center.x + (this.board.radius - this.radius) * Math.cos(angle),
            y: this.board.center.y + (this.board.radius - this.radius) * Math.sin(angle)
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, this.radius, 0, 2 * Math.PI);
        this.ctx.globalAlpha = 0.5;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;

        this.drawSpiral(center, angle, 2);
    }

    /**
     * The spiral goes loops times round the disc
     */
    drawSpiral(center, angle, loops) {
        let a, x, y;
        const lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.setLineDash([lineWidth, 20]);
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = 'black'
        const totalRadians = 2 * Math.PI * loops; // multiply by 2*pi to convert loops to radians
        for (let i = 0; i <= totalRadians; i += 0.01) {
            a = i;
            x = center.x + this.radius * a * Math.cos(a) / (4 * Math.PI);
            y = center.y + this.radius * a * Math.sin(a) / (4 * Math.PI);
            this.ctx.lineTo(x, y)
        }
        this.ctx.stroke();
    }
}
