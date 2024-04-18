class Disc {
    board;
    radius;
    color;
    handles;
    selectedHandle;
    handleRadius = 5;
    visible = true;

    prevAngle = 0;
    currentRotation = 0;

    constructor(board, size, color) {
        this.board = board;
        this.setSize(size);
        this.color = color;
        this.canvas = document.getElementById('disc');
        this.ctx = this.canvas.getContext("2d");
    }

    setSize(size) {
        // ensure the radius is a factor of the board radius. This determines the amount of tops.
        this.radius = board.radius * size / 24;
    }

    resetCurrentRotation() {
        this.currentRotation = 0;
    }

    selectHandle(position) {
        // find handle closest to position
        const distances = this.handles.map((handle) => {
            return { handle, distance: this.distanceFromCenter(position, handle) };
        });
        // sort by distance
        distances.sort((a, b) => a.distance - b.distance);

        for (let i in this.handles) {
            if (this.handles[i] === distances[0].handle) {
                this.selectedHandle = i;
            }
        }

        this.drawSelectedHandle(false);
    }

    drawSelectedHandle(dontGlitch) {
        if (typeof(this.selectedHandle) === 'undefined') {
            return;
        }

        const handle = this.handles[this.selectedHandle];
        if (! handle) {
            return;
        }

        // draw current hole
        this.ctx.beginPath();
        this.ctx.arc(handle.x, handle.y, 8, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();

        lines.drawTo(handle, dontGlitch);
    }

    drawDisc(angle) {
        if (! this.visible) {
            return;
        }

        const center = this.findCenter(angle);

        this.resetCanvas();
        this.ctx.arc(center.x, center.y, this.radius, 0, 2 * Math.PI);
        this.ctx.globalAlpha = 0.75;
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;

        let handleAngle = angle;
        if (this.board.state !== 'placing') {
            handleAngle -= this.currentRotation * 2 * Math.PI;

            // Both circumferences are calculated with 2*PI*r, so the constant 2*PI can be omitted.
            const rotations = (this.board.radius / this.radius);
            handleAngle *= -2 * rotations / Math.PI; // rotation speed of the disc

            // track the currentRotation by checking when we swap pos/neg sign (at the west position)
            // We use value 2, although it swaps sign at PI. When you move quickly the angle can still be far away.
            // We don't want to check at 0, because that's at the wrong side of the board.
            if (this.prevAngle < -2 && angle > 2) {
                this.currentRotation++;
            } else if (this.prevAngle > 2 && angle < -2) {
                this.currentRotation--;
            }

            this.prevAngle = angle;
        }

        // Around PI the calculation glitches, so only draw shorter lines around that point.
        const dontGlitch = Math.abs(angle) > 3;

        this.createHandles(center, handleAngle);
        this.drawHandles(dontGlitch);
    }

    findCenter(angle) {
        return {
            x: this.board.center.x + (this.board.radius - this.radius) * Math.cos(angle),
            y: this.board.center.y + (this.board.radius - this.radius) * Math.sin(angle)
        }
    }

    /**
     * The spiral goes loops times round the disc
     */
    createHandles(center, angle) {
        const loops = 2.5;
        let x, y, ratio;
        let a = 0;
        let stepSize = 0.1;
        let power = 2; // how fast the spiral widens

        this.handles = [];
        let distance = this.handleRadius;

        // this.ctx.beginPath();
        // this.ctx.lineWidth = 4;
        // this.ctx.strokeStyle = 'pink';

        for (let i = 0; i <= loops * Math.PI * 1.9; i += stepSize) {
            a += stepSize;
            ratio = Math.pow(a / (loops * Math.PI * 2), power);
            x = center.x + ratio * this.radius * Math.cos(a + angle);
            y = center.y + ratio * this.radius * Math.sin(a + angle);

            // this.ctx.lineTo(x, y);

            // add handle on spiral every x distance from the center
            if (this.distanceFromCenter(center, { x, y }) >= distance) {
                this.handles.push({ x, y });
                distance += 5;
            }
        }

        // this.ctx.stroke();
    }

    drawHandles(dontGlitch) {
        for (let handle of this.handles) {
            // console.log(handle);
            this.ctx.beginPath();
            this.ctx.arc(handle.x, handle.y, this.handleRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'black';
            this.ctx.fill();
        }

        this.drawSelectedHandle(dontGlitch);
    }

    distanceFromCenter(center, pos) {
        const dx = pos.x - center.x;
        const dy = pos.y - center.y;

        return Math.sqrt(dx ** 2 + dy ** 2); // Pythagoras
    }

    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
    }

    toggleVisibility(visible) {
        this.visible = visible;
        if (this.visible)
            this.drawDisc(0);
        else
            this.resetCanvas();
    }
}
