import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════
   VEHICLE CARD PREVIEW — Mobile & Desktop layouts
   Toggle between the two with the tab bar at top
   ══════════════════════════════════════════════════════════ */

const SAMPLE = {
  companyName: "Jetour",
  orgUnitName: "Phoenix",
  emailAddress: "info@jetourmauritius.mu",
  vehicleDetailsVisible: true,
  vehiclePerformanceVisible: true,
  vehicleConditionVisible: true,
  vehicleCustomHtmlVisible: false,
  customHtml: null,
  vehicleDetails: {
    price: "more info", make: "JETOUR", model: "Dashing Momentum",
    mileage: "New", registrationYear: "New", transmission: "Auto",
    branch: "Phoenix", noOfSeats: "5", noOfDoors: "5", bodyType: "SUV",
    variant: "", colour: "Various", stockNumber: "",
  },
  vehiclePerformance: {
    fuelConsumption: "7.8l/100km", engineCapacity: "1.5 TCI + 6DCT (1498cc)",
    fuelTankCapacity: "57 l", fuelType: "Petrol", cylinderLayout: "",
    kilowatts: "197", drive: "Front", gears: "6-Speed DCT",
  },
  vehicleCondition: {
    roadworthyVoucher: "", vehicleServiceHistory: "New", category: "",
    spareKey: "Yes", warranty: "10 years",
  },
  images: [
    { sortId: 1, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/8508b1a6d62d4f85af5f32ff105bee12_Dashing2.jpg" },
    { sortId: 2, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/b67464b75f5b4e8cb48d02fd9fe032e2_Dashing3.jpg" },
    { sortId: 3, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/c9892c14faf94b408519d302a9e9ba9d_Dashing4.jpg" },
    { sortId: 5, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/552a02bc3f514a75aef81f4574b625c5_Dashing5.jpg" },
    { sortId: 6, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/aa1e9fb1de3b4f099a5b665081fc9f2e_Dashing6.jpg" },
    { sortId: 7, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/8acb527f17cf4f1dad8dd1000f53e9a0_Dashing1.jpg" },
    { sortId: 8, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/c7ffcc08788d4e52ae460cfe407f028c_color.jpg" },
    { sortId: 9, active: true, image: "https://personalyz-images.s3.af-south-1.amazonaws.com/p-er/per-db4e0724-b2e8-4eb0-8236-f45473903f9c/beb8f21f9b65414eb728735c4923a551_Jetour-Mauritius-Dashing-Momentum-Spec-Sheet-1080x1080.jpg" },
  ],
};

/* ─── helpers ─── */
const v = (val) => val != null && String(val).trim() !== "";
const labelMap = {
  price:"Price",make:"Make",model:"Model",mileage:"Mileage",registrationYear:"Reg. Year",
  transmission:"Transmission",branch:"Branch",noOfSeats:"Seats",noOfDoors:"Doors",
  bodyType:"Body Type",variant:"Variant",colour:"Colour",stockNumber:"Stock #",
  fuelConsumption:"Fuel Consumption",engineCapacity:"Engine",fuelTankCapacity:"Tank Capacity",
  fuelType:"Fuel Type",cylinderLayout:"Cylinder Layout",kilowatts:"Power (kW)",
  drive:"Drivetrain",gears:"Gearbox",roadworthyVoucher:"Roadworthy",
  vehicleServiceHistory:"Service History",category:"Category",spareKey:"Spare Key",warranty:"Warranty",
};

/* ─── icons ─── */
const I = {
  Mileage:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Trans:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 12h4m4 0h4M8 8v8m4-8v8"/></svg>,
  Fuel:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17"/><path d="M15 10h2a2 2 0 012 2v2a2 2 0 002 2 2 2 0 002-2V9.83a2 2 0 00-.59-1.42L18 4"/><path d="M3 22h12"/><path d="M7 9h4"/></svg>,
  Eco:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6"/><path d="M16 14l-4-2"/></svg>,
  Engine:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.73 12.73l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Kw:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Drive:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/></svg>,
  Left:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  Right:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 6 15 12 9 18"/></svg>,
  Mail:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  Share:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Chev:({flip})=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{transform:flip?"rotate(180deg)":"rotate(0)",transition:"transform .25s"}}><polyline points="6 9 12 15 18 9"/></svg>,
};

/* ─── tokens ─── */
const C = {
  accent:"#0072F5", bg:"#0E1117", surface:"#161B22", surfaceAlt:"#1C2230",
  border:"#2A3040", t1:"#F0F2F5", t2:"#8B95A5",
};

/* ─── shared sub-components ─── */
const Row = ({k,val})=>v(val)?( <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}><span style={{fontSize:13,color:C.t2,fontWeight:500}}>{labelMap[k]||k}</span><span style={{fontSize:13,fontWeight:600,textAlign:"right",maxWidth:"58%"}}>{val}</span></div> ):null;

/* ════════════════════════════════════════
   MOBILE LAYOUT
   ════════════════════════════════════════ */
function MobileCard({ data }) {
  const d=data.vehicleDetails||{};
  const p=data.vehiclePerformance||{};
  const c=data.vehicleCondition||{};
  const imgs=(data.images||[]).filter(i=>i.active).sort((a,b)=>a.sortId-b.sortId);
  const [idx,setIdx]=useState(0);
  const [open,setOpen]=useState({details:true,perf:false,cond:false});
  const tRef=useRef(null);

  useEffect(()=>{if(tRef.current?.children[idx])tRef.current.children[idx].scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});},[idx]);

  const titleLine=[d.registrationYear==="New"?"New":d.registrationYear,d.make,d.model,d.variant].filter(v).join(" ");
  const qStats=[
    {icon:<I.Mileage/>,l:"Mileage",v:d.mileage},{icon:<I.Trans/>,l:"Trans.",v:d.transmission},
    {icon:<I.Fuel/>,l:"Fuel",v:p.fuelType},{icon:<I.Eco/>,l:"Economy",v:p.fuelConsumption},
    {icon:<I.Engine/>,l:"Engine",v:p.engineCapacity},
  ].filter(s=>v(s.v));

  const Section=({id,title,children,vis})=>{
    if(!vis)return null;const o=open[id];
    return(<div style={{margin:"12px 20px 0",borderRadius:14,background:C.surface,border:`1px solid ${C.border}`,overflow:"hidden"}}>
      <button onClick={()=>setOpen(p=>({...p,[id]:!p[id]}))} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"15px 18px",background:"none",border:"none",color:C.t1,fontSize:15,fontWeight:700,cursor:"pointer"}}><span>{title}</span><I.Chev flip={o}/></button>
      <div style={{overflow:"hidden",maxHeight:o?900:0,opacity:o?1:0,transition:"max-height .35s ease,opacity .25s ease"}}><div style={{padding:"0 18px 8px"}}>{children}</div></div>
    </div>);
  };

  return(
    <div style={{maxWidth:420,margin:"0 auto",background:C.bg,color:C.t1,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",minHeight:"100%",paddingBottom:40}}>
      {/* Gallery */}
      {imgs.length>0&&(<div style={{background:"#0A0D12"}}>
        <div style={{position:"relative",width:"100%",aspectRatio:"4/3",overflow:"hidden",background:"#0A0D12"}}>
          <img src={imgs[idx]?.image} alt="" style={{width:"100%",height:"100%",objectFit:"contain",display:"block"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:"linear-gradient(transparent,rgba(14,17,23,.8))",pointerEvents:"none"}}/>
          {imgs.length>1&&(<>
            <button onClick={()=>setIdx(i=>i>0?i-1:imgs.length-1)} style={{...navBtnS,left:8}}><I.Left/></button>
            <button onClick={()=>setIdx(i=>i<imgs.length-1?i+1:0)} style={{...navBtnS,right:8}}><I.Right/></button>
          </>)}
          <div style={{position:"absolute",bottom:10,right:14,fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:500,zIndex:2}}>{idx+1} / {imgs.length}</div>
        </div>
        {imgs.length>1&&(<div ref={tRef} style={{display:"flex",gap:6,padding:"10px 14px 14px",overflowX:"auto",scrollbarWidth:"none"}}>
          {imgs.map((im,i)=>(<img key={im.sortId} src={im.image} alt="" onClick={()=>setIdx(i)} style={{width:58,height:44,borderRadius:8,objectFit:"cover",cursor:"pointer",border:i===idx?`2px solid ${C.accent}`:"2px solid transparent",opacity:i===idx?1:.45,transition:"all .2s",flexShrink:0}}/>))}
        </div>)}
      </div>)}

      {/* Title */}
      <div style={{padding:"20px 20px 4px"}}>
        {v(titleLine)&&<h1 style={{fontSize:22,fontWeight:700,margin:0,lineHeight:1.25,letterSpacing:"-.02em"}}>{titleLine}</h1>}
        {v(d.price)&&<div style={{fontSize:20,fontWeight:700,color:C.accent,marginTop:6,textTransform:"capitalize"}}>{d.price}</div>}
        {(v(data.companyName)||v(data.orgUnitName))&&<p style={{fontSize:13,color:C.t2,marginTop:6,marginBottom:0}}>{[data.companyName,data.orgUnitName].filter(v).join(" · ")}</p>}
      </div>

      {/* Actions */}
      <div style={{display:"flex",gap:10,padding:"14px 20px 4px"}}>
        {v(data.emailAddress)&&<a href={`mailto:${data.emailAddress}`} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.accent,color:"#fff",border:"none",borderRadius:10,padding:"12px 16px",fontSize:14,fontWeight:600,cursor:"pointer",textDecoration:"none"}}><I.Mail/><span>Enquire Now</span></a>}
        <button style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.surfaceAlt,color:C.t1,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 18px",fontSize:14,fontWeight:600,cursor:"pointer"}}><I.Share/><span>Share</span></button>
      </div>

      {/* Quick stats */}
      {qStats.length>0&&(<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,padding:"18px 20px 10px"}}>
        {qStats.map(s=>(<div key={s.l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:C.surface,borderRadius:12,padding:"14px 6px",border:`1px solid ${C.border}`}}>
          <span style={{color:C.accent,marginBottom:2}}>{s.icon}</span>
          <span style={{fontSize:10,color:C.t2,textTransform:"uppercase",letterSpacing:".06em",fontWeight:600}}>{s.l}</span>
          <span style={{fontSize:12,fontWeight:600,textAlign:"center",lineHeight:1.3}}>{s.v}</span>
        </div>))}
      </div>)}

      {/* Sections */}
      <Section id="details" title="Vehicle Details" vis={data.vehicleDetailsVisible}>
        {["make","model","variant","mileage","registrationYear","transmission","branch","noOfSeats","noOfDoors","bodyType","colour","stockNumber"].map(k=><Row key={k} k={k} val={d[k]}/>)}
      </Section>
      <Section id="perf" title="Performance" vis={data.vehiclePerformanceVisible}>
        {["fuelConsumption","engineCapacity","fuelTankCapacity","fuelType","cylinderLayout","kilowatts","drive","gears"].map(k=><Row key={k} k={k} val={p[k]}/>)}
      </Section>
      <Section id="cond" title="Vehicle Condition" vis={data.vehicleConditionVisible}>
        {["vehicleServiceHistory","roadworthyVoucher","category","spareKey","warranty"].map(k=><Row key={k} k={k} val={c[k]}/>)}
      </Section>

      {data.vehicleCustomHtmlVisible&&v(data.customHtml)&&(
        <div style={{margin:"12px 20px 0",borderRadius:14,background:C.surface,border:`1px solid ${C.border}`,padding:18}}><div dangerouslySetInnerHTML={{__html:data.customHtml}}/></div>
      )}

      {v(data.emailAddress)&&<div style={{textAlign:"center",padding:"28px 20px 0"}}><span style={{fontSize:11,color:C.t2}}>{data.emailAddress}</span></div>}
    </div>
  );
}

const navBtnS={position:"absolute",top:"50%",transform:"translateY(-50%)",zIndex:2,width:38,height:38,borderRadius:"50%",background:"rgba(22,27,34,.72)",border:"1px solid rgba(255,255,255,.1)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(6px)"};

/* ════════════════════════════════════════
   DESKTOP LAYOUT
   ════════════════════════════════════════ */
function DesktopCard({ data }) {
  const d=data.vehicleDetails||{};
  const p=data.vehiclePerformance||{};
  const c=data.vehicleCondition||{};
  const imgs=(data.images||[]).filter(i=>i.active).sort((a,b)=>a.sortId-b.sortId);
  const [idx,setIdx]=useState(0);
  const tRef=useRef(null);

  useEffect(()=>{if(tRef.current?.children[idx])tRef.current.children[idx].scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});},[idx]);

  const titleLine=[d.registrationYear==="New"?"New":d.registrationYear,d.make,d.model,d.variant].filter(v).join(" ");
  const qStats=[
    {icon:<I.Mileage/>,l:"Mileage",v:d.mileage},{icon:<I.Trans/>,l:"Transmission",v:d.transmission},
    {icon:<I.Fuel/>,l:"Fuel",v:p.fuelType},{icon:<I.Eco/>,l:"Economy",v:p.fuelConsumption},
    {icon:<I.Engine/>,l:"Engine",v:p.engineCapacity},{icon:<I.Kw/>,l:"Power",v:v(p.kilowatts)?`${p.kilowatts} kW`:null},
    {icon:<I.Drive/>,l:"Drivetrain",v:p.drive},
  ].filter(s=>v(s.v));

  const Panel=({title,children,vis})=>{
    if(!vis)return null;
    return(<div style={{background:C.surface,borderRadius:16,border:`1px solid ${C.border}`,padding:"22px 24px"}}>
      <h3 style={{fontSize:16,fontWeight:700,margin:0,letterSpacing:"-.01em"}}>{title}</h3>
      <div style={{height:1,background:C.border,margin:"14px 0 6px"}}/>
      {children}
    </div>);
  };

  const panels=[data.vehicleDetailsVisible,data.vehiclePerformanceVisible,data.vehicleConditionVisible].filter(Boolean).length;

  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",color:C.t1,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif"}}>
      {/* Hero */}
      <div style={{display:"grid",gridTemplateColumns:"1.45fr 1fr",gap:32,alignItems:"start"}}>
        {/* Gallery */}
        <div style={{borderRadius:16,overflow:"hidden",background:"#0A0D12",border:`1px solid ${C.border}`}}>
          <div style={{position:"relative",width:"100%",aspectRatio:"16/10",overflow:"hidden",background:"#0A0D12"}}>
            <img src={imgs[idx]?.image} alt="" style={{width:"100%",height:"100%",objectFit:"contain",display:"block"}}/>
            {imgs.length>1&&(<>
              <button onClick={()=>setIdx(i=>i>0?i-1:imgs.length-1)} style={{...navBtnS,left:14,width:42,height:42}}><I.Left/></button>
              <button onClick={()=>setIdx(i=>i<imgs.length-1?i+1:0)} style={{...navBtnS,right:14,width:42,height:42}}><I.Right/></button>
            </>)}
            <div style={{position:"absolute",bottom:12,right:16,fontSize:13,color:"rgba(255,255,255,.5)",fontWeight:500,zIndex:2}}>{idx+1} / {imgs.length}</div>
          </div>
          {imgs.length>1&&(<div ref={tRef} style={{display:"flex",gap:8,padding:"12px 14px 14px",overflowX:"auto",scrollbarWidth:"none"}}>
            {imgs.map((im,i)=>(<img key={im.sortId} src={im.image} alt="" onClick={()=>setIdx(i)} style={{width:72,height:52,borderRadius:8,objectFit:"cover",cursor:"pointer",border:i===idx?`2px solid ${C.accent}`:"2px solid transparent",opacity:i===idx?1:.4,transition:"all .2s",flexShrink:0}}/>))}
          </div>)}
        </div>

        {/* Info */}
        <div style={{paddingTop:8}}>
          {(v(data.companyName)||v(data.orgUnitName))&&<p style={{fontSize:13,color:C.t2,margin:"0 0 8px"}}>{[data.companyName,data.orgUnitName].filter(v).join(" · ")}</p>}
          {v(titleLine)&&<h1 style={{fontSize:28,fontWeight:700,margin:"0 0 8px",lineHeight:1.2,letterSpacing:"-.025em"}}>{titleLine}</h1>}
          {v(d.price)&&<div style={{fontSize:24,fontWeight:700,color:C.accent,marginBottom:22,textTransform:"capitalize"}}>{d.price}</div>}

          {qStats.length>0&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
            {qStats.map(s=>(<div key={s.l} style={{display:"flex",alignItems:"center",gap:12,background:C.surface,borderRadius:12,padding:"12px 14px",border:`1px solid ${C.border}`}}>
              <span style={{color:C.accent,flexShrink:0}}>{s.icon}</span>
              <div><div style={{fontSize:10,color:C.t2,textTransform:"uppercase",letterSpacing:".06em",fontWeight:600}}>{s.l}</div><div style={{fontSize:13,fontWeight:600,marginTop:2}}>{s.v}</div></div>
            </div>))}
          </div>)}

          <div style={{display:"flex",gap:12,marginBottom:4}}>
            {v(data.emailAddress)&&<a href={`mailto:${data.emailAddress}`} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.accent,color:"#fff",border:"none",borderRadius:10,padding:"13px 20px",fontSize:15,fontWeight:600,textDecoration:"none",cursor:"pointer"}}><I.Mail/><span>Enquire Now</span></a>}
            <button style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.surfaceAlt,color:C.t1,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 20px",fontSize:15,fontWeight:600,cursor:"pointer"}}><I.Share/><span>Share</span></button>
          </div>
          {v(data.emailAddress)&&<p style={{fontSize:13,color:C.t2,marginTop:12,marginBottom:0}}>{data.emailAddress}</p>}
        </div>
      </div>

      {/* Spec panels */}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${panels>=3?3:panels},1fr)`,gap:20,marginTop:32}}>
        <Panel title="Vehicle Details" vis={data.vehicleDetailsVisible}>
          {["make","model","variant","mileage","registrationYear","transmission","branch","noOfSeats","noOfDoors","bodyType","colour","stockNumber"].map(k=><Row key={k} k={k} val={d[k]}/>)}
        </Panel>
        <Panel title="Performance" vis={data.vehiclePerformanceVisible}>
          {["fuelConsumption","engineCapacity","fuelTankCapacity","fuelType","cylinderLayout","kilowatts","drive","gears"].map(k=><Row key={k} k={k} val={p[k]}/>)}
        </Panel>
        <Panel title="Vehicle Condition" vis={data.vehicleConditionVisible}>
          {["vehicleServiceHistory","roadworthyVoucher","category","spareKey","warranty"].map(k=><Row key={k} k={k} val={c[k]}/>)}
        </Panel>
      </div>

      {data.vehicleCustomHtmlVisible&&v(data.customHtml)&&(
        <div style={{background:C.surface,borderRadius:16,border:`1px solid ${C.border}`,padding:"22px 24px",marginTop:20}}>
          <h3 style={{fontSize:16,fontWeight:700,margin:0}}>More Information</h3>
          <div style={{height:1,background:C.border,margin:"14px 0 6px"}}/>
          <div dangerouslySetInnerHTML={{__html:data.customHtml}}/>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   PREVIEW WRAPPER (toggle Mobile / Desktop)
   ════════════════════════════════════════ */
export default function VehicleCardPreview() {
  const [mode, setMode] = useState("mobile");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "16px 16px 0" }}>
        {["mobile", "desktop"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "9px 28px",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 8,
              border: `1px solid ${mode === m ? C.accent : C.border}`,
              background: mode === m ? C.accent : C.surface,
              color: mode === m ? "#fff" : C.t2,
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            {m === "mobile" ? "📱 Mobile" : "🖥 Desktop"}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ padding: mode === "desktop" ? "24px 16px 40px" : "24px 0 40px" }}>
        {mode === "mobile" ? (
          <div style={{
            maxWidth: 420, margin: "0 auto",
            borderRadius: 20,
            border: `2px solid ${C.border}`,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,.5)",
          }}>
            <MobileCard data={SAMPLE} />
          </div>
        ) : (
          <div style={{ boxShadow: "0 24px 80px rgba(0,0,0,.3)" }}>
            <DesktopCard data={SAMPLE} />
          </div>
        )}
      </div>
    </div>
  );
}
