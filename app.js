// v11 fix2
const $ = s => document.querySelector(s);
const calGrid = $('#calGrid');
const monthTitle = $('#monthTitle');
const planTableBody = $('#planTable tbody');
const dateInput = $('#dateInput');
const drugSelect = $('#drugSelect');
const strengthSelect = $('#strengthSelect');
const bottlesInput = $('#bottlesInput');
const dayLoading = $('#dayLoading');
const sumLoading = $('#sumLoading');
const panelTitle = $('#panelTitle');
const diag = $('#diag');
let current = new Date();
let monthCache = {};
let strengthCache = {};

const ymd = d => {
  const y=d.getFullYear(), m=('0'+(d.getMonth()+1)).slice(-2), dd=('0'+d.getDate()).slice(-2);
  return `${y}-${m}-${dd}`;
};

async function api(action, payload){
  try{
    const u = GAS_BASE+'?action='+encodeURIComponent(action)+
              '&payload='+encodeURIComponent(JSON.stringify(payload||{}))+
              '&_ts='+Date.now();
    const r = await fetch(u, {method:'GET'});
    if(!r.ok) throw new Error('http '+r.status);
    return await r.json();
  }catch(_){}
  const r2 = await fetch(GAS_BASE+'?action='+encodeURIComponent(action), {
    method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'},
    body: JSON.stringify(payload||{})
  });
  if(!r2.ok) throw new Error('http '+r2.status);
  return await r2.json();
}

// ---- Calendar ----
async function getMonth(y,m){
  const key = `${y}-${('0'+(m+1)).slice(-2)}`;
  if(monthCache[key]) return monthCache[key];
  const data = await api('monthSummary', {month:key});
  monthCache[key] = data.byDate || {};
  return monthCache[key];
}
function renderCalendar(y,m,byDate){
  calGrid.innerHTML='';
  monthTitle.textContent = new Date(y,m,1).toLocaleString('th-TH',{month:'long',year:'numeric'});
  const first=new Date(y,m,1);
  const start=(first.getDay()+6)%7; // Monday-first
  const days=new Date(y,m+1,0).getDate();
  for(let i=0;i<start;i++){ const ph=document.createElement('div'); ph.className='cell placeholder'; ph.style.visibility='hidden'; calGrid.appendChild(ph); }
  const today = ymd(new Date());
  for(let d=1; d<=days; d++){
    const dt=new Date(y,m,d), key=ymd(dt);
    const cell=document.createElement('div'); cell.className='cell';
    if(key<today) cell.classList.add('past'); else if(key===today) cell.classList.add('today');
    const head=document.createElement('div'); head.className='d'; head.textContent=d; cell.appendChild(head);
    const items=byDate[key]||[];
    items.slice(0,3).forEach(it=>{ const pill=document.createElement('div'); pill.className='pill'; pill.textContent=`${it.drug} × ${it.bottles}`; cell.appendChild(pill); });
    if(items.length>3){ const more=document.createElement('div'); more.style.fontSize='11px'; more.style.opacity='.6'; more.textContent=`…อีก ${items.length-3}`; cell.appendChild(more); }
    cell.onclick=()=>{ dateInput.value=key; panelTitle.textContent='รายการเตรียมยา: '+key; refreshDay(); refreshSummary(); };
    calGrid.appendChild(cell);
  }
}
async function refreshCalendar(){
  const y=current.getFullYear(), m=current.getMonth();
  const by=await getMonth(y,m);
  renderCalendar(y,m,by);
}

// ---- Drugs & Strengths ----
async function loadDrugs(){
  const [dr, rec] = await Promise.all([ api('listDrugs',{}), api('listRecipes',{}) ]);
  const drugs=(dr.drugs||[]).slice().sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'}));
  drugSelect.innerHTML='<option value="" selected disabled>เลือกชื่อยา</option>';
  drugs.forEach(d=>{ const o=document.createElement('option'); o.value=d; o.textContent=d; drugSelect.appendChild(o); });
  const pairs=rec.pairs||[]; const map={};
  pairs.forEach(p=>{ const k=(p.drug||'').toLowerCase().trim(); (map[k] ||= new Set()).add(p.strength); });
  Object.keys(map).forEach(k=> strengthCache[k]=Array.from(map[k]).sort());
}
async function loadStrengths(drug){
  const key=(drug||'').toLowerCase().trim();
  strengthSelect.innerHTML='<option value="" selected disabled>โหลดความแรง…</option>';
  if(strengthCache[key]){ paintStrengths(strengthCache[key]); return; }
  let strengths=[]; try{ const r=await api('listStrengths',{drug}); strengths=r.strengths||[]; }catch(_){}
  strengthCache[key]=strengths; paintStrengths(strengths);
}
function paintStrengths(list){
  strengthSelect.innerHTML='<option value="" selected disabled>เลือกความแรงของยานี้</option>';
  if(!list||!list.length){ diag.textContent='ไม่พบความแรงของยานี้ในสูตร'; return; }
  diag.textContent=''; list.forEach(s=>{ const o=document.createElement('option'); o.value=s; o.textContent=s; strengthSelect.appendChild(o); });
}

// ---- Day list ----
async function refreshDay(){
  dayLoading.hidden=false;
  const date=dateInput.value||ymd(new Date());
  const r=await api('listByDate',{date});
  planTableBody.innerHTML='';
  (r.items||[]).forEach(it=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${it.drug}</td><td>${it.strength}</td><td>${it.bottles}</td>
                  <td><button class="btn del" data-id="${it.id}">ลบ</button></td>`;
    planTableBody.appendChild(tr);
  });
  planTableBody.querySelectorAll('.del').forEach(b=>b.onclick=async()=>{
    await api('deleteItem',{id:b.dataset.id});
    const keyM=(date.slice(0,7)), by=monthCache[keyM]; if(by && by[date]) by[date]=by[date].filter(x=>x.id!==b.dataset.id);
    await Promise.all([refreshDay(), refreshSummary(), refreshCalendar()]);
  });
  dayLoading.hidden=true;
}

// ---- Summary ----
function normalizeDrugsSummary(r){
  if(Array.isArray(r?.drugs) && r.drugs.length) return r.drugs;
  if(Array.isArray(r?.byDrug) && r.byDrug.length) return r.byDrug;
  if(Array.isArray(r?.items) && r.items.length){
    const g={}; r.items.forEach(it=>{ const k=(it.drug+'|'+it.strength).toLowerCase();
      (g[k] ||= {drug:it.drug,strength:it.strength,bottles_total:0}).bottles_total += Number(it.bottles||0); });
    return Object.values(g);
  }
  return [];
}
async function refreshSummary(){
  sumLoading.hidden=false;
  const date=dateInput.value||ymd(new Date());
  let r = await api('summaryForDate',{date});
  let rows = normalizeDrugsSummary(r);
  if(!rows.length){
    const lb = await api('listByDate',{date});
    rows = normalizeDrugsSummary({items: lb.items||[]});
  }
  const dBody=document.querySelector('#tblDrugs tbody'); dBody.innerHTML='';
  rows.forEach(x=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${x.drug}</td><td>${x.strength}</td><td>${x.bottles_total}</td>`; dBody.appendChild(tr); });
  const mBody=document.querySelector('#tblMats tbody'); mBody.innerHTML='';
  if(Array.isArray(r.materials) && r.materials.length){
    r.materials.forEach(x=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${x.component_name}</td><td>${x.unit}</td><td>${x.qty_total}</td>`; mBody.appendChild(tr); });
  }else{
    const tr=document.createElement('tr'); tr.innerHTML='<td>-</td><td>-</td><td>-</td>'; mBody.appendChild(tr);
  }
  sumLoading.hidden=true;
}

// ---- Events ----
document.getElementById('prevMonth').onclick=async()=>{ current=new Date(current.getFullYear(), current.getMonth()-1, 1); await refreshCalendar(); };
document.getElementById('nextMonth').onclick=async()=>{ current=new Date(current.getFullYear(), current.getMonth()+1, 1); await refreshCalendar(); };
monthTitle.onclick=async()=>{ current=new Date(); await refreshCalendar(); };
document.getElementById('todayBtn').onclick=async()=>{ current=new Date(); dateInput.value=ymd(new Date()); await Promise.all([refreshCalendar(),refreshDay(),refreshSummary()]); };
document.getElementById('printBtn').onclick=()=>{ const d=dateInput.value||ymd(new Date()); window.open('print.html?date='+encodeURIComponent(d),'_blank'); };
document.getElementById('flushBtn').onclick=async()=>{ await window.open("https://apps-npr.github.io/Sticker/","_blank"); };
drugSelect.addEventListener('change',()=>loadStrengths(drugSelect.value));

document.getElementById('addForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const date=dateInput.value||ymd(new Date());
  const drug=drugSelect.value;
  const strength=strengthSelect.value;
  const bottles=Number(bottlesInput.value||0);
  await api('addItem',{date,drug,strength,bottles});
  // optimistic update → calendar
  const keyM=date.slice(0,7);
  (monthCache[keyM] ||= {});
  (monthCache[keyM][date] ||= []).push({id:'tmp_'+Date.now(),drug,strength,bottles});
  // optimistic update → day table
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${drug}</td><td>${strength}</td><td>${bottles}</td><td></td>`;
  planTableBody.appendChild(tr);
  // optimistic update → summary (from current day table)
  const g={};
  planTableBody.querySelectorAll('tr').forEach(row=>{
    const tds=row.querySelectorAll('td');
    if(tds.length>=3){
      const d=tds[0].textContent.trim(), s=tds[1].textContent.trim(), b=Number(tds[2].textContent.trim()||0);
      const k=(d+'|'+s).toLowerCase(); (g[k] ||= {drug:d,strength:s,bottles_total:0}).bottles_total+=b;
    }
  });
  const dBody=document.querySelector('#tblDrugs tbody'); dBody.innerHTML='';
  Object.values(g).forEach(x=>{ const r=document.createElement('tr'); r.innerHTML=`<td>${x.drug}</td><td>${x.strength}</td><td>${x.bottles_total}</td>`; dBody.appendChild(r); });
  // reset inputs
  drugSelect.value=''; strengthSelect.innerHTML='<option value="" selected disabled>เลือกความแรงของยานี้</option>'; bottlesInput.value=1;
  await Promise.all([refreshCalendar(), refreshSummary()]);
});

(async function init(){
  dateInput.value = ymd(new Date());
  await Promise.all([loadDrugs(), refreshCalendar(), refreshDay(), refreshSummary()]);
})();
