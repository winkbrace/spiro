class Board {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    drawRadiusAtAngle(ctx, angle) {
        // find intersection with circle
        const intersectionX = this.center.x + this.radius * Math.cos(angle);
        const intersectionY = this.center.y + this.radius * Math.sin(angle);

        ctx.moveTo(this.center.x, this.center.y);
        ctx.setLineDash([5, 15])
        ctx.lineTo(intersectionX, intersectionY);
        ctx.strokeStyle = 'orange'
        ctx.stroke();
    }

    getAngleToPosition(pos) {
        const dx = pos.x - this.center.x;
        const dy = pos.y - this.center.y;
        return Math.atan2(dy, dx); // tan(a) = O / A
    }

    getMousePosition(canvas, evt) {
        const rect = canvas.getBoundingClientRect();

        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        }
    }
}
