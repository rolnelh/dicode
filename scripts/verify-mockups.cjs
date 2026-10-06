const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict'),ts=require('typescript');
const root=path.resolve(__dirname,'..');
function load(file){const m={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:m.exports,module:m});return m.exports;}
const {projectScreen}=load('lib/mockup-projection.ts');
const {laptopPlates}=load('lib/laptop-plates.ts');
for(const [name,plate] of Object.entries(laptopPlates)){
 assert.ok(fs.existsSync(path.join(root,'public',plate.src)));
 for(const scale of [0.2,0.5,1]){
  const points=plate.screen.map(([x,y])=>[x*scale,y*scale]);const m=projectScreen(points,1000,625);
  [[0,0],[1000,0],[1000,625],[0,625]].forEach(([x,y],i)=>{const w=m[3]*x+m[7]*y+1;assert.ok(Math.abs((m[0]*x+m[4]*y+m[12])/w-points[i][0])<.001);assert.ok(Math.abs((m[1]*x+m[5]*y+m[13])/w-points[i][1])<.001);});
 }
 const page=path.join(root,`out/projets/${name}/index.html`);if(fs.existsSync(page)){const html=fs.readFileSync(page,'utf8');assert.ok(html.includes(plate.src));assert.ok(html.includes('photographic-mockup'));assert.ok(html.includes('projected-capture'));}
}
console.log('PASS: laptop assets, available exported routes and responsive perspective corner mapping at three sizes.');

// Fingerprints lock the approved varied-section artwork, never the repeated-hero draft.
const crypto = require('node:crypto');
const artwork = {
 'mefolio-pages-mosaic.png': 'deef8d6e7721b711bd5704c2380c87d34bf54fe19a88dbf82791871b0fe71d0a',
 'gozem-sections-mosaic.png': '1f5b34343242e3ff76714a9cc017d5d0f64543f974cdf9859401d3ced33004ec',
 'dicode-macbook-presentation.png': '288bf435b07dd7a7e5516b6003452fade64124c770b176706daed5bef630b79e',
};
for (const [filename, fingerprint] of Object.entries(artwork)) {
 const bytes = fs.readFileSync(path.join(root, 'public/images', filename));
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), fingerprint, `Approved artwork ${filename}`);
 assert.equal(bytes.readUInt32BE(16), 1448);
 assert.equal(bytes.readUInt32BE(20), 1086);
 const exported = path.join(root, 'out/images', filename);
 if (fs.existsSync(exported)) assert.deepEqual(fs.readFileSync(exported), bytes);
}
const css = fs.readFileSync(path.join(root,'app/globals.css'),'utf8');
assert.match(css, /\.presentation-mosaic \.project-image\s*\{[^}]*object-fit:contain;[^}]*transform:none;/);
assert.match(css, /\.project-card:hover \.presentation-mosaic \.project-image\s*\{transform:none;/);
console.log('PASS: all three approved 1448×1086 mockups, exact bytes and uncropped presentation styles.');
assert.match(css,/\.project-presentation img[^}]*max-width:100%;filter:none;/);
