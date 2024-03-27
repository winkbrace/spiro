const canvas = document.getElementById('lines');
const ctx = canvas.getContext("2d");
ctx.lineWidth = 4;

// center and radius of drawing area
const center = {x: canvas.width / 2, y: canvas.height / 2};
const radius = canvas.height / 2 - 10;

bg = new Background();
bg.drawOutline(center, radius);

disc = new Disc();

document.addEventListener('mousemove', function(evt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    // find intersection with circle
    const dx = x - center.x;
    const dy = y - center.y;
    const angle = Math.atan2(dy, dx); // tan(a) = O / A
    const intersectionX = center.x + radius * Math.cos(angle);
    const intersectionY = center.y + radius * Math.sin(angle);
    ctx.moveTo(center.x, center.y);
    ctx.setLineDash([5, 15])
    ctx.lineTo(intersectionX, intersectionY);

    // draw disc inside the outer circle touching the outer circle at intersection
    disc.drawDisc(100, {
        x: center.x + (radius - 100) * Math.cos(angle),
        y: center.y + (radius - 100) * Math.sin(angle)
    });

    ctx.strokeStyle = 'orange'
    ctx.stroke();
});
