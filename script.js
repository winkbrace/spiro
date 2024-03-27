// center and radius of drawing area
const board = new Board();

const bg = new Background();
bg.drawOutline(board.center, board.radius);

disc = new Disc(board, 150, 'orange');

document.addEventListener('mousedown', function(evt) {
    if (board.state === 'placing') {
        board.state = 'drawing';

        const mouse = board.getMousePosition(evt);
        disc.selectHandle(mouse);
    }
});

document.addEventListener('mouseup', function(evt) {
    if (board.state === 'drawing') {
        board.state = 'placing';
    }
});

document.addEventListener('mousemove', function(evt) {
    const mouse = board.getMousePosition(evt);
    let angle = board.getAngleAtMouse(mouse);

    if (board.state === 'placing') {
        // snap angle to 90 degrees
        const quarterCircle = Math.PI / 2;
        angle = Math.round(angle / quarterCircle) * quarterCircle;
        disc.drawDisc(angle);
    } else {
        disc.drawRotation(angle);
    }


    // For debugging
    // board.drawRadiusAtAngle(angle);
});
