const old = await figma.variables.getLocalVariableCollectionsAsync();
if (old.some(c=>c.name==='LocalTrip / Primitives')) throw new Error('Foundation already exists; inspect before retry');
const fonts=[{family:'Lora',style:'Regular'},{family:'Arimo',style:'Regular'},{family:'Arimo',style:'Bold'},{family:'Arimo',style:'Italic'}];
await Promise.all(fonts.map(f=>figma.loadFontAsync(f)));
const {collection:prim,modeIds:pm}=await createVariableCollection('LocalTrip / Primitives',['Value']);
const {collection:sem,modeIds:sm}=await createVariableCollection('LocalTrip / Color',['Light']);
const {collection:space,modeIds:spm}=await createVariableCollection('LocalTrip / Geometry',['Value']);
const colors={paper:'#F8F7F1',ink:'#173E35',muted:'#52635B',line:'#D6DCD1',wash:'#E9EDE3',focus:'#A24823','status-border':'#75886A'};
const {variables:prims}=await createSemanticTokens(prim,pm,Object.entries(colors).map(([name,value])=>({name,type:'COLOR',values:{Value:value},scopes:[],codeSyntax:{WEB:`var(--${name})`}})));
const {variables:semantic}=await createSemanticTokens(sem,sm,Object.entries(colors).map(([name])=>({name:'color/'+name,type:'COLOR',values:{Light:figma.variables.createVariableAlias(prims[name])},scopes:name==='focus'||name==='line'||name==='status-border'?['STROKE_COLOR','SHAPE_FILL']:['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'],codeSyntax:{WEB:`var(--${name})`}})));
const gaps=[0,4,5,6,8,9,11,12,13,14,15,16,17,18,20,22,23,24,26,28,30,31,32,33,36,38,40,43,44,46,48,56,60,64,72,88,102,120,150];
const geometry=gaps.map(v=>({name:'space/'+v,type:'FLOAT',values:{Value:v},scopes:['GAP'],codeSyntax:{WEB:`var(--space-${v})`}}));
for(const v of [0,2,6,8,88,150,999])geometry.push({name:'radius/'+v,type:'FLOAT',values:{Value:v},scopes:['CORNER_RADIUS'],codeSyntax:{WEB:`var(--radius-${v})`}});
for(const v of [1,1.5,2,3])geometry.push({name:'stroke/'+String(v).replace('.','-'),type:'FLOAT',values:{Value:v},scopes:['STROKE_FLOAT'],codeSyntax:{WEB:`var(--stroke-${String(v).replace('.','-')})`}});
const {variables:geom}=await createSemanticTokens(space,spm,geometry);
const defs=[
['Display/Desktop','Lora','Regular',80,84.8,-4.3],['Display/Mobile','Lora','Regular',50,53.5,-2.6],
['Heading/Desktop','Lora','Regular',39,44.85,-1.3],['Heading/Mobile','Lora','Regular',34,39.1,-1],
['Body/Large','Arimo','Regular',18,29.7,0],['Body/Base','Arimo','Regular',16,27.2,0],['Body/Mobile','Arimo','Regular',15,25.5,0],['Body/Small','Arimo','Regular',14,21.7,0],
['Label/Strong','Arimo','Bold',12,18,.2],['Eyebrow/Desktop','Arimo','Bold',11,17.6,1.8],['Eyebrow/Mobile','Arimo','Bold',10,16,1.6],
['Caption/Default','Arimo','Regular',12,18,0],['Caption/Italic','Arimo','Italic',12,18,0],['Brand/Desktop','Arimo','Bold',27,34,-1],['Brand/Mobile','Arimo','Bold',24,31,-1],['Navigation','Arimo','Regular',14,22,0],['Link','Arimo','Bold',14,22,0],['Document/Title','Lora','Regular',32,42,-.5]
];
const styles={};for(const [name,family,style,size,lineHeight,letterSpacing] of defs){const ts=figma.createTextStyle();ts.name='LocalTrip/'+name;ts.fontName={family,style};ts.fontSize=size;ts.lineHeight={unit:'PIXELS',value:lineHeight};ts.letterSpacing={unit:'PIXELS',value:letterSpacing};styles[name]=ts.id;}
const vars={};for(const v of [...Object.values(prims),...Object.values(semantic),...Object.values(geom)])vars[(v.variableCollectionId===prim.id?'primitive/':'')+v.name]=v.id;
return {collections:[prim,sem,space].map(c=>({id:c.id,name:c.name,mode:c.modes,count:c.variableIds.length})),variables:vars,styles,variableCount:Object.keys(vars).length,styleCount:defs.length,createdNodeIds:[],createdVariableIds:Object.values(vars),createdStyleIds:Object.values(styles),fonts};
