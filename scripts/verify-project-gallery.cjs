const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const sharp = require('sharp');
const { buildPath } = require('./build-output.cjs');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(name, from = root) {
  if (!name.startsWith('@/') && !name.startsWith('.')) return require(name);
  let file = name.startsWith('@/') ? path.join(root, name.slice(2)) : path.resolve(from, name);
  if (!path.extname(file)) file = ['.tsx', '.ts'].map(ext => file + ext).find(fs.existsSync);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} }; cache.set(file, module);
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  new Function('require', 'module', 'exports', compiled)(id => load(id, path.dirname(file)), module, module.exports);
  return module.exports;
}
const { projects } = load('@/lib/content');
const { ProjectGallery } = load('@/components/projects/project-gallery');
const lexpo = projects.find(p => p.slug === 'lexpo');
const quebec = projects.find(p => p.slug === 'quebec-signature');
const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');

test('L’Expo has real, distinct pages including the dashboard', () => {
  assert.ok(lexpo.gallery.length >= 5);
  assert.equal(new Set(lexpo.gallery.map(view => view.image)).size, lexpo.gallery.length);
  assert.ok(lexpo.gallery.some(view => view.sourceUrl === 'https://lexpo-gallery.vercel.app/dashboard'));
  assert.ok(lexpo.gallery.some(view => view.sourceUrl.includes('explorer')));
  for (const view of lexpo.gallery) {
    assert.match(view.sourceUrl, /^https:\/\/lexpo-gallery\.vercel\.app\//);
    assert.ok(view.title && view.titleEn && view.title !== view.titleEn);
    assert.ok(view.imageAlt && view.imageAltEn && view.imageAlt !== view.imageAltEn);
    assert.ok(view.caption && view.captionEn && view.caption !== view.captionEn);
  }
});

test('all gallery image files match declared dimensions and export unchanged', async () => {
  for (const project of [lexpo, quebec]) {
    for (const view of project.gallery) {
      const file = path.join(root, 'public', view.image);
      const metadata = await sharp(file).metadata();
      assert.equal(metadata.width, view.imageWidth);
      assert.equal(metadata.height, view.imageHeight);
      for (const image of [view.image, view.fullImage].filter(Boolean)) {
        assert.deepEqual(fs.readFileSync(buildPath(image.slice(1))), fs.readFileSync(path.join(root, 'public', image)));
      }
    }
  }
});

test('every screenshot has its own bilingual caption, alt and full-size action', () => {
  for (const language of ['fr', 'en']) {
    const html = renderToStaticMarkup(React.createElement(ProjectGallery, { project: lexpo, language }));
    assert.equal((html.match(/<figure>/g) || []).length, lexpo.gallery.length);
    assert.equal((html.match(/<figcaption>/g) || []).length, lexpo.gallery.length);
    assert.equal((html.match(/class="project-gallery-actions"/g) || []).length, lexpo.gallery.length);
    for (const view of lexpo.gallery) {
      assert.ok(html.includes(`href="${view.fullImage || view.image}"`));
      assert.ok(html.includes(`href="${view.sourceUrl}"`));
      assert.ok(html.includes(language === 'fr' ? view.title : view.titleEn));
    }
    assert.doesNotMatch(html, /Déménagement|Equipment and vehicles|Équipements et véhicules/);
    assert.ok(html.includes(language === 'fr' ? 'Ouvrir la capture en grand' : 'Open the full-size screenshot'));
    assert.ok(html.includes(language === 'fr' ? 'non vérifiés' : 'not verified'));
    assert.equal((html.match(/target="_blank"/g) || []).length, (html.match(/rel="noopener noreferrer"/g) || []).length);
  }
});

test('existing Québec captions and images remain project-specific', () => {
  for (const language of ['fr', 'en']) {
    const html = renderToStaticMarkup(React.createElement(ProjectGallery, { project: quebec, language }));
    assert.equal((html.match(/<figure>/g) || []).length, 2);
    assert.ok(html.includes(language === 'fr' ? 'Équipements et véhicules · Visuels d’illustration' : 'Equipment and vehicles · Illustrative visuals'));
    assert.ok(html.includes(language === 'fr' ? 'Pied de page · Navigation et contact' : 'Footer · Navigation and contact'));
    assert.doesNotMatch(html, /project-gallery-pages|Tableau de bord artisan/);
  }
});

test('L’Expo screenshots use natural proportions, readable captions and touch targets', () => {
  assert.match(css, /\.project-gallery-pages img\s*\{[^}]*width: 100%;[^}]*height: auto;[^}]*object-fit: contain;[^}]*transform: none;/);
  assert.match(css, /\.project-gallery-pages figcaption\s*\{[^}]*font-size: 14px;/);
  assert.match(css, /\.project-gallery-actions a\s*\{[^}]*min-height: 44px;/);
  assert.match(css, /\.project-gallery a:focus-visible\s*\{[^}]*outline:/);
  const source = fs.readFileSync(path.join(root, 'components/projects/project-gallery.tsx'), 'utf8');
  assert.doesNotMatch(source, /setInterval|requestAnimationFrame|useEffect|onMouse|onClick|iframe/);
});

test('the exported L’Expo detail includes the gallery before its design study', () => {
  const html = fs.readFileSync(buildPath('projets/lexpo/index.html'), 'utf8').replaceAll('%2F', '/');
  assert.ok(html.includes('lexpo-gallery-title'));
  assert.ok(html.indexOf('lexpo-gallery-title') < html.indexOf('craft-heading'));
  assert.ok(html.includes('layered-page-scene'));
  assert.ok(html.includes('/images/lexpo-page.jpg'));
  for (const view of lexpo.gallery) assert.ok(html.includes(view.image));
  const home = fs.readFileSync(buildPath('index.html'), 'utf8');
  assert.doesNotMatch(home, /lexpo-gallery-title/);
});
