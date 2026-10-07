const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { buildPath } = require('./build-output.cjs');
const root = path.resolve(__dirname, '..');
const cache = new Map();

function load(name, from = root) {
  if (!name.startsWith('@/') && !name.startsWith('.')) return require(name);
  let file = name.startsWith('@/') ? path.join(root, name.slice(2)) : path.resolve(from, name);
  if (!path.extname(file)) file = ['.tsx', '.ts'].map(ext => file + ext).find(fs.existsSync);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} }; cache.set(file, module);
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  new Function('require', 'module', 'exports', compiled)(id => load(id, path.dirname(file)), module, module.exports);
  return module.exports;
}

const { projects } = load('@/lib/content');
const { getLocalizedProject } = load('@/lib/localized-content');
const { projectCraft } = load('@/lib/project-craft');
const { ProjectMockup } = load('@/components/projects/project-mockup');
const { ProjectGallery } = load('@/components/projects/project-gallery');
const { Projects } = load('@/components/sections/projects');
const { LanguageProvider } = load('@/components/language-provider');
const post = projects.find(project => project.slug === 'post');

test('Post is the seventh project and has no temporary or unverified demo link', () => {
  assert.equal(projects.length, 7);
  assert.equal(projects.filter(project => project.slug === 'post').length, 1);
  assert.equal(post.url, null);
  assert.equal(post.platform, 'mobile');
  assert.equal(post.kind, 'presentation');
  assert.equal(post.gallery.length, 3);
  assert.deepEqual(projectCraft.post.sources, []);
  assert.doesNotMatch(JSON.stringify([post, projectCraft.post]), /ngrok|exp:\/\/|expo\.dev|trycloudflare/i);
});

test('Post copy remains bilingual and explicitly separates the prototype and static mockups', () => {
  const en = getLocalizedProject(post, 'en');
  for (const field of ['category', 'summary', 'description', 'imageAlt', 'note']) {
    assert.ok(post[field]);
    assert.notEqual(en[field], post[field]);
  }
  assert.match(post.note, /maquettes/);
  assert.match(en.note, /mockups/);
  assert.match(post.gallery[1].caption, /maquettes statiques/);
  assert.match(post.gallery[1].captionEn, /static mockups/);
  assert.doesNotMatch(JSON.stringify([post, en, projectCraft.post]), /2025|reprise|apprentissage|learning|exercises/i);
  for (const view of post.gallery) {
    for (const field of ['title', 'imageAlt', 'caption']) assert.notEqual(view[field], view[field + 'En']);
  }
});

test('Post appears once in its own mobile-projects section, after the existing web projects', () => {
  const html = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(Projects)));
  assert.equal((html.match(/href="\/projets\/post"/g) || []).length, 1);
  const mobileStart = html.indexOf('id="projets-mobiles"');
  assert.ok(mobileStart > html.indexOf('href="/projets/gozem"'));
  assert.ok(mobileStart < html.indexOf('href="/projets/post"'));
  assert.match(html, /<h3 id="mobile-projects-title">Projets mobiles<\/h3>/);
  assert.match(html, /<h4>Post<\/h4>/);
  const { copy } = load('@/lib/localized-content');
  assert.equal(copy.en.projects.mobileTitle, 'Mobile projects');
});

test('all four Post PNGs exist and match their declared dimensions', () => {
  for (const view of [post, ...post.gallery]) {
    const bytes = fs.readFileSync(path.join(root, 'public', view.image));
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(bytes.readUInt32BE(16), view.imageWidth);
    assert.equal(bytes.readUInt32BE(20), view.imageHeight);
  }
});

test('the Post artwork has no desktop frame and gallery links say mockup in both languages', () => {
  const html = renderToStaticMarkup(React.createElement(ProjectMockup, { project: post }));
  assert.match(html, /post-presentation/);
  assert.doesNotMatch(html, /device-chrome|device-base|scene-tag/);
  for (const language of ['fr', 'en']) {
    const gallery = renderToStaticMarkup(React.createElement(ProjectGallery, { project: post, language }));
    assert.equal((gallery.match(/<figure>/g) || []).length, 3);
    assert.ok(gallery.includes(language === 'fr' ? 'Ouvrir la maquette en grand' : 'Open the full-size mockup'));
    for (const view of post.gallery) assert.ok(gallery.includes(`href="${view.image}"`));
    assert.equal((gallery.match(/target="_blank"/g) || []).length, (gallery.match(/rel="noopener noreferrer"/g) || []).length);
  }
});

test('the built homepage, project route, sitemap and social image remain valid', () => {
  const home = fs.readFileSync(buildPath('index.html'), 'utf8').replaceAll('%2F', '/');
  const detail = fs.readFileSync(buildPath('projets/post/index.html'), 'utf8').replaceAll('%2F', '/');
  const sitemap = fs.readFileSync(buildPath('sitemap.xml'), 'utf8');
  assert.ok(home.includes('/projets/post'));
  assert.ok(home.includes('id="projets-mobiles"'));
  assert.ok(detail.includes('post-gallery-title'));
  assert.equal((detail.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.match(detail, /rel="canonical"[^>]*\/projets\/post/);
  assert.ok(detail.includes('/og/dieudonne-houndagnon.png'));
  for (const view of [post, ...post.gallery]) assert.ok(detail.includes(view.image));
  assert.ok(sitemap.includes('/projets/post'));
  assert.equal((sitemap.match(/<loc>/g) || []).length, 13);
  assert.doesNotMatch(detail, /Découvrir Post|Vidmake|ngrok|exp:\/\//);
});
