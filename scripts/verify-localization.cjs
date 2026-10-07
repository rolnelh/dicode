const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const React = require('react');
const { renderToString } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
function loader(overrides={}) {
  const cache = new Map();
  function load(name, from=root) {
    if (name in overrides) return overrides[name];
    if (!name.startsWith('@/') && !name.startsWith('.')) return require(name);
    let file = name.startsWith('@/') ? path.join(root,name.slice(2)) : path.resolve(from,name);
    if (!path.extname(file)) file = ['.tsx','.ts','.js'].map(ext=>file+ext).find(fs.existsSync);
    if (cache.has(file)) return cache.get(file).exports;
    const module = {exports:{}}; cache.set(file,module);
    const compiled = ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
    new Function('require','module','exports', compiled)(id=>load(id,path.dirname(file)),module,module.exports);
    return module.exports;
  }
  return load;
}
const load = loader();
const {copy,getLocalizedProject,getLocalizedServices,getNeedOptions,getBudgetOptions} = load('@/lib/localized-content');
const {projects,needs} = load('@/lib/content');
for(const p of projects) {
  const fr=getLocalizedProject(p,'fr'), en=getLocalizedProject(p,'en');
  assert.equal(fr,p);
  for(const key of ['slug','name','url','image','imageWidth','imageHeight','kind']) assert.deepEqual(en[key],p[key]);
  for(const key of ['category','summary','description','imageAlt']) assert.notEqual(en[key],p[key]);
}
assert.equal(getLocalizedServices('en').length,3);
assert.deepEqual(getNeedOptions('en').map(x=>x.value),needs);
assert.deepEqual(getBudgetOptions('en').map(x=>x.value),getBudgetOptions('fr').map(x=>x.value));
function keys(obj,prefix='') { return Object.entries(obj).flatMap(([k,v])=>typeof v==='object' && v ? keys(v,prefix+k+'.') : [prefix+k]); }
assert.deepEqual(keys(copy.fr),keys(copy.en));
const {LanguageProvider} = load('@/components/language-provider');
const subjects = [
 ['@/components/sections/services','Services',{},'MES SERVICES'],
 ['@/components/sections/process','Process',{},'Simple, clair, ensemble.'],
 ['@/components/sections/projects','Projects',{},'Des projets, des univers singuliers.'],
 ['@/components/contact/contact-content','ContactContent',{deliveryEnabled:false},'Préparer mon message'],
 ['@/components/projects/project-detail','ProjectDetail',{project:projects[0]},'Tous les projets'],
 ['@/app/not-found','default',{},'Cette page n’existe pas.'],
];
for(const [file,exportName,props,expected] of subjects) {
  const html = renderToString(React.createElement(LanguageProvider,null,React.createElement(load(file)[exportName],props)));
  assert.ok(html.includes(expected),file);
  assert.ok(!html.includes('Got a project?'), 'French server output must remain French');
}
// Exercise the provider's storage effects and setter without a browser runtime.
function checkProvider(saved,denyStorage=false) {
  let state; const effects=[]; const events=new Map(); let writes=[];
  const stub = {
    ...React,
    createContext:()=>({Provider:'provider'}),
    useState:initial=>{if(state===undefined)state=initial;return[state,next=>state=next]},
    useEffect:fn=>effects.push(fn),
    useCallback:fn=>fn,
    useMemo:fn=>fn(),
  };
  const loadProvider = loader({react:stub});
  const originalWindow=global.window,originalDocument=global.document;
  global.window={localStorage:{getItem(){if(denyStorage)throw new Error('denied');return saved},setItem(k,v){if(denyStorage)throw new Error('denied');writes.push([k,v])}},addEventListener:(k,v)=>events.set(k,v),removeEventListener:k=>events.delete(k)};
  global.document={documentElement:{lang:'fr'}};
  const provider=loadProvider('@/components/language-provider').LanguageProvider;
  let tree=provider({children:null});
  assert.equal(tree.props.value.language,'fr','Initial hydration must match French SSR');
  effects.splice(0).forEach(fn=>fn());
  tree=provider({children:null});effects.splice(0).forEach(fn=>fn());
  assert.equal(tree.props.value.language,denyStorage?'fr':saved==='en'?'en':'fr');
  tree.props.value.setLanguage('en');
  tree=provider({children:null});effects.splice(0).forEach(fn=>fn());
  assert.equal(tree.props.value.language,'en');
  assert.equal(document.documentElement.lang,'en');
  assert.equal(writes.length,denyStorage?0:1);
  global.window=originalWindow;global.document=originalDocument;
}
checkProvider('en');checkProvider('fr');checkProvider('nonsense');checkProvider('en',true);
// The artwork captions explicitly distinguish presentation mockups from source captures.
const {projectPresentations,gozemPresentationCaption} = load('@/lib/project-presentations');
for (const slug of ['mefolio','dicode-portfolio']) {
 const visual = projectPresentations[slug];
 assert.ok(visual.image.startsWith('/images/'));
 assert.equal(visual.width,1448); assert.equal(visual.height,1086);
 for (const key of ['title','alt','caption']) {
  assert.ok(visual.copy.fr[key].length > 10);
  assert.notEqual(visual.copy.fr[key],visual.copy.en[key]);
 }
 for (const lang of ['fr','en']) {
  const html=renderToString(React.createElement(load('@/components/projects/project-presentation').ProjectPresentation,{slug,language:lang}));
  assert.ok(html.includes(visual.image));
  assert.ok(html.includes('figcaption'));
  assert.ok(html.includes(visual.copy[lang].title));
 }
}
assert.notEqual(gozemPresentationCaption.fr,gozemPresentationCaption.en);
console.log('PASS: presentation images, full-size links and all French/English mockup captions.');

const {projectCraft} = load('@/lib/project-craft');
const Craft=load('@/components/projects/project-craft').ProjectCraft;
assert.deepEqual(Object.keys(projectCraft).sort(),projects.map(p=>p.slug).sort());
for (const project of projects) {
 const craft=projectCraft[project.slug];
 assert.equal(craft.copy.fr.design.length,3);
 assert.equal(craft.copy.en.design.length,3);
 assert.ok(craft.palette.length >= 4);
 for(const colour of craft.palette) assert.match(colour.hex,/^#[0-9A-F]{6}$/);
 for(const language of ['fr','en']) {
  const html=renderToString(React.createElement(Craft,{slug:project.slug,language}));
  assert.ok(html.includes('craft-heading'));
  assert.ok(html.includes(language==='fr'?'Mon rôle':'My role'));
  assert.ok(html.includes(language==='fr'?'Choix de conception':'Design choices'));
  for (const colour of craft.palette) assert.ok(html.includes(colour.hex));
  for (const font of craft.fonts) assert.ok(html.includes(font.name));
 }
}
console.log(`PASS: ${projects.length} bilingual case-detail panels, design choices, typography labels and accessible HEX palettes.`);

// Run the form handler with controlled hook state and DOM-like test inputs.
let language='en'; const formStates=[]; let cursor=0;
const formLoad=loader({react:{...React,useState(initial){const i=cursor++;if(!(i in formStates))formStates[i]=initial;return[formStates[i],v=>{formStates[i]=typeof v==='function'?v(formStates[i]):v}]},useMemo:fn=>fn()},'@/components/language-provider':{useLanguage:()=>({language})}});
const Form=formLoad('@/components/contact/contact-form').ContactForm;
function renderForm(deliveryEnabled=false){cursor=0;return Form({deliveryEnabled});}
let data={name:'Test Person',email:'test@example.com',need:needs[0],budget:'À définir ensemble',message:'A sample project description with enough detail.',company_url:''};
const realFormData=global.FormData,realWindow=global.window,realFetch=global.fetch;
global.FormData=class{get(k){return data[k]}};
global.window={location:{href:''}};
let focused='',reset=false;
const fakeForm={elements:{namedItem:name=>({validity:{typeMismatch:false},focus(){focused=name}})},reset(){reset=true}};
(async()=>{
 await renderForm().props.onSubmit({preventDefault(){},currentTarget:fakeForm});
 assert.equal(formStates[0],'draft');
 assert.ok(decodeURIComponent(window.location.href).includes('Hello Dieudonné'));
 assert.ok(decodeURIComponent(window.location.href).includes('New website'));
 assert.ok(!decodeURIComponent(window.location.href).includes('À définir ensemble'));
 language='fr'; await renderForm().props.onSubmit({preventDefault(){},currentTarget:fakeForm});
 assert.ok(decodeURIComponent(window.location.href).includes('Bonjour Dieudonné'));
 data={...data,name:'',message:'short'};
 await renderForm().props.onSubmit({preventDefault(){},currentTarget:fakeForm});
 assert.equal(formStates[0],'validation'); assert.equal(focused,'name');
 assert.deepEqual(formStates[2],{name:'requiredName',message:'shortMessage'});
 data={...data,name:'Test Person',message:'A sample project description with enough detail.'};
 language='en';
 global.fetch=async(url,options)=>{assert.equal(url,'/api/contact');assert.equal(JSON.parse(options.body).need,needs[0]);return {ok:true,json:async()=>({ok:true})}};
 await renderForm(true).props.onSubmit({preventDefault(){},currentTarget:fakeForm});
 assert.equal(formStates[0],'sent');assert.equal(reset,true);assert.equal(formStates[3],false);
 global.fetch=async()=>({ok:false,status:429});
 await renderForm(true).props.onSubmit({preventDefault(){},currentTarget:fakeForm});
 assert.equal(formStates[0],'error');assert.equal(formStates[1],'rateLimited');
 global.fetch=async()=>{throw new Error('offline')};
 await renderForm(true).props.onSubmit({preventDefault(){},currentTarget:fakeForm});
 assert.equal(formStates[1],'network');assert.equal(formStates[3],false);
 global.fetch=async()=>({ok:true,json:async()=>{throw new Error('not json')}});
 await renderForm(true).props.onSubmit({preventDefault(){},currentTarget:fakeForm});
 assert.equal(formStates[1],'failed');assert.equal(formStates[0],'error');
 global.FormData=realFormData;global.window=realWindow;global.fetch=realFetch;
 console.log('PASS: dictionary parity; all project overlays; stable API option values; French SSR for six components; provider hydration baseline, persisted/invalid/blocked storage; document.lang; French/English mailto; validation; API success, 429, network and malformed success responses.');
})().catch(error=>{console.error(error);process.exitCode=1});

