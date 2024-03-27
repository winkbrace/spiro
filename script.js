const canvas = document.getElementById('lines');
const ctx = canvas.getContext("2d");
ctx.lineWidth = 4;

// center and radius of drawing area
const board = new Board(
    {x: canvas.width / 2, y: canvas.height / 2},
    canvas.height / 2 - 10
)

const bg = new Background();
bg.drawOutline(board.center, board.radius);

disc = new Disc(board, 150, 'yellow');

document.addEventListener('mousemove', function(evt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    const mouse = board.getMousePosition(canvas, evt);
    const angle = board.getAngleToPosition(mouse);
    board.drawRadiusAtAngle(ctx, angle);

    // draw disc inside the outer circle touching the outer circle at intersection
    disc.drawDisc(angle);
});
