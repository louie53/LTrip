const page=await figma.getNodeByIdAsync('7:2');await figma.setCurrentPageAsync(page);
if(page.children.length)throw new Error('Library page has content; inspect before retry');
const root=auto(page,'Foundations / LocalTrip','VERTICAL',1440,{fill:'paper',g:40,p:64});root.x=200;root.y=80;
await text(root,'Kicker','LOCALTRIP / FOUNDATIONS','Eyebrow/Desktop',1312);
await text(root,'Title','A small, editable foundation.','Heading/Desktop',1312);
await text(root,'Description','Only the styles used by the M0 homepage. One light theme. Colors and geometry are variable-bound; text uses shared styles.','Body/Base',1220,'muted');
const palette=auto(root,'Color tokens','VERTICAL',1312,{g:16});
await text(palette,'Color heading','Color · primitives → semantic aliases','Document/Title',1312);
const row=auto(palette,'Color swatches','HORIZONTAL',1312,{g:16});
const colors={paper:'#F8F7F1',ink:'#173E35',muted:'#52635B',line:'#D6DCD1',wash:'#E9EDE3',focus:'#A24823','status-border':'#75886A'};
for(const [name,hex] of Object.entries(colors)){const sw=auto(row,'Swatch / '+name,'VERTICAL',170,{g:8});const chip=rect(sw,name,170,76,name);line(chip,'line');await text(sw,name+' label',name+'\n'+hex,'Label/Strong',170);await text(sw,name+' syntax','var(--'+name+')','Caption/Default',170,'muted');}
const type=auto(root,'Type styles','VERTICAL',1312,{g:16});await text(type,'Type heading','Typography · Lora + Arimo','Document/Title',1312);
await text(type,'Font note','Font adaptation: the HTML concept uses Georgia / Arial. Those fonts are unavailable in this Figma environment. This editable proposal uses Lora / Arimo; confirm the pair before implementation.','Body/Small',1260,'muted');
for(const [label,sample,style] of [['Display/Desktop · 80 / 84.8','Good days, close to home.','Display/Desktop'],['Display/Mobile · 50 / 53.5','Good days, close to home.','Display/Mobile'],['Heading/Desktop · 39 / 44.85','One operator. A local outlook.','Heading/Desktop'],['Body/Large · 18 / 29.7','A fresh perspective on familiar places.','Body/Large']]){await text(type,label+' label',label,'Caption/Default',1312,'muted');await text(type,label+' sample',sample,style,1312);}
await text(type,'Style inventory','18 shared text styles: Display/Desktop, Display/Mobile, Heading/Desktop, Heading/Mobile, Body/Large, Body/Base, Body/Mobile, Body/Small, Label/Strong, Eyebrow/Desktop, Eyebrow/Mobile, Caption/Default, Caption/Italic, Brand/Desktop, Brand/Mobile, Navigation, Link, Document/Title.','Body/Small',1260,'muted');
const space=auto(root,'Spacing & shape','VERTICAL',1312,{g:16});await text(space,'Space heading','Spacing, shape & focus','Document/Title',1312);
const bars=auto(space,'Spacing examples','HORIZONTAL',1312,{g:32});for(const value of [8,16,24,32,48,72,120]){const c=auto(bars,'Spacing '+value,'VERTICAL',142,{g:12});rect(c,'Space bar',value,12,'ink');await text(c,'Spacing label',value+' px','Label/Strong',142);}
await text(space,'Rules','Desktop: 1200px content width, 72px column gap. Mobile: 24px side padding, 32px stack gap. Photo corner: 150px desktop / 88px mobile. Keyboard focus: 3px clay outline with a 6px offset. No animation.','Body/Base',1260,'muted');
await text(space,'Contrast','Contrast: primary text 11.01:1 · secondary on paper 5.94:1 · secondary on sage 5.37:1 · focus on paper 5.61:1.','Body/Small',1260,'muted');
const compRoot=auto(page,'Components / LocalTrip','VERTICAL',1920,{fill:'paper',g:40,p:64});compRoot.x=1820;compRoot.y=80;
await text(compRoot,'Components kicker','LOCALTRIP / HOMEPAGE COMPONENTS','Eyebrow/Desktop',1792);
await text(compRoot,'Components title','Shared pieces, clear states.','Heading/Desktop',1792);
await text(compRoot,'Components description','The homepage uses instances of the components below. Labels remain editable. Navigation is limited to real anchors on this page.','Body/Base',1600,'muted');
const fonts=[...new Set(root.findAllWithCriteria({types:['TEXT']}).map(n=>n.fontName.family))];
return {createdNodeIds:created,mutatedNodeIds:changed,foundations:root.id,componentRoot:compRoot.id,bounds:{width:root.width,height:root.height},fonts};
