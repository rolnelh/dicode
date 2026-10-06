const {buildPath}=require('./build-output.cjs');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const vm=require('node:vm');const ts=require('typescript');const root=path.resolve(__dirname,'..');const m={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,'lib/articles.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:m.exports,module:m});const articles=m.exports.articles;assert.equal(articles.length,3);const sitemap=fs.readFileSync(buildPath('sitemap.xml'),'utf8');const index=fs.readFileSync(buildPath('articles/index.html'),'utf8');assert.equal((index.match(/<h1(?:\s|>)/g)||[]).length,1);assert.equal((index.split('<main')[1].split('</main>')[0].match(/<h2(?:\s|>)/g)||[]).length,3); // three cards; footer/dialog excluded
for(const a of articles){assert.ok(a.fr.title&&a.en.title&&a.fr.title!==a.en.title);assert.equal(a.fr.sections.length,a.en.sections.length);const html=fs.readFileSync(buildPath(`articles/${a.slug}/index.html`),'utf8');assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);for(let i=0;i<a.fr.sections.length;i++)assert.ok(html.includes(`id="section-${i+1}"`));assert.ok(html.includes('name="description"'));assert.ok(html.includes('name="twitter:title"'));assert.ok(html.includes('rel="canonical"'));const json=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));const data=json.find(x=>x['@type']==='Article');assert.equal(data.headline,a.fr.title);assert.equal(data.datePublished,a.publishedAt);assert.equal(data.dateModified,a.updatedAt||a.publishedAt);if(a.updatedAt){assert.ok(html.includes(`property="article:modified_time" content="${a.updatedAt}"`));assert.ok(html.includes("Mis à jour le"));}assert.ok(sitemap.includes('/articles/'+a.slug));for(const lang of ['fr','en'])for(const source of a[lang].sources)assert.equal(new URL(source.url).protocol,'https:');}
console.log('PASS: 3 bilingual articles, heading hierarchy, anchors, metadata, Article JSON-LD, source URLs and sitemap.');

for (const [slug, file] of [
 ['checklist-qa-avant-mise-en-ligne', 'article-qa.png'],
 ['vibengo-tests-qa-produits-web', 'article-vibengo.png'],
 ['creation-web-ia-du-prototype-au-site-fiable', 'article-ai.png'],
]) {
 const html = fs.readFileSync(buildPath(`articles/${slug}/index.html`), 'utf8');
 assert.ok(html.includes(`/images/${file}`) || html.includes(encodeURIComponent(`/images/${file}`)), 'Article has illustration');
 assert.ok(index.includes(`/images/${file}`) || index.includes(encodeURIComponent(`/images/${file}`)), 'Listing has illustration');
 assert.ok(fs.existsSync(buildPath(`images/${file}`)), 'Exported image exists');
}
const home = fs.readFileSync(buildPath('index.html'),'utf8');
assert.ok(home.includes('Me contacter'));
assert.ok(home.includes('sur WhatsApp'));
assert.ok(home.includes('https://wa.me/2290166374586'));
assert.ok(home.includes('/icons/whatsapp.svg'));
console.log('PASS: three article illustrations and explicit WhatsApp contact widget.');
