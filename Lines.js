class Lines {
    constructor(width, color) {
        this.canvas = document.getElementById('lines');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'blue';

        this.stop();
    }

    setColor(color) {
        this.ctx.strokeStyle = color;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stop();
    }

    stop() {
        this.prevHandle = null;
        this.ctx.beginPath();
    }

    drawTo(handle) {
        if (board.state === 'placing') {
            return;
        }

        if (! this.prevHandle) {
            this.prevHandle = handle;
            return;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.prevHandle.x, this.prevHandle.y)
        this.ctx.lineTo(handle.x, handle.y)
        this.ctx.stroke();

        this.prevHandle = handle;
    }
}
