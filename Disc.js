class Disc {
    handles;
    selectedHandle;
    handleRadius = 5;

    constructor(board, radius, color) {
        this.board = board;
        this.radius = radius;
        this.color = color;
        this.canvas = document.getElementById('disc');
        this.ctx = this.canvas.getContext("2d");
    }

    selectHandle(position) {
        // find handle closest to position
        const distances = this.handles.map((handle) => {
            return { handle, distance: this.distanceFromCenter(position, handle) };
        });
        // sort by distance
        distances.sort((a, b) => a.distance - b.distance);

        this.selectedHandle = distances[0].handle;

        this.drawSelectedHandle();
    }

    drawSelectedHandle() {
        if (! this.selectedHandle) {
            return;
        }

        this.ctx.beginPath();
        this.ctx.arc(this.selectedHandle.x, this.selectedHandle.y, 8, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'pink';
        this.ctx.fill();
    }

    drawDisc(angle) {
        const center = this.findCenter(angle);

        this.resetCanvas();
        this.ctx.arc(center.x, center.y, this.radius, 0, 2 * Math.PI);
        this.ctx.globalAlpha = 0.75;
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;

        this.createHandles(center, angle);
        this.drawHandles(center, angle);
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
    createHandles(center, angle, loops = 2.5) {
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

    drawHandles() {
        for (let handle of this.handles) {
            // console.log(handle);
            this.ctx.beginPath();
            this.ctx.arc(handle.x, handle.y, this.handleRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'black';
            this.ctx.fill();
        }

        this.drawSelectedHandle();
    }

    distanceFromCenter(center, pos) {
        const dx = pos.x - center.x;
        const dy = pos.y - center.y;

        return Math.sqrt(dx ** 2 + dy ** 2); // Pythagoras
    }

    drawRotation(angle) {
        this.resetCanvas();

        // TODO rotate disk at angle + rotation relevant to circumference difference of board and disk

        this.drawDisc(angle);
    }

    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
    }
}
