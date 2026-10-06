const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
/** Resolve verification inputs for both the private static Site and the server-ready source ZIP. */
function buildPath(file) {
  if (fs.existsSync(path.join(root, 'out/index.html'))) return path.join(root, 'out', file);
  if (file.startsWith('images/')) return path.join(root, 'public', file);
  const route = file === 'sitemap.xml' ? 'sitemap.xml.body' : file.replace(/\/index\.html$/, '.html');
  return path.join(root, '.next/server/app', route);
}
module.exports = { buildPath };
