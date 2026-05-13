const fs = require('fs');
const path = require('path');
function w(f, c) { fs.mkdirSync(path.dirname(f),{recursive:true}); fs.writeFileSync(f,c,'utf8'); console.log('wrote',f); }

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;600;700&family=Oswald:wght@300;400;500;600;700&display=swap');
:root{--bg-dark:#0f1117;--bg-card:#1a1f2e;--bg-card2:#242938;--accent:#2ecc71;--accent-dark:#27ae60;--accent-glow:rgba(46,204,113,0.15);--text-light:#e8eaf0;--text-muted:#8892a4;--border:#2d3447;--white:#fff;--font-sans:'Inter',sans-serif;--font-serif:'Playfair Display',serif;--font-oswald:'Oswald',sans-serif;}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:var(--font-sans);background:var(--bg-dark);color:var(--text-light);line-height:1.6;overflow-x:hidden;}
a{text-decoration:none;color:inherit;transition:all 0.2s ease;}
a:hover{color:var(--accent);}
h1,h2,h3,h4,h5,h6{font-family:var(--font-sans);color:var(--text-light);font-weight:700;line-height:1.2;}
`;
w('frontend/src/index.css', CSS);
console.log('CSS done');
