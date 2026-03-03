import { useState, useEffect } from "react";

const cd={"id":"1b9265c9","cardName":"WinterMenu","genericDetailsVisible":true,"genericBlocksVisible":true,"details":{"logo":"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=500&fit=crop","description":"Test description","details":"Test details","information":"Test Information","enquireButton":true,"enquireButtonText":"Contact us"},"cardBlocks":[{"id":"01","tabName":"Food Menu","tabNumber":0,"title":"Breakfast & Brunch","sort":0,"propertyRows":[{"id":"r1","heading":"Classic","headingValue":"R 69 | R 112","headingDescription":"Topped with hickory ham, grilled tomato & hash brown.","sort":0},{"id":"r2","heading":"South African","headingValue":"R 75 | R 127","headingDescription":"Boerewors patty & corn chakalaka.","sort":1},{"id":"r3","heading":"Big Ben","headingValue":"R 89 | R 142","headingDescription":"Baby spinach, grilled tomato, hash brown, cheddar, hickory ham, back bacon & onion ring.","sort":2},{"id":"r4","heading":"Buffalo Chicken","headingValue":"R 79 | R 125","headingDescription":"Sesame-crusted chicken strips in hot sauce with blue cheese crumbles.","sort":3},{"id":"r5","heading":"Mediterranean","headingValue":"R 74 | R 119","headingDescription":"Roasted peppers, feta, olives, basil pesto, grilled tomato & hash brown.","sort":4},{"id":"r6","heading":"Shakshuka Skillet","headingValue":"R 78 | R 120","headingDescription":"Spiced tomato-pepper sauce with onions, poached eggs & toasted sourdough.","sort":5},{"id":"r7","heading":"Avo Smash","headingValue":"R 82 | R 135","headingDescription":"Smashed avocado, lemon zest, chili flakes, poached egg & microgreens.","sort":6},{"id":"r8","heading":"Halloumi & Roast Veg","headingValue":"R 79 | R 128","headingDescription":"Griddled halloumi, roasted courgette & peppers, basil oil & hash brown.","sort":7},{"id":"r9","heading":"Pap & Wors","headingValue":"R 86 | R 139","headingDescription":"Creamy mielie pap, boerewors bites, chakalaka, fried egg & crispy onion.","sort":8}]},{"id":"02","tabName":"Food Menu","tabNumber":0,"title":"Toasted Sandwiches","sort":1,"propertyRows":[{"id":"s1","heading":"Back Bacon & Egg","headingValue":"R 150","headingDescription":"","sort":0},{"id":"s2","heading":"Cheddar & Tomato","headingValue":"R 79","headingDescription":"","sort":1},{"id":"s3","heading":"Chicken Mayo","headingValue":"R 89","headingDescription":"","sort":2},{"id":"s4","heading":"Bacon, Avo & Feta","headingValue":"R 109","headingDescription":"Crispy bacon, avocado, feta & tomato relish.","sort":3},{"id":"s5","heading":"Steak, Onion & Cheddar","headingValue":"R 119","headingDescription":"Thin-sliced steak, caramelised onion & mature cheddar.","sort":4}]},{"id":"03","tabName":"Drinks Menu","tabNumber":1,"title":"Smoothies","sort":0,"propertyRows":[{"id":"d1","heading":"Green Monster","headingValue":"R 64","headingDescription":"Spinach, Avo, Cucumber & Ginger in carrot juice","sort":0},{"id":"d2","heading":"Berry Burst","headingValue":"R 65","headingDescription":"Strawberries, Blueberries, Banana & Chia in almond milk","sort":1},{"id":"d3","heading":"Tropical Glow","headingValue":"R 60","headingDescription":"Mango, Pineapple, Coconut & Mint in orange juice","sort":2},{"id":"d4","heading":"Nutty Power","headingValue":"R 66","headingDescription":"Peanut Butter, Oats, Banana & Dates in oat milk","sort":3},{"id":"d5","heading":"Cocoa Banana","headingValue":"R 62","headingDescription":"Banana, cocoa, yoghurt & honey blended with milk.","sort":4},{"id":"d6","heading":"Coffee Buzz","headingValue":"R 66","headingDescription":"Double espresso, banana & dates in oat milk.","sort":5}]},{"id":"04","tabName":"Dessert Menu","tabNumber":2,"title":"Warm Desserts","sort":0,"propertyRows":[{"id":"w1","heading":"Malva","headingValue":"R 44","headingDescription":"Traditional warm pudding","sort":0},{"id":"w2","heading":"Custard","headingValue":"R 30","headingDescription":"Topping for just about anything","sort":1},{"id":"w3","heading":"Cape Brandy Pudding","headingValue":"R 52","headingDescription":"Warm date pudding in brandy syrup with vanilla custard.","sort":2},{"id":"w4","heading":"Apple Crumble","headingValue":"R 48","headingDescription":"Buttery crumble over cinnamon apples with custard.","sort":3},{"id":"w5","heading":"Chocolate Fondant","headingValue":"R 58","headingDescription":"Warm molten-centre chocolate cake with vanilla ice cream.","sort":4},{"id":"w6","heading":"Sticky Toffee Malva","headingValue":"R 49","headingDescription":"Malva pudding with sticky toffee glaze.","sort":5},{"id":"w7","heading":"Cinnamon Pancakes","headingValue":"R 46","headingDescription":"Warm pancakes with cinnamon-sugar & lemon.","sort":6}]},{"id":"05","tabName":"HenryDemo","tabNumber":3,"title":"Demo","sort":0,"propertyRows":[{"id":"h1","heading":"Item A","headingValue":"test","headingDescription":"test","sort":0}]},{"id":"06","tabName":"Claras Menu","tabNumber":4,"title":"Caps","sort":0,"propertyRows":[{"id":"c1","heading":"Blue Cap","headingValue":"R 100","headingDescription":"Premium fitted cap","sort":0}]}]};

function gbt(bl){const m={},o=[];bl.forEach(b=>{if(!m[b.tabName]){m[b.tabName]={tabName:b.tabName,sections:[]};o.push(b.tabName)}m[b.tabName].sections.push(b)});o.forEach(n=>m[n].sections.sort((a,b)=>a.sort-b.sort));return o.map(n=>m[n])}

const V={bg:"#F5F0E6",paper:"#FDFAF3",cream:"#EDE7D9",ink:"#2C2418",ink2:"#4A3F30",sub:"#7D7262",mut:"#A89E8E",brd:"#D4CAB8",bdk:"#B8AD9A",ac:"#8B2E14",acs:"#F5EBE6"};
const F={d:"'Libre Baskerville',Georgia,serif",b:"'Source Serif 4',Georgia,serif",sc:"'Playfair Display SC',serif",m:"'Courier Prime',monospace"};

function Fonts(){useEffect(()=>{const l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&family=Playfair+Display+SC:wght@400;700;900&family=Courier+Prime:wght@400;700&display=swap";l.rel="stylesheet";document.head.appendChild(l);return()=>document.head.removeChild(l)},[]);return null}

function Orn(){return(
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"4px 0"}}>
    <div style={{height:1,flex:1,maxWidth:40,background:V.brd}}/>
    <svg width={20} height={12} viewBox="0 0 20 12"><path d="M2 6C5 2,8 2,10 6C12 10,15 10,18 6" fill="none" stroke={V.bdk} strokeWidth={1.2}/><circle cx="10" cy="6" r="2" fill={V.ac} opacity={0.6}/></svg>
    <div style={{height:1,flex:1,maxWidth:40,background:V.brd}}/>
  </div>
)}

function VItem({item,last}){return(
  <div style={{padding:"12px 0",borderBottom:last?"none":"1px dotted "+V.brd}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8}}>
      <h4 style={{margin:0,fontSize:14.5,fontWeight:700,color:V.ink,fontFamily:F.d,lineHeight:1.4,flex:"0 1 auto"}}>{item.heading}</h4>
      <div style={{flex:1,minWidth:20,borderBottom:"1px dotted "+V.brd,marginBottom:4,opacity:0.5}}/>
      <span style={{fontSize:13,fontWeight:700,color:V.ac,fontFamily:F.m,whiteSpace:"nowrap",flexShrink:0}}>{item.headingValue}</span>
    </div>
    {item.headingDescription&&<p style={{margin:"3px 0 0",fontSize:12.5,color:V.sub,fontFamily:F.b,lineHeight:1.6,fontStyle:"italic",paddingRight:20}}>{item.headingDescription}</p>}
  </div>
)}

function VSec({section}){
  if(!section.title&&section.propertyRows.length===0)return null;
  return(
    <div style={{marginBottom:8,padding:"0 4px"}}>
      {section.title&&<div style={{textAlign:"center",padding:"20px 0 10px"}}><Orn/><h3 style={{margin:"6px 0 2px",fontSize:16,fontWeight:900,color:V.ink,fontFamily:F.sc,letterSpacing:"0.14em",textTransform:"uppercase",lineHeight:1.3}}>{section.title}</h3><Orn/></div>}
      {section.propertyRows.sort((a,b)=>a.sort-b.sort).map((r,i)=><VItem key={r.id} item={r} last={i===section.propertyRows.length-1}/>)}
    </div>
  );
}

function VTabs({tabs,active,onSelect}){return(
  <div style={{position:"sticky",top:0,zIndex:20,background:V.bg+"f2",backdropFilter:"blur(8px)",borderBottom:"2px solid "+V.bdk,borderTop:"2px solid "+V.bdk}}>
    <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",justifyContent:"center"}}>
      {tabs.map((t,i)=>{const a=active===i;return(
        <button key={t.tabName} onClick={()=>onSelect(i)} style={{padding:"10px 18px",border:"none",cursor:"pointer",fontFamily:F.sc,fontSize:11,fontWeight:a?900:400,letterSpacing:"0.1em",textTransform:"uppercase",color:a?V.ac:V.sub,background:a?V.acs:"transparent",borderBottom:a?"2px solid "+V.ac:"2px solid transparent",whiteSpace:"nowrap",transition:"all 0.2s",flexShrink:0,marginBottom:-2}}>{t.tabName}</button>
      )})}
    </div>
  </div>
)}

export default function GenericCardVintage(){
  const[at,sAt]=useState(0);const tabs=gbt(cd.cardBlocks),cur=tabs[at];
  return(<div style={{minHeight:"100vh",background:V.bg,fontFamily:F.b}}>
    <Fonts/>
    <div style={{maxWidth:420,margin:"0 auto",minHeight:"100vh",background:V.paper,position:"relative",boxShadow:"0 0 40px rgba(44,36,24,0.08),0 0 0 1px rgba(44,36,24,0.06)"}}>
      <div style={{height:4,background:"linear-gradient(90deg,"+V.brd+","+V.ac+","+V.brd+")"}}/>
      <div style={{position:"relative",width:"100%",aspectRatio:"4/2.6",overflow:"hidden",borderBottom:"3px double "+V.bdk}}>
        <img src={cd.details.logo} alt="" style={{width:"100%",height:"100%",objectFit:"cover",filter:"sepia(0.25) saturate(0.9) brightness(0.95)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 50%,"+V.paper+"dd 85%,"+V.paper+" 100%)"}}/>
        <div style={{position:"absolute",top:8,left:8,width:20,height:20,borderTop:"2px solid "+V.cream+"88",borderLeft:"2px solid "+V.cream+"88"}}/>
        <div style={{position:"absolute",top:8,right:8,width:20,height:20,borderTop:"2px solid "+V.cream+"88",borderRight:"2px solid "+V.cream+"88"}}/>
      </div>
      {cd.genericDetailsVisible&&<div style={{textAlign:"center",padding:"16px 28px 20px"}}>
        <h2 style={{margin:"0 0 6px",fontSize:26,fontWeight:700,color:V.ink,fontFamily:F.d,lineHeight:1.2,fontStyle:"italic"}}>{cd.details.description}</h2>
        {cd.details.details&&<p style={{margin:"0 0 3px",fontSize:13.5,color:V.ink2,fontFamily:F.b,lineHeight:1.5,fontWeight:300}}>{cd.details.details}</p>}
        {cd.details.information&&<p style={{margin:"0 0 14px",fontSize:12.5,color:V.sub,fontFamily:F.b,lineHeight:1.5,fontStyle:"italic"}}>{cd.details.information}</p>}
        {cd.details.enquireButton&&<button style={{padding:"10px 28px",border:"2px solid "+V.ac,borderRadius:2,background:"transparent",color:V.ac,fontSize:11,fontWeight:900,fontFamily:F.sc,cursor:"pointer",letterSpacing:"0.14em",textTransform:"uppercase"}}>{cd.details.enquireButtonText}</button>}
      </div>}
      {cd.genericBlocksVisible&&<><VTabs tabs={tabs} active={at} onSelect={sAt}/><div style={{padding:"4px 22px 40px"}}>{cur&&cur.sections.map(s=><VSec key={s.id} section={s}/>)}</div></>}
      <div style={{height:3,background:"linear-gradient(90deg,"+V.brd+","+V.ac+","+V.brd+")"}}/>
      <div style={{textAlign:"center",padding:"16px 20px 24px",background:V.cream}}><p style={{fontSize:9,color:V.mut,fontFamily:F.sc,letterSpacing:"0.16em",textTransform:"uppercase",margin:0}}>Powered by Personalyz</p></div>
    </div>
  </div>);
}
