// center and radius of drawing area
const board = new Board();

const bg = new Background();
bg.drawOutline(board.center, board.radius);

disc = new Disc(board, 10, 'orange');
lines = new Lines(4, '#00ffff');

function outOfBounds(mouse) {
    return mouse.x > board.canvas.width
        || mouse.y > board.canvas.height
        || mouse.x < 0
        || mouse.y < 0;
}

document.addEventListener('mousedown', function(evt) {
    if (board.state === 'placing') {
        board.state = 'drawing';

        const mouse = board.getMousePosition(evt);

        if (! outOfBounds(mouse)) {
            disc.selectHandle(mouse);
        }
    }
});

document.addEventListener('mouseup', function(evt) {
    if (board.state === 'drawing') {
        board.state = 'placing';
        lines.stop();
        disc.resetCurrentRotation();
    }
});

document.addEventListener('mousemove', function(evt) {
    const mouse = board.getMousePosition(evt);
    let angle = board.getAngleAtMouse(mouse);

    if (board.state === 'placing') {
        angle = 0;
    }
    disc.drawDisc(angle);

    // For debugging
    // board.drawRadiusAtAngle(angle);
});

const colorInput = document.querySelector('#line-color');
colorInput.addEventListener('change', function(event) {
    lines.setColor(event.target.value);
    lines.stop();
});

const discSizeInput = document.querySelector('#disc-size');
discSizeInput.addEventListener('change', function(event) {
    disc.setSize(event.target.value);
    disc.drawDisc(0);
});

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', function(event) {
    lines.clear();
});

const showDiskToggle = document.querySelector('#show-disc');
showDiskToggle.addEventListener('change', function(event) {
    disc.toggleVisibility(event.target.checked);
});
