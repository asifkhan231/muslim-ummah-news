const fs = require('fs');
const path = require('path');
function w(f, c) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c, 'utf8');
  console.log('wrote', f);
}
