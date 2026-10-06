const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const ts = require(path.join(root, 'node_modules/typescript'));
function transpile(relative) {
  return ts.transpileModule(fs.readFileSync(path.join(root, relative), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
  }).outputText;
}
const helperModule = { exports: {} };
vm.runInNewContext(transpile('lib/ebook-prompt.ts'), { exports: helperModule.exports, module: helperModule });
const helpers = helperModule.exports;
const widgetCode = transpile('components/resource-widget.tsx');
const initialNow = 1_790_000_000_000;
function harness(options = {}) {
  let now = options.now ?? initialNow;
  let pathname = options.pathname ?? '/';
  let language = options.language ?? 'fr';
  let nextTimer = 1;
  const timers = new Map();
  const storage = options.storage ?? new Map();
  const hooks = [];
  let cursor = 0;
  let pendingEffects = [];
  let tree;
  const state = { hidden: false, editing: false, menu: false, otherDialog: false, readsThrow: false, writesThrow: false };
  Object.assign(state, options.state);
  const dialog = {
    open: false,
    showCount: 0,
    showModal() { this.open = true; this.showCount++; },
    close() { this.open = false; },
    getBoundingClientRect() { return {left:100,right:500,top:100,bottom:400}; }
  };
  const depsEqual = (a,b) => a && b && a.length === b.length && a.every((x,i) => Object.is(x,b[i]));
  const react = {
    useRef(value) { const i = cursor++; hooks[i] ??= { kind: 'ref', current: value }; return hooks[i]; },
    useCallback(callback, deps) { const i = cursor++; if (!hooks[i] || !depsEqual(hooks[i].deps,deps)) hooks[i] = { kind:'callback', callback,deps }; return hooks[i].callback; },
    useEffect(effect,deps) {
      const i=cursor++; const old=hooks[i];
      if (!old || !depsEqual(old.deps,deps)) pendingEffects.push(() => {
        old?.cleanup?.();
        const record={kind:'effect', effect,deps}; hooks[i]=record; record.cleanup=effect();
      });
    },
  };
  const jsx = (type,props) => ({ type, props: props ?? {} });
  const module = { exports:{} };
  const mockRequire = (name) => {
    if(name==='react') return react;
    if(name==='react/jsx-runtime') return {jsx,jsxs:jsx,Fragment:'fragment'};
    if(name==='next/navigation') return { usePathname: () => pathname };
    if(name==='@/lib/ebook-prompt') return helpers;
    if(name==='@/components/language-provider') return {useLanguage:()=>({language})};
    if(name==='@/lib/site') return {site:{ebook:'https://ebook.example',whatsapp:'https://whatsapp.example'}};
    if(name==='lucide-react') return {BookOpen:'book',X:'x',ArrowUpRight:'arrow'};
    if(name==='@/components/ui/brand-icon') return {BrandIcon:'brand'};
    if(name==='@/components/contact/contact-widget') return {ContactWidget:'contact-widget'};
    throw Error(`Unexpected import ${name}`);
  };
  const document = {
    get visibilityState() { return state.hidden ? 'hidden' : 'visible'; },
    get activeElement() { return { matches: () => state.editing }; },
    querySelector(selector) {
      assert.equal(selector,'dialog[open],#mobile-navigation');
      return dialog.open || state.menu || state.otherDialog ? {} : null;
    }
  };
  const context = {module,exports:module.exports,require:mockRequire,document,
    Date: class extends Date { static now(){ return now; } },
    window:{sessionStorage:{
      getItem(key) { if(state.readsThrow) throw Error('Storage denied'); return storage.get(key) ?? null; },
      setItem(key,value) { if(state.writesThrow) throw Error('Storage denied'); storage.set(key,value); }
    }},
    setTimeout(callback,delay) { const id=nextTimer++; timers.set(id,{callback,due:now+delay}); return id; },
    clearTimeout(id) { timers.delete(id); }
  };
  vm.runInNewContext(widgetCode,context);
  function all(node, predicate) {
    if (!node || typeof node !== 'object') return [];
    const results=predicate(node)?[node]:[];
    for(const child of [node.props?.children].flat(Infinity)) results.push(...all(child,predicate));
    return results;
  }
  function find(className) { const result=all(tree,n=>n.props?.className===className); assert.equal(result.length,1); return result[0]; }
  function render() {
    cursor=0; pendingEffects=[]; tree=module.exports.ResourceWidget();
    const node=all(tree,n=>n.props?.className==='ebook-dialog')[0];
    if(node) node.props.ref.current=dialog;
    pendingEffects.forEach(fn=>fn());
  }
  function advance(ms) {
    const end=now+ms;
    for(let guard=0;guard<2000;guard++) {
      const next=[...timers.entries()].sort((a,b)=>a[1].due-b[1].due)[0];
      if(!next || next[1].due>end) {now=end;return;}
      now=next[1].due;timers.delete(next[0]);next[1].callback();
    }
    throw Error('Runaway timers');
  }
  render();
  return {state,dialog,storage,timers,advance,find,
    all: predicate => all(tree,predicate),
    get now(){return now;},
    navigate(path) {pathname=path;render();},
    setLanguage(value) {language=value;render();},
    manual(){find('ebook-trigger').props.onClick();},
    close(){find('ebook-close').props.onClick();},
    strictReplay(){for(const h of hooks) if(h.kind==='effect'){h.cleanup?.();h.cleanup=h.effect();}},
    unmount(){for(const h of hooks) if(h.kind==='effect')h.cleanup?.();}
  };
}

test('first home visit opens at eight seconds and records cap',()=>{
  const h=harness();h.advance(7999);assert.equal(h.dialog.open,false);h.advance(1);
  assert.equal(h.dialog.open,true);assert.equal(h.dialog.showCount,1);
  assert.equal(h.storage.get(helpers.EBOOK_PROMPT_KEY),String(initialNow+8000));
});
test('recent visit is suppressed; manual trigger still works',()=>{
  const h=harness({storage:new Map([[helpers.EBOOK_PROMPT_KEY,String(initialNow-1000)]])});
  h.advance(10000);assert.equal(h.dialog.showCount,0);h.manual();assert.equal(h.dialog.showCount,1);
});
test('expired stored visit and fresh tab both auto-open',()=>{
  for(const storage of [new Map(),new Map([[helpers.EBOOK_PROMPT_KEY,String(initialNow-helpers.EBOOK_VISIT_WINDOW)]])]) {
    const h=harness({storage});h.advance(8000);assert.equal(h.dialog.showCount,1);
  }
});
test('manual opening before delay prevents reopening after close',()=>{
  const h=harness();h.advance(2000);h.manual();h.close();h.advance(30000);
  assert.equal(h.dialog.showCount,1);assert.equal(h.dialog.open,false);
});
test('close button and backdrop dismiss without timer reopening',()=>{
  const h=harness();h.advance(8000);h.close();h.advance(10000);assert.equal(h.dialog.open,false);
  h.manual();const click=h.find('ebook-dialog').props.onClick;
  click({target:h.dialog,currentTarget:h.dialog,clientX:200,clientY:200});assert.equal(h.dialog.open,true);
  click({target:{},currentTarget:h.dialog,clientX:0,clientY:0});assert.equal(h.dialog.open,true);
  click({target:h.dialog,currentTarget:h.dialog,clientX:0,clientY:0});assert.equal(h.dialog.open,false);
  h.advance(10000);assert.equal(h.dialog.showCount,2);
});
test('contact and project pages do not auto-open; manual always works',()=>{
  for(const pathname of ['/contact','/projets/example']) {
    const h=harness({pathname});h.advance(30000);assert.equal(h.dialog.showCount,0);
    h.manual();assert.equal(h.dialog.showCount,1);
  }
});
test('route change cancels pending timer; returning home gets fresh delay',()=>{
  const h=harness();h.advance(7999);h.navigate('/contact');h.advance(10000);
  assert.equal(h.dialog.showCount,0);assert.equal(h.timers.size,0);
  h.navigate('/');h.advance(7999);assert.equal(h.dialog.showCount,0);h.advance(1);assert.equal(h.dialog.showCount,1);
});
test('same mount never auto-reopens across long visits and navigation',()=>{
  const h=harness();h.advance(8000);h.close();h.advance(helpers.EBOOK_VISIT_WINDOW+1);
  h.navigate('/contact');h.navigate('/');h.advance(30000);assert.equal(h.dialog.showCount,1);
});
for(const blocker of ['hidden','editing','menu','otherDialog']) {
  test(`${blocker} defers opening without consuming visit cap`,()=>{
    const h=harness({state:{[blocker]:true}});h.advance(14000);
    assert.equal(h.dialog.showCount,0);assert.equal(h.storage.has(helpers.EBOOK_PROMPT_KEY),false);
    assert.equal(h.timers.size,1);h.state[blocker]=false;h.advance(2000);assert.equal(h.dialog.showCount,1);
  });
}
test('route change also cancels blocker retry timer',()=>{
  const h=harness({state:{editing:true}});h.advance(8000);h.navigate('/contact');h.state.editing=false;h.advance(10000);
  assert.equal(h.dialog.showCount,0);assert.equal(h.timers.size,0);
});
test('storage failures fall back to per-mount cap without blocking manual open',()=>{
  const h=harness({state:{readsThrow:true,writesThrow:true}});h.advance(8000);assert.equal(h.dialog.showCount,1);
  h.close();h.navigate('/contact');h.navigate('/');h.advance(30000);assert.equal(h.dialog.showCount,1);
  h.manual();assert.equal(h.dialog.showCount,2);
});
test('recheck catches a cap written after scheduling',()=>{
  const h=harness();h.advance(7000);h.storage.set(helpers.EBOOK_PROMPT_KEY,String(h.now));h.advance(1000);
  assert.equal(h.dialog.showCount,0);assert.equal(h.timers.size,0);
});
test('Strict Mode effect replay leaves one timer and one opening',()=>{
  const h=harness();h.strictReplay();assert.equal(h.timers.size,1);h.advance(8000);assert.equal(h.dialog.showCount,1);
});
test('unmount cancels initial and blocked-retry timers',()=>{
  for(const state of [{},{hidden:true}]) {
    const h=harness({state});if(state.hidden)h.advance(8000);h.unmount();h.advance(30000);
    assert.equal(h.dialog.showCount,0);assert.equal(h.timers.size,0);
  }
});
test('timestamp validation rejects malformed, missing, future, and expired values',()=>{
  for(const input of [null,'',' ','garbage','NaN','Infinity','0','-1',String(initialNow+1),String(initialNow-helpers.EBOOK_VISIT_WINDOW)]) {
    assert.equal(helpers.isRecentEbookPrompt(input,initialNow),false,JSON.stringify(input));
  }
  for(const input of [String(initialNow),String(initialNow-helpers.EBOOK_VISIT_WINDOW+1)]) {
    assert.equal(helpers.isRecentEbookPrompt(input,initialNow),true,input);
  }
});

test('offer shows exactly one full banner and one Chariow call to action',()=>{
  const h=harness();
  const images=h.all(n=>n.type==='img');
  assert.equal(images.length,1);
  const banner=images[0];
  assert.equal(banner.props.src,'/images/ebook/dicode-guide-banner.png');
  assert.equal(banner.props.width,1404);
  assert.equal(banner.props.height,520);
  assert.ok(banner.props.alt.includes('Dieudonné Houndagnon'));
  const png=fs.readFileSync(path.join(root,'public',banner.props.src));
  assert.equal(png.readUInt32BE(16),1404);
  assert.equal(png.readUInt32BE(20),520);
  const link=h.find('button');
  assert.equal(link.type,'a');
  assert.equal(link.props.children,'Profiter de l’offre');
  assert.equal(link.props.href,'https://ebook.example');
  assert.equal(link.props.target,'_blank');
  assert.equal(link.props.rel,'noopener noreferrer');
  assert.ok(fs.readFileSync(path.join(root,'lib/site.ts'),'utf8').includes('https://losrfvhm.mychariow.market/prd_p9cm1pqt'));
});

test('offer text, accessible image description and close label switch to English',()=>{
  const h=harness();h.manual();h.setLanguage('en');
  assert.equal(h.dialog.open,true);
  assert.equal(h.dialog.showCount,1);
  assert.equal(h.find('button').props.children,'Get the offer');
  assert.equal(h.find('ebook-close').props['aria-label'],'Close the offer');
  assert.ok(h.find('ebook-banner').props.alt.includes('build your first website with AI'));
  assert.ok(h.all(n=>n.type==='small')[0].props.children.includes('French-language ebook'));
});

test('native accessible dialog keeps dismissal and named summary',()=>{
  const h=harness(),node=h.find('ebook-dialog');
  assert.equal(node.type,'dialog');
  assert.equal(node.props['aria-labelledby'],'ebook-title');
  assert.equal(node.props['aria-describedby'],'ebook-description');
  assert.equal(node.props.onCancel,undefined,'Native Escape remains unblocked');
  assert.equal(h.all(n=>n.props?.id==='ebook-title').length,1);
  assert.equal(h.all(n=>n.props?.id==='ebook-description').length,1);
  h.manual();h.close();assert.equal(h.dialog.open,false);
  h.manual();assert.equal(h.dialog.open,true);
});

test('portfolio preview excludes the offer and never schedules a popup',()=>{
  const h=harness({pathname:'/apercu-portfolio/'});
  assert.equal(h.all(()=>true).length,0);
  assert.equal(h.timers.size,0);
  h.advance(30000);assert.equal(h.dialog.showCount,0);
});
