const fs = require('fs');
let content = fs.readFileSync('src/game/renderer.ts', 'utf8');

content = content.replace(/ctx\.ellipse\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\);\s*ctx\.ellipse\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\);/g, (match, x1, y1, rx1, ry1, rot1, sa1, ea1, x2, y2, rx2, ry2, rot2, sa2, ea2) => {
    return `ctx.ellipse(${x1}, ${y1}, ${rx1}, ${ry1}, ${rot1}, ${sa1}, ${ea1});\n        ctx.moveTo(${x2} + ${rx2}, ${y2});\n        ctx.ellipse(${x2}, ${y2}, ${rx2}, ${ry2}, ${rot2}, ${sa2}, ${ea2});`;
});

fs.writeFileSync('src/game/renderer.ts', content);
