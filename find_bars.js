const fs = require('fs');
const content = fs.readFileSync('src/game/renderer.ts', 'utf8');

const regex = /ctx\.(moveTo|lineTo|fillRect|strokeRect)\(([^,]+),\s*([^,]+)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const func = match[1];
  const arg1 = match[2].trim();
  const arg2 = match[3].trim();
  // We only care about Y > 5 and crossing 0 (or large width)
  // Since it's hard to parse, let's just print anything that looks like a horizontal line
  // Let's just run it with simple grep first.
}
