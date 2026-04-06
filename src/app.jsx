import { useState, useEffect } from "react";

const O = "#F26522", OL = "#FF7B3A", B = "#1B3472";
const G = {
  bg:"#07070C", card:"rgba(255,255,255,0.04)", brd:"rgba(255,255,255,0.08)",
  muted:"rgba(255,255,255,0.55)", dim:"rgba(255,255,255,0.28)",
};
const CALS = { ensenada:"oDvq85E6GQzcnFCjk4nD", tijuana:"VVbuahuUue9CU9MvtlyT" };
const MAX_PTS = 30, PASS = 16;

const IMG_URLS = {
  logo:     "https://assets.cdn.filesafe.space/xN1nux9vFTvdqmjYzRmQ/media/67a95d7d9769a703fa631ba9.png",
  wave:     "https://assets.cdn.filesafe.space/xN1nux9vFTvdqmjYzRmQ/media/69d314d9fa2dde9742664e92.png",
  thumbsup: "https://assets.cdn.filesafe.space/xN1nux9vFTvdqmjYzRmQ/media/69d314da84c045c2747cda57.png",
};

function useImages() {
  const [imgs, setImgs] = useState({});
  useEffect(() => {
    Object.entries(IMG_URLS).forEach(([key, url]) => {
      fetch(url).then(r => r.blob())
        .then(b => new Promise(res => { const rd = new FileReader(); rd.onload = () => res(rd.result); rd.readAsDataURL(b); }))
        .then(b64 => setImgs(p => ({...p, [key]: b64})))
        .catch(() => setImgs(p => ({...p, [key]: url})));
    });
  }, []);
  return imgs;
}

const TESTIMONIALS = {
  2: {
    quote: "Ser agente de seguros no solo es asesorar para proteger un patrimonio; es también conectar con las personas identificando sus necesidades mientras brindas seguridad y confianza. Debes ser parte de su círculo de personas favoritas... ¡SIEMPRE!",
    name: "Faby Cárdenas", role: "Agente GNP · Avanza Capital"
  },
  6: {
    quote: "Llegué a Avanza Capital justo cuando buscaba estabilidad financiera y crecimiento profesional. Puedo decirte que mi vida cambió radicalmente, y es algo que todos los que me conocen notaron rápidamente.",
    name: "Lino Yein Chiu", role: "Agente GNP · Avanza Capital"
  },
  9: {
    quote: "Gracias a Avanza Capital, encontré la estabilidad que buscaba sin renunciar a mi tiempo con mi familia. Hoy manejo mi propio negocio y mis ingresos han superado mis expectativas.",
    name: "Marcia Raphael", role: "Agente GNP · Avanza Capital"
  },
};

const Qs = [
  { key:"situation", cat:"PERFIL GENERAL",
    q:"¿Cuál es tu situación laboral actual?",
    note:"No existe respuesta incorrecta — buscamos entender tu punto de partida.",
    opts:[
      { t:"Desempleado, buscando activamente", p:2 },
      { t:"Empleado, pero busco una mejor oportunidad", p:2 },
      { t:"Emprendedor o freelancer", p:3 },
      { t:"Cuento con un negocio propio", p:2 },
    ]},
  { key:"education", cat:"FORMACIÓN ACADÉMICA",
    q:"¿Cuál es tu nivel máximo de estudios?",
    note:"La CNSF exige preparatoria terminada como mínimo para la certificación oficial de Agente de Seguros.",
    opts:[
      { t:"Secundaria o menos", p:0, hard:true, hardReason:"education" },
      { t:"Preparatoria terminada", p:1, val:"prepa" },
      { t:"Carrera universitaria trunca o en curso", p:2, val:"trunca" },
      { t:"Carrera universitaria terminada", p:3, val:"carrera" },
      { t:"Posgrado o especialización", p:3, val:"carrera" },
    ]},
  { key:"vehicle", cat:"REQUISITOS OPERATIVOS",
    q:"¿Cuentas con vehículo propio en buen estado?",
    note:"La movilidad propia es indispensable para visitar prospectos y clientes en su domicilio u oficina.",
    opts:[
      { t:"No cuento con vehículo propio", p:0, hard:true, hardReason:"vehicle" },
      { t:"Sí, cuento con vehículo propio", p:3 },
    ]},
  { key:"availability", cat:"DISPONIBILIDAD",
    q:"¿Cuántas horas por semana puedes dedicar al inicio de tu carrera?",
    note:"Mayor disponibilidad se traduce directamente en mayores oportunidades de generar ingresos.",
    opts:[
      { t:"Menos de 10 horas semanales", p:0 },
      { t:"Entre 10 y 20 horas semanales", p:1 },
      { t:"Entre 20 y 40 horas semanales", p:2 },
      { t:"Tiempo completo — disponibilidad total", p:3 },
    ]},
  { key:"experience", cat:"EXPERIENCIA COMERCIAL",
    q:"¿Tienes experiencia previa en ventas o atención al cliente?",
    note:"No es un requisito excluyente. El 40% de nuestros agentes exitosos comenzó sin experiencia en ventas.",
    opts:[
      { t:"Sin experiencia, pero con mucho interés en ventas", p:0, val:0 },
      { t:"Experiencia informal o empírica", p:1, val:1 },
      { t:"Experiencia formal en ventas o servicio al cliente", p:2, val:2 },
      { t:"Vendedor profesional con trayectoria comprobable", p:3, val:3 },
    ]},
  { key:"social", cat:"HABILIDADES INTERPERSONALES",
    q:"¿Cómo te describes al relacionarte con personas que no conoces?",
    note:"Las habilidades sociales son entrenables. Lo que buscamos es apertura y disposición genuina.",
    opts:[
      { t:"Me resulta difícil iniciar conversaciones nuevas", p:0 },
      { t:"Soy reservado, pero logro adaptarme con el tiempo", p:1 },
      { t:"Soy sociable y me relaciono con relativa facilidad", p:2 },
      { t:"Soy muy carismático y naturalmente persuasivo", p:3 },
    ]},
  { key:"rejection", cat:"MENTALIDAD Y RESILIENCIA",
    q:"Ante el rechazo de un prospecto, ¿cuál es tu reacción típica?",
    note:"En ventas, la resiliencia es la habilidad más valiosa y determinante del éxito a largo plazo.",
    opts:[
      { t:"Me afecta considerablemente y me cuesta reponerme", p:0 },
      { t:"Lo acepto, aunque genera cierto desánimo temporal", p:1 },
      { t:"Lo proceso como parte del proceso y continúo", p:2 },
      { t:"Lo analizo y lo uso para mejorar mi siguiente abordaje", p:3 },
    ]},
  { key:"motivation", cat:"MOTIVACIÓN",
    q:"¿Qué describe mejor tu razón principal para ser agente de seguros?",
    note:"Los agentes con motivación clara y de largo plazo construyen las carteras más sólidas y duraderas.",
    opts:[
      { t:"Necesito generar ingresos de forma inmediata", p:0 },
      { t:"Me interesa el sector financiero y de seguros", p:1 },
      { t:"Busco libertad financiera y autonomía de horario", p:2 },
      { t:"Quiero construir mi propio negocio y equipo de agentes", p:3 },
    ]},
  { key:"warmmarket", cat:"MERCADO NATURAL",
    q:"¿Con cuántas personas de tu entorno (familia, amigos, colegas) crees que podrías hablar sobre seguros?",
    note:"Tu mercado natural es la base de los primeros meses como agente. Mientras más amplio sea tu círculo, más rápido arrancas.",
    opts:[
      { t:"Menos de 10 personas", p:0 },
      { t:"Entre 10 y 30 personas", p:1 },
      { t:"Entre 30 y 60 personas", p:2 },
      { t:"Más de 60 — tengo una red de contactos amplia", p:3 },
    ]},
  { key:"income", cat:"METAS FINANCIERAS",
    q:"¿Cuál es tu objetivo de ingreso mensual como agente de seguros?",
    note:"Nuestros agentes top superan los $100,000 MXN mensuales. La ambición es un predictor clave de éxito.",
    opts:[
      { t:"Entre $8,000 y $15,000 MXN mensuales", p:0 },
      { t:"Entre $15,000 y $30,000 MXN mensuales", p:1 },
      { t:"Entre $30,000 y $60,000 MXN mensuales", p:2 },
      { t:"Más de $60,000 MXN — apunto al máximo potencial", p:3 },
    ]},
  { key:"city", cat:"UBICACIÓN",
    q:"¿En qué ciudad resides actualmente?",
    note:"Contamos con coordinadores y oficinas en Tijuana y Ensenada para apoyarte desde el primer día.",
    opts:[
      { t:"Tijuana", city:"tijuana" },
      { t:"Ensenada", city:"ensenada" },
      { t:"Rosarito", city:"tijuana" },
      { t:"Tecate", city:"tijuana" },
      { t:"Otra ciudad o estado", city:"tijuana" },
    ], isCity:true },
];

function qualify(meta, score, city) {
  if (meta.vehicle?.hard)   return { pass:false, reason:"vehicle" };
  if (meta.education?.hard) return { pass:false, reason:"education" };
  const edu = meta.education?.val, exp = meta.experience?.val ?? 0;
  if (city === "ensenada" && exp === 0) return { pass:false, reason:"ensenada_exp" };
  if (city === "tijuana" && edu === "prepa" && exp === 0) return { pass:false, reason:"tijuana" };
  if (score < PASS) return { pass:false, reason:"score" };
  return { pass:true };
}

/* ── Mr. Mike ── */
function MrMike({ pose="thumbsup", size=130, imgs={} }) {
  const src = imgs[pose];
  if (!src) return <div style={{width:size, height:size*1.3}}/>;
  return (
    <div style={{position:"relative", display:"inline-block"}}>
      <div style={{position:"absolute", inset:0, background:"radial-gradient(ellipse at center bottom, rgba(242,101,34,0.22), transparent 70%)", filter:"blur(20px)", transform:"translateY(10%)"}}/>
      <img src={src} alt="Mr. Mike" style={{width:size, height:size*1.3, objectFit:"contain", position:"relative", filter:"drop-shadow(0 12px 28px rgba(242,101,34,0.22))"}}/>
    </div>
  );
}

/* ── Logo ── */
function Logo({ src }) {
  if (!src) return <span style={{fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.4)"}}>Avanza Capital · GNP</span>;
  return <img src={src} alt="logo" style={{height:52, objectFit:"contain"}}/>;
}

/* ── Hero ── */
function Hero({ onStart, imgs }) {
  return (
    <div>
      <div style={{textAlign:"center", marginBottom:24, paddingBottom:20, borderBottom:`1px solid ${G.brd}`}}>
        <Logo src={imgs.logo}/>
      </div>

      {/* Headline + Mr. Mike */}
      <div style={{display:"grid", gridTemplateColumns:"1fr auto", gap:16, alignItems:"center", marginBottom:24}}>
        <div>
          <span style={{display:"inline-block", padding:"4px 12px", borderRadius:100, background:"rgba(242,101,34,0.12)", border:"1px solid rgba(242,101,34,0.35)", color:O, fontSize:11, fontWeight:600, marginBottom:14}}>
            🔥 +200 agentes activos en Baja California
          </span>
          <h1 style={{fontSize:"clamp(26px,6vw,38px)", fontWeight:900, lineHeight:1.06, letterSpacing:"-1px", marginBottom:10}}>
            ¿Tienes lo que<br/>se <span style={{background:`linear-gradient(135deg,${O},${OL})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>necesita?</span>
          </h1>
          <p style={{fontSize:13, color:G.muted, lineHeight:1.65}}>
            Avanza Capital, agencia líder de <strong style={{color:"white"}}>GNP Seguros</strong>, busca agentes con mentalidad ganadora.
          </p>
        </div>
        <div style={{flexShrink:0}}>
          <MrMike pose="wave" size={120} imgs={imgs}/>
        </div>
      </div>

      {/* Pain points */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:10, letterSpacing:"2px", color:O, fontWeight:700, textTransform:"uppercase", marginBottom:12}}>¿Te identificas con alguna de estas situaciones?</div>
        <div style={{display:"flex", flexDirection:"column", gap:7}}>
          {[
            ["😤","Dependes de un horario fijo que no te deja vivir a tu manera"],
            ["📉","Tus ingresos no crecen sin importar cuánto tiempo trabajas"],
            ["🚪","Quieres ser tu propio jefe pero no sabes por dónde empezar"],
            ["💸","Sientes que mereces ganar más de $100,000 MXN al mes"],
          ].map(([ic, txt], i) => (
            <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"11px 14px", background:G.card, border:`1px solid ${G.brd}`, borderLeft:`3px solid ${O}`, borderRadius:11}}>
              <span style={{fontSize:17, flexShrink:0}}>{ic}</span>
              <span style={{fontSize:13, color:G.muted, lineHeight:1.5}}>{txt}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:12, padding:"11px 16px", background:"rgba(242,101,34,0.07)", border:"1px solid rgba(242,101,34,0.2)", borderRadius:11}}>
          <p style={{fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.65, margin:0}}>
            Si te identificas con alguna de estas situaciones, la carrera de <strong style={{color:"white"}}>Agente GNP Seguros</strong> puede ser exactamente lo que estás buscando.
          </p>
        </div>
      </div>

      {/* GNP trust */}
      <div style={{background:"linear-gradient(135deg,rgba(27,52,114,0.28),rgba(27,52,114,0.12))", border:"1px solid rgba(27,52,114,0.45)", borderRadius:14, padding:"14px 17px", marginBottom:20}}>
        <div style={{display:"flex", gap:11, alignItems:"flex-start"}}>
          <div style={{fontSize:22, flexShrink:0}}>🏆</div>
          <div>
            <div style={{fontSize:13, fontWeight:700, color:"white", marginBottom:3}}>GNP Seguros — La aseguradora #1 de México</div>
            <div style={{fontSize:12, color:G.muted, lineHeight:1.6}}>3 de cada 5 seguros en México son de GNP. Al unirte a Avanza Capital estarás respaldado por la marca de mayor confianza del sector.</div>
          </div>
        </div>
      </div>

      {/* Process */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:10, letterSpacing:"2px", color:G.dim, fontWeight:700, textTransform:"uppercase", marginBottom:11}}>¿Cómo funciona el proceso?</div>
        {[
          ["01","Completa la evaluación de 10 preguntas (aprox. 3 minutos)"],
          ["02","Si tu perfil califica, agenda una entrevista por Zoom"],
          ["03","Una sesión de 15 minutos para despejar todas tus dudas — sin compromiso de contratación ni de incorporarte a GNP Seguros"],
        ].map(([n, txt], i) => (
          <div key={i} style={{display:"flex", gap:14, padding:"12px 0", borderBottom: i < 2 ? `1px solid ${G.brd}` : "none"}}>
            <div style={{fontSize:11, fontWeight:800, color:O, minWidth:24, flexShrink:0, paddingTop:1}}>{n}</div>
            <span style={{fontSize:13, color:G.muted, lineHeight:1.65}}>{txt}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:24}}>
        {[["10","preguntas"],["~3 min","duración"],["Zoom","entrevista"]].map(([n,l],i) => (
          <div key={i} style={{textAlign:"center", padding:"11px 8px", background:G.card, border:`1px solid ${G.brd}`, borderRadius:11}}>
            <div style={{fontSize:16, fontWeight:800, color:O}}>{n}</div>
            <div style={{fontSize:10, color:G.dim, marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>

      <button onClick={onStart} style={{width:"100%", padding:"16px 24px", background:`linear-gradient(135deg,${O},#C44D10)`, border:"none", borderRadius:13, color:"white", fontWeight:800, fontSize:16, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 0 30px rgba(242,101,34,0.22)", letterSpacing:"0.2px"}}>
        Iniciar Evaluación →
      </button>
      <p style={{fontSize:11, color:G.dim, textAlign:"center", marginTop:10}}>Sin compromiso · Información confidencial</p>
    </div>
  );
}

/* ── Testimonial ── */
function TestimonialScreen({ data, onContinue }) {
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", minHeight:"60vh"}}>
      <div style={{fontSize:10, letterSpacing:"2px", color:O, fontWeight:700, textTransform:"uppercase", marginBottom:20}}>Lo que dicen nuestros agentes</div>
      <div style={{background:G.card, border:`1px solid ${G.brd}`, borderLeft:`3px solid ${O}`, borderRadius:16, padding:"24px 22px", marginBottom:28}}>
        <div style={{fontSize:28, color:O, lineHeight:1, marginBottom:12, opacity:0.6}}>"</div>
        <p style={{fontSize:15, color:"rgba(255,255,255,0.85)", lineHeight:1.8, fontStyle:"italic", marginBottom:20}}>{data.quote}</p>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <div style={{width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${O},${B})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"white", flexShrink:0}}>
            {data.name[0]}
          </div>
          <div>
            <div style={{fontSize:13, fontWeight:700, color:"white"}}>{data.name}</div>
            <div style={{fontSize:11, color:G.dim, marginTop:2}}>{data.role}</div>
          </div>
        </div>
      </div>
      <button onClick={onContinue} style={{width:"100%", padding:"15px 24px", background:`linear-gradient(135deg,${O},#C44D10)`, border:"none", borderRadius:13, color:"white", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"inherit"}}>
        Continuar la evaluación →
      </button>
    </div>
  );
}

/* ── Question ── */
function Question({ q, n, total, onAnswer }) {
  const [sel, setSel] = useState(null);
  const select = opt => { setSel(opt); setTimeout(() => { setSel(null); onAnswer(opt); }, 380); };
  const nn = String(n).padStart(2,"0");
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
        <span style={{fontSize:10, letterSpacing:"2px", fontWeight:700, color:O, textTransform:"uppercase"}}>{q.cat}</span>
        <span style={{fontSize:11, color:G.dim, fontWeight:500}}>{nn} / {String(total).padStart(2,"0")}</span>
      </div>
      <div style={{height:2, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden", marginBottom:28}}>
        <div style={{height:"100%", width:`${((n-1)/total)*100}%`, background:`linear-gradient(90deg,${O},${OL})`, transition:"width 0.45s ease"}}/>
      </div>
      <div style={{fontSize:56, fontWeight:900, lineHeight:1, color:"rgba(255,255,255,0.03)", letterSpacing:"-4px", marginBottom:2, userSelect:"none"}}>{nn}</div>
      <h2 style={{fontSize:"clamp(17px,4vw,22px)", fontWeight:800, lineHeight:1.35, marginBottom:22, marginTop:-14}}>{q.q}</h2>
      <div style={{display:"flex", flexDirection:"column", gap:9, marginBottom:20}}>
        {q.opts.map((o,i) => {
          const active = sel === o;
          return (
            <button key={i} onClick={()=>select(o)} style={{
              width:"100%", textAlign:"left", padding:"14px 16px",
              background: active ? "rgba(242,101,34,0.1)" : G.card,
              border:`1px solid ${active ? O : G.brd}`,
              borderLeft:`3px solid ${active ? O : "rgba(255,255,255,0.05)"}`,
              borderRadius:11, color: active ? "white" : "rgba(255,255,255,0.72)",
              cursor:"pointer", fontFamily:"inherit", fontSize:13.5,
              fontWeight: active ? 600 : 400,
              display:"flex", alignItems:"center", gap:13,
              transition:"all 0.15s ease",
              transform: active ? "translateX(3px)" : "none",
            }}>
              <div style={{width:18, height:18, borderRadius:"50%", flexShrink:0, border:`1.5px solid ${active ? O : "rgba(255,255,255,0.2)"}`, background: active ? O : "transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s ease"}}>
                {active && <div style={{width:7, height:7, borderRadius:"50%", background:"white"}}/>}
              </div>
              {o.t}
            </button>
          );
        })}
      </div>
      {q.note && (
        <div style={{paddingTop:14, borderTop:`1px solid ${G.brd}`}}>
          <p style={{fontSize:11, color:G.dim, lineHeight:1.7, margin:0}}>{q.note}</p>
        </div>
      )}
    </div>
  );
}

/* ── Loading ── */
function Loading({ pct, imgs }) {
  const [bar, setBar] = useState(0);
  useEffect(() => { const t = setTimeout(() => setBar(pct), 150); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{textAlign:"center"}}>
      <div style={{display:"flex", justifyContent:"center", marginBottom:18}}>
        <MrMike pose="thumbsup" size={110} imgs={imgs}/>
      </div>
      <div style={{fontSize:10, letterSpacing:"2.5px", color:O, fontWeight:700, textTransform:"uppercase", marginBottom:8}}>Procesando respuestas</div>
      <h2 style={{fontSize:21, fontWeight:800, marginBottom:10}}>Evaluando tu perfil…</h2>
      <p style={{color:G.muted, fontSize:13, marginBottom:26, lineHeight:1.65}}>Analizando compatibilidad con el programa<br/>de Agentes GNP Seguros</p>
      <div style={{background:G.card, border:`1px solid ${G.brd}`, borderRadius:16, padding:22}}>
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
          <span style={{fontSize:12, color:G.muted}}>Índice de compatibilidad</span>
          <span style={{fontSize:14, fontWeight:700, color:O}}>{pct}%</span>
        </div>
        <div style={{height:4, background:"rgba(255,255,255,0.07)", borderRadius:2, overflow:"hidden", marginBottom:22}}>
          <div style={{height:"100%", width:`${bar}%`, background:`linear-gradient(90deg,${O},${OL})`, borderRadius:2, transition:"width 2.4s ease"}}/>
        </div>
        {["Perfil general y disponibilidad","Formación y requisitos operativos","Aptitud y experiencia comercial","Mentalidad y resiliencia","Metas y mercado natural"].map((l,i) => (
          <div key={i} style={{display:"flex", alignItems:"center", gap:10, marginBottom:i<4?10:0}}>
            <div style={{width:5, height:5, borderRadius:"50%", background:O, opacity:0.7, flexShrink:0}}/>
            <span style={{fontSize:11.5, color:G.muted}}>Evaluando {l}…</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Result ── */
const FAILS = {
  vehicle:      { title:"Requisito no cumplido — Vehículo propio", body:"La movilidad propia es un requisito operativo indispensable. No es negociable. Te invitamos a postularte nuevamente cuando cuentes con vehículo propio." },
  education:    { title:"Requisito no cumplido — Nivel educativo", body:"La CNSF exige preparatoria terminada como mínimo para emitir la certificación de Agente de Seguros. Es un requisito regulatorio. Concluye tus estudios y vuelve a postularte." },
  ensenada_exp: { title:"Perfil no compatible para Ensenada", body:"El equipo de Ensenada requiere experiencia previa en ventas o servicio al cliente. Cuando cuentes con esa experiencia, te invitamos a aplicar nuevamente." },
  tijuana:      { title:"Perfil no compatible en esta ocasión", body:"Para Tijuana y zona norte requerimos carrera universitaria o experiencia relevante en ventas. Aplica nuevamente cuando cumplas estos criterios." },
  score:        { title:"Perfil no aprobado en esta evaluación", body:"Tu perfil actual no alcanza el puntaje mínimo de compatibilidad. Las circunstancias y habilidades evolucionan — te invitamos a volver a postularte en el futuro." },
};

function Result({ qResult, city, pct, imgs }) {
  const calId = CALS[city] ?? CALS.tijuana;
  useEffect(() => {
    if (!qResult.pass) return;
    const s = document.createElement("script"); s.src = "https://crm.avanzacapital.mx/js/form_embed.js"; s.type = "text/javascript";
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch(_) {} };
  }, [qResult.pass]);

  if (!qResult.pass) {
    const m = FAILS[qResult.reason] || FAILS.score;
    return (
      <div>
        <div style={{textAlign:"center", marginBottom:26}}>
          <div style={{width:58, height:58, borderRadius:"50%", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 15px", fontSize:22}}>✕</div>
          <div style={{fontSize:10, letterSpacing:"2px", color:"rgba(239,100,100,0.8)", fontWeight:700, textTransform:"uppercase", marginBottom:10}}>Perfil No Aprobado</div>
          <h2 style={{fontSize:20, fontWeight:800, lineHeight:1.3, marginBottom:13}}>{m.title}</h2>
          <p style={{color:G.muted, fontSize:13.5, lineHeight:1.8}}>{m.body}</p>
        </div>
        <div style={{background:G.card, border:`1px solid ${G.brd}`, borderRadius:14, padding:"15px 18px", marginBottom:13}}>
          <div style={{fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.5)", marginBottom:7}}>¿Qué puedes hacer?</div>
          <p style={{fontSize:13, color:G.muted, lineHeight:1.75, margin:0}}>Nuestro equipo está en constante crecimiento. Cumple los requisitos faltantes y postúlate nuevamente — con gusto evaluaremos tu perfil.</p>
        </div>
        <div style={{background:"rgba(27,52,114,0.18)", border:"1px solid rgba(27,52,114,0.38)", borderRadius:12, padding:"13px 16px", textAlign:"center"}}>
          <div style={{fontSize:11, color:G.dim}}>Proceso administrado por</div>
          <div style={{fontSize:13, fontWeight:800, color:"white", marginTop:4}}>Avanza Capital × GNP Seguros</div>
        </div>
      </div>
    );
  }

  const level = pct >= 80 ? "Perfil Sobresaliente" : pct >= 60 ? "Perfil Aprobado" : "Perfil Básico Aprobado";
  return (
    <div>
      <div style={{textAlign:"center", marginBottom:20}}>
        <div style={{display:"flex", justifyContent:"center", marginBottom:16}}>
          <MrMike pose="thumbsup" size={130} imgs={imgs}/>
        </div>
        <div style={{display:"inline-flex", alignItems:"center", gap:6, padding:"5px 14px", borderRadius:100, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.32)", marginBottom:13}}>
          <div style={{width:5, height:5, borderRadius:"50%", background:"#22C55E"}}/>
          <span style={{fontSize:11, fontWeight:700, color:"#22C55E", letterSpacing:"0.5px"}}>PERFIL APROBADO</span>
        </div>
        <h2 style={{fontSize:"clamp(19px,4.5vw,25px)", fontWeight:900, lineHeight:1.15, marginBottom:13}}>
          {level} —{" "}
          <span style={{background:`linear-gradient(130deg,${O},${OL})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
            Agente GNP Seguros
          </span>
        </h2>
        <div style={{background:G.card, border:`1px solid ${G.brd}`, borderRadius:13, padding:"14px 18px", marginBottom:14, textAlign:"left"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:8}}>
            <span style={{fontSize:11.5, color:G.muted}}>Índice de compatibilidad</span>
            <span style={{fontSize:22, fontWeight:900, color:O, lineHeight:1}}>{pct}%</span>
          </div>
          <div style={{height:5, background:"rgba(255,255,255,0.07)", borderRadius:3, overflow:"hidden"}}>
            <div style={{height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${O},${OL})`, borderRadius:3}}/>
          </div>
        </div>
      </div>

      <div style={{background:"rgba(27,52,114,0.2)", border:"1px solid rgba(27,52,114,0.42)", borderRadius:14, padding:"15px 17px", marginBottom:16}}>
        <div style={{fontSize:11, fontWeight:700, color:"rgba(150,170,255,0.8)", letterSpacing:"1px", textTransform:"uppercase", marginBottom:8}}>Siguiente paso</div>
        <p style={{fontSize:13, color:"rgba(255,255,255,0.8)", lineHeight:1.75, margin:0}}>
          Agenda una <strong style={{color:"white"}}>entrevista por Zoom de 15 minutos</strong> con nuestro equipo de reclutamiento. Es tu oportunidad para despejar todas tus dudas sobre la carrera de agente de seguros.
          <br/><br/>
          <span style={{color:G.muted}}>Esta entrevista no implica ningún compromiso de contratación ni de incorporarte a GNP Seguros.</span>
        </p>
      </div>

      <div style={{background:"rgba(27,52,114,0.15)", border:"1px solid rgba(27,52,114,0.35)", borderRadius:12, padding:"11px 16px", marginBottom:18, textAlign:"center"}}>
        <span style={{fontSize:12, color:G.muted}}>Serás agente certificado de </span>
        <span style={{fontSize:12, fontWeight:700, color:"white"}}>GNP Seguros · 3 de cada 5 seguros en México 🏆</span>
      </div>

      <div style={{background:G.card, border:`1px solid ${G.brd}`, borderRadius:16, padding:16, marginBottom:14}}>
        <div style={{fontSize:12.5, fontWeight:600, color:"rgba(255,255,255,0.75)", textAlign:"center", marginBottom:14}}>
          📅 Agenda tu entrevista por Zoom:
        </div>
        <iframe src={`https://crm.avanzacapital.mx/widget/booking/${calId}`} id={`cal_${calId}`}
          style={{width:"100%", border:"none", minHeight:520, borderRadius:10, display:"block"}} scrolling="no"/>
      </div>

      <div style={{background:"rgba(34,197,94,0.07)", border:"1px solid rgba(34,197,94,0.25)", borderRadius:12, padding:"13px 16px", marginBottom:12}}>
        <div style={{display:"flex", gap:10, alignItems:"flex-start"}}>
          <span style={{fontSize:18, flexShrink:0}}>📲</span>
          <p style={{fontSize:12.5, color:"rgba(255,255,255,0.72)", lineHeight:1.7, margin:0}}>
            Una vez agendada tu cita, recibirás una <strong style={{color:"white"}}>confirmación por WhatsApp y correo electrónico</strong>. Mantente atento a ambos canales.
          </p>
        </div>
      </div>
      <p style={{fontSize:10.5, color:G.dim, textAlign:"center", marginTop:4}}>
        🔒 Tu información es estrictamente confidencial · Avanza Capital × GNP Seguros
      </p>
    </div>
  );
}

/* ── Main ── */
export default function App() {
  const imgs = useImages();
  const [phase,       setPhase]       = useState("hero");
  const [step,        setStep]        = useState(0);
  const [score,       setScore]       = useState(0);
  const [city,        setCity]        = useState("tijuana");
  const [meta,        setMeta]        = useState({});
  const [show,        setShow]        = useState(true);
  const [qResult,     setQResult]     = useState(null);
  const [testimonial, setTestimonial] = useState(null);
  const [nextStep,    setNextStep]    = useState(null);

  const pct = Math.min(100, Math.round((score / MAX_PTS) * 100));
  const fade = fn => { setShow(false); setTimeout(() => { fn(); setShow(true); }, 255); };

  const answer = opt => {
    const q = Qs[step];
    let s = score, c = city, m = {...meta};
    if (q.isCity) { c = opt.city; }
    else { s = score + (opt.p || 0); m[q.key] = opt; }
    setScore(s); setCity(c); setMeta(m);

    if (step === Qs.length - 1) {
      setPhase("loading");
      setTimeout(() => { setQResult(qualify(m, s, c)); setPhase("result"); }, 2800);
    } else {
      const ns = step + 1;
      if (TESTIMONIALS[step]) {
        fade(() => { setTestimonial(TESTIMONIALS[step]); setNextStep(ns); setPhase("testimonial"); });
      } else {
        fade(() => setStep(ns));
      }
    }
  };

  const afterTestimonial = () => {
    fade(() => { setTestimonial(null); setStep(nextStep); setPhase("quiz"); });
  };

  return (
    <div style={{minHeight:"100vh", background:G.bg, color:"white", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", position:"relative", overflow:"hidden"}}>
      <div style={{position:"fixed", width:480, height:480, borderRadius:"50%", background:`radial-gradient(circle,${O},transparent 70%)`, opacity:0.055, filter:"blur(100px)", top:-140, right:-80, pointerEvents:"none", zIndex:0}}/>
      <div style={{position:"fixed", width:420, height:420, borderRadius:"50%", background:`radial-gradient(circle,${B},transparent 70%)`, opacity:0.09, filter:"blur(100px)", bottom:-110, left:-60, pointerEvents:"none", zIndex:0}}/>

      {(phase === "quiz" || phase === "testimonial") && (
        <div style={{position:"fixed", top:0, left:0, right:0, zIndex:20, background:"rgba(7,7,12,0.92)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:`1px solid ${G.brd}`, padding:"11px 20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Logo src={imgs.logo}/>
          <span style={{fontSize:11, color:G.dim, fontWeight:500, letterSpacing:"0.3px"}}>Evaluación Agente GNP</span>
        </div>
      )}

      <div style={{position:"relative", zIndex:1, maxWidth:560, margin:"0 auto", padding:(phase==="quiz"||phase==="testimonial") ? "82px 20px 40px" : "30px 20px", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center"}}>
        <div style={{opacity:show?1:0, transform:show?"translateY(0)":"translateY(10px)", transition:"opacity 0.25s ease, transform 0.25s ease"}}>
          {phase==="hero"        && <Hero              onStart={()=>fade(()=>setPhase("quiz"))} imgs={imgs}/>}
          {phase==="quiz"        && <Question          q={Qs[step]} n={step+1} total={Qs.length} onAnswer={answer}/>}
          {phase==="testimonial" && <TestimonialScreen data={testimonial} onContinue={afterTestimonial}/>}
          {phase==="loading"     && <Loading           pct={pct} imgs={imgs}/>}
          {phase==="result"      && <Result            qResult={qResult} city={city} pct={pct} imgs={imgs}/>}
        </div>
      </div>
    </div>
  );
}