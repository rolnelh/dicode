const { buildPath } = require('./build-output.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'components/sections/hero-project-previews.tsx'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
const m = { exports: {} };
new Function('require', 'module', 'exports', compiled)(require, m, m.exports);
const html = renderToStaticMarkup(React.createElement(m.exports.HeroProjectPreviews));
const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');
const previews = [
  ['quebec-signature', 'quebec-signature-hero.png', 385],
  ['lexpo', 'lexpo-hero.jpg', 359],
  ['mefolio', 'mefolio-dashboard.png', 315],
];

test('decorative cards have no spoken label, focus target or live embed', () => {
  assert.match(html, /class="hero-project-previews" aria-hidden="true"/);
  assert.equal((html.match(/alt=""/g) || []).length, 3);
  assert.doesNotMatch(html, /<(a|button|iframe)\b|tabindex|onClick/i);
  assert.match(css, /\.hero-project-previews\s*\{[^}]*pointer-events: none;/);
});

test('mobile uses a tiny fallback and the desktop-only picture sources', () => {
  assert.equal((html.match(/media="\(min-width: 1100px\)"/g) || []).length, 3);
  assert.equal((html.match(/src="data:image\/gif;base64,/g) || []).length, 3);
  assert.match(css, /\.hero-project-previews\s*\{\s*display: none;/);
  assert.match(css, /@media \(min-width: 1100px\)\s*\{\s*\.hero-project-previews\s*\{\s*display: block;/);
});

test('intrinsic dimensions, lazy decoding and low priority protect the main hero', () => {
  for (const [name, , height] of previews) {
    assert.ok(html.includes(`/images/hero/${name}.webp`));
    assert.ok(html.includes(`width="560" height="${height}"`));
  }
  assert.equal((html.match(/loading="lazy"/g) || []).length, 3);
  assert.equal((html.match(/decoding="async"/g) || []).length, 3);
  assert.equal((html.match(/fetchPriority="low"/g) || []).length, 3);
});

test('the copy sits above a white center; ornaments cannot overflow or animate', () => {
  assert.match(css, /\.hero-copy\s*\{[^}]*position: relative;[^}]*z-index: 1;/);
  assert.match(css, /\.hero-project-previews\s*\{[^}]*overflow: clip;/);
  assert.match(css, /\.hero-project-previews::after\s*\{[^}]*#fff 30%, #fff 70%/);
  assert.doesNotMatch(source, /useEffect|useState|requestAnimationFrame|setInterval|iframe/i);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.hero-preview\s*\{\s*transform: none;/);
});

test('thumbnails are only small derivatives of the existing source captures', async () => {
  let total = 0;
  for (const [name, original, height] of previews) {
    const file = path.join(root, `public/images/hero/${name}.webp`);
    const bytes = fs.readFileSync(file);
    const expected = await sharp(path.join(root, 'public/images', original)).resize({ width: 560, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
    assert.deepEqual(bytes, expected);
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.width, 560);
    assert.equal(metadata.height, height);
    total += bytes.length;
  }
  assert.ok(total < 60000, `Decorative image budget: ${total} bytes`);
});

test('home and recursive-safe portfolio preview both export the same decoration', () => {
  for (const route of ['index.html', 'apercu-portfolio/index.html']) {
    const page = fs.readFileSync(buildPath(route), 'utf8');
    assert.ok(page.includes('hero-project-previews'));
    assert.ok(page.includes('hero-copy'));
  }
  const preview = fs.readFileSync(buildPath('apercu-portfolio/index.html'), 'utf8');
  assert.doesNotMatch(preview, /<iframe\b/);
  for (const [name] of previews) assert.ok(fs.existsSync(buildPath(`images/hero/${name}.webp`)));
});
