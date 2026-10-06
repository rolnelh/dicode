const { buildPath } = require('./build-output.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
function loadFor(language) {
  const cache = new Map();
  function load(name, from = root) {
    if (name === '@/components/language-provider') return { useLanguage: () => ({ language }) };
    if (!name.startsWith('@/') && !name.startsWith('.')) return require(name);
    let file = name.startsWith('@/') ? path.join(root, name.slice(2)) : path.resolve(from, name);
    if (!path.extname(file)) file = ['.tsx', '.ts', '.js'].map(ext => file + ext).find(fs.existsSync);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} }; cache.set(file, module);
    const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
    new Function('require', 'module', 'exports', compiled)(id => load(id, path.dirname(file)), module, module.exports);
    return module.exports;
  }
  return load;
}
const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');
for (const language of ['fr', 'en']) {
  test(`three service surfaces retain all ${language} copy and the contact route`, () => {
    const load = loadFor(language);
    const { Services } = load('@/components/sections/services');
    const { getLocalizedServices } = load('@/lib/localized-content');
    const html = renderToStaticMarkup(React.createElement(Services));
    const escape = text => text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;').replaceAll('"', '&quot;');
    assert.match(html, /id="services"/);
    assert.equal((html.match(/<article\b/g) || []).length, 3);
    for (const service of getLocalizedServices(language)) {
      for (const key of ['title', 'text', 'tags']) assert.ok(html.includes(escape(service[key])));
    }
    assert.equal((html.match(/class="service-symbol" aria-hidden="true"/g) || []).length, 3);
    assert.match(html, /href="\/contact"/);
    assert.doesNotMatch(html, /<canvas\b|<iframe\b/);
  });
}
test('3D uses CSS perspective with static mobile and reduced-motion alternatives', () => {
  assert.match(css, /\.services-depth \.services-grid\s*\{[^}]*perspective: 1500px;/);
  assert.match(css, /\.services-depth \.service-card\s*\{[^}]*transform-style: preserve-3d;/);
  assert.match(css, /@media \(max-width: 1000px\)\s*\{\s*\.services-depth \.services-grid\s*\{\s*grid-template-columns: 1fr;/);
  assert.match(css, /@media \(min-width: 1001px\) and \(hover: hover\) and \(pointer: fine\) and \(prefers-reduced-motion: no-preference\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.services-depth \.service-card,[\s\S]*?transform: none;\s*transition: none;/);
  const component = fs.readFileSync(path.join(root, 'components/sections/services.tsx'), 'utf8');
  assert.doesNotMatch(component, /useEffect|useState|onMouseMove|onPointerMove|requestAnimationFrame/);
});
test('the built home contains the three-dimensional section and readable service text', () => {
  const html = fs.readFileSync(buildPath('index.html'), 'utf8');
  assert.match(html, /services-depth/);
  assert.equal((html.match(/class="service-symbol" aria-hidden="true"/g) || []).length, 3);
  assert.ok(html.includes('Création de sites web'));
  assert.ok(html.includes('Reprise &amp; finalisation'));
});
