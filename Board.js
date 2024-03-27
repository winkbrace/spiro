class Board {
    state = 'placing';

    constructor() {
        this.canvas = document.getElementById('disc');
        const margin = 10;
        this.ctx = this.canvas.getContext("2d");
        this.center = {x: this.canvas.width / 2, y: this.canvas.height / 2};
        this.radius = this.canvas.height / 2 - margin;
    }

    drawRadiusAtAngle(angle) {
        // find intersection with circle
        const intersectionX = this.center.x + this.radius * Math.cos(angle);
        const intersectionY = this.center.y + this.radius * Math.sin(angle);

        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.moveTo(this.center.x, this.center.y);
        this.ctx.setLineDash([5, 15]);
        this.ctx.lineTo(intersectionX, intersectionY);
        this.ctx.strokeStyle = 'orange';
        this.ctx.stroke();
    }

    getAngleAtMouse(mouse) {
        const dx = mouse.x - this.center.x;
        const dy = mouse.y - this.center.y;
        return Math.atan2(dy, dx); // tan(a) = O / A
    }

    getMousePosition(mouseEvent) {
        const rect = this.canvas.getBoundingClientRect();

        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top,
        }
    }
}
