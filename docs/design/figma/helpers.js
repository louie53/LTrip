await Promise.all([{family:'Lora',style:'Regular'},{family:'Arimo',style:'Regular'},{family:'Arimo',style:'Bold'},{family:'Arimo',style:'Italic'}].map(f=>figma.loadFontAsync(f)));
const collections=await figma.variables.getLocalVariableCollectionsAsync();
const allowed=new Set(collections.filter(c=>c.name.startsWith('LocalTrip /')).map(c=>c.id));
const vars=Object.fromEntries((await figma.variables.getLocalVariablesAsync()).filter(v=>allowed.has(v.variableCollectionId)).map(v=>[v.name,v]));
const styles=Object.fromEntries((await figma.getLocalTextStylesAsync()).filter(s=>s.name.startsWith('LocalTrip/')).map(s=>[s.name.slice(10),s]));
const created=[];const changed=[];
function track(n){created.push(n.id);return n;}
function color(k){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars['color/'+k]);}
function gap(n,field,value){const v=vars['space/'+value];if(v)n.setBoundVariable(field,v);else n[field]=value;}
function radius(n,field,value){const v=vars['radius/'+value];if(v)n.setBoundVariable(field,v);else n[field]=value;}
function line(n,k='line',weight=1){n.strokes=[color(k)];n.setBoundVariable('strokeWeight',vars['stroke/'+String(weight).replace('.','-')]);}
function auto(parent,name,direction,width,{fill=null,g=0,p=0}={}){const n=track(figma.createAutoLayout(direction));n.name=name;n.resize(width,1);n.fills=fill?[color(fill)]:[];n.primaryAxisSizingMode=direction==='VERTICAL'?'AUTO':'FIXED';n.counterAxisSizingMode=direction==='VERTICAL'?'FIXED':'AUTO';n.clipsContent=false;gap(n,'itemSpacing',g);for(const f of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])gap(n,f,p);parent.appendChild(n);return n;}
async function text(parent,name,value,style,width,k='ink'){const n=track(figma.createText());n.name=name;await n.setTextStyleIdAsync(styles[style].id);n.fills=[color(k)];n.characters=value;n.textAutoResize='HEIGHT';n.resize(width,Math.max(1,n.height));parent.appendChild(n);return n;}
function rect(parent,name,w,h,k){const n=track(figma.createRectangle());n.name=name;n.resize(w,h);n.fills=k?[color(k)]:[];parent.appendChild(n);return n;}
function component(parent,name,direction,w,h){const n=track(figma.createComponent());n.name=name;n.layoutMode=direction;n.resize(w,h);n.fills=[];n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.clipsContent=false;parent.appendChild(n);return n;}
function instance(parent,comp,w,h){const n=track(comp.createInstance());parent.appendChild(n);if(w!==undefined)n.resize(w,h??n.height);return n;}
function svg(parent,name,source,w,h){const n=figma.createNodeFromSvg(source);created.push(n.id,...n.findAll(()=>true).map(x=>x.id));n.name=name;n.resize(w,h);parent.appendChild(n);for(const x of [n,...n.findAll(()=>true)]){if('fills' in x&&Array.isArray(x.fills))x.fills=x.fills.map(p=>p.type==='SOLID'?color('ink'):p);if('strokes' in x&&Array.isArray(x.strokes))x.strokes=x.strokes.map(p=>p.type==='SOLID'?color('ink'):p);}return n;}
const logoSvg='<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="16" stroke="#173e35" stroke-width="1.5"/><path d="M9 23 16 12l5 8 3-5 4 8H9Z" stroke="#173e35" stroke-width="1.5" stroke-linejoin="round"/><circle cx="24" cy="11" r="2" fill="#173e35"/></svg>';
const arrowSvg='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5l14 14M9 19h10V9" stroke="#173e35" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
