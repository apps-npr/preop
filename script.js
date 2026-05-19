// --- Database: รายการยา (Updated Full List + New Categories) ---
const drugDatabase = [
    // 1. Anticoagulants & DOACs
    { id: 'warfarin', name: 'Warfarin (Coumadin)', category: 'anticoagulant' },
    { id: 'apixaban', name: 'Apixaban (Eliquis)', category: 'doac' },
    { id: 'rivaroxaban', name: 'Rivaroxaban (Xarelto)', category: 'doac' },
    { id: 'dabigatran', name: 'Dabigatran (Pradaxa)', category: 'doac_dabi' },
    { id: 'edoxaban', name: 'Edoxaban (Lixiana)', category: 'doac' },
    
    // 2. Antiplatelets
    { id: 'aspirin', name: 'Aspirin (ASA)', category: 'antiplatelet' },
    { id: 'clopidogrel', name: 'Clopidogrel (Plavix)', category: 'antiplatelet' },
    { id: 'ticagrelor', name: 'Ticagrelor (Brilinta)', category: 'antiplatelet' },
    { id: 'prasugrel', name: 'Prasugrel (Effient)', category: 'antiplatelet' },
    { id: 'cilostazol', name: 'Cilostazol (Pletaal)', category: 'antiplatelet' },

    // 3. Diabetes (SGLT2i / GLP-1 / Oral)
    { id: 'dapagliflozin', name: 'Dapagliflozin (Forxiga)', category: 'sglt2' },
    { id: 'empagliflozin', name: 'Empagliflozin (Jardiance)', category: 'sglt2' },
    { id: 'canagliflozin', name: 'Canagliflozin (Invokana)', category: 'sglt2' },
    { id: 'ertugliflozin', name: 'Ertugliflozin (Steglatro)', category: 'sglt2_4d' }, // SSTOP exception
    { id: 'semaglutide_inj', name: 'Semaglutide Inj. (Ozempic/Wegovy)', category: 'glp1_weekly' },
    { id: 'dulaglutide', name: 'Dulaglutide (Trulicity)', category: 'glp1_weekly' },
    { id: 'tirzepatide', name: 'Tirzepatide (Mounjaro)', category: 'glp1_weekly' },
    { id: 'liraglutide', name: 'Liraglutide (Victoza/Saxenda)', category: 'glp1_daily' },
    { id: 'metformin', name: 'Metformin', category: 'dm_oral' },
    { id: 'sulfonylurea', name: 'Sulfonylureas (Glipizide/Glibenclamide)', category: 'dm_oral' },

    // 4. Cardiovascular
    { id: 'acei', name: 'ACE Inhibitors (Enalapril/Lisinopril)', category: 'raas_inhibitor' },
    { id: 'arb', name: 'ARBs (Losartan/Valsartan)', category: 'raas_inhibitor' },
    { id: 'betablocker', name: 'Beta-blockers (Atenolol/Bisoprolol)', category: 'betablocker' },
    { id: 'diuretic', name: 'Diuretics (Furosemide/HCTZ)', category: 'diuretic' },
    { id: 'statin', name: 'Statins (Atorvastatin/Simvastatin/Rosuvastatin)', category: 'statin' },

    // 5. NSAIDs
    { id: 'nsaid_short', name: 'Ibuprofen / Diclofenac / Ketorolac', category: 'nsaid_short' },
    { id: 'nsaid_med', name: 'Naproxen / Meloxicam', category: 'nsaid_med' },
    { id: 'nsaid_long', name: 'Piroxicam (Half-life ยาว)', category: 'nsaid_long' },
    { id: 'cox2', name: 'Celecoxib / Etoricoxib (Arcoxia)', category: 'nsaid_cox2' },

    // 6. Herbals & Supplements
    { id: 'herb_bleed', name: 'Fish Oil / Ginkgo (แปะก๊วย) / Garlic / Vitamin E', category: 'herbal_bleed' },
    { id: 'herb_cns', name: 'Kava / Valerian / St. John\'s Wort / โสม', category: 'herbal_cns' },
    { id: 'herb_thai', name: 'กระชายดำ / ขมิ้นชัน / ฟ้าทะลายโจร', category: 'herbal_thai' },

    // 7. Psychiatric & Neurological (MAOIs, Lithium, Parkinson)
    { id: 'maoi', name: 'MAOIs (Phenelzine)', category: 'maoi' },
    { id: 'selegiline', name: 'Selegiline (< 10 mg/day)', category: 'selegiline' },
    { id: 'lithium', name: 'Lithium', category: 'lithium' },
    { id: 'parkinson', name: 'Levodopa / Amantadine (Parkinson)', category: 'parkinson' },
    { id: 'ssri_tca', name: 'SSRIs / TCAs (Antidepressants)', category: 'ssri_tca' },

    // 8. DMARDs & Biologics (Rheumatology)
    { id: 'dmard_conv', name: 'csDMARDs (Methotrexate/Sulfasalazine/HCQ)', category: 'dmard_conv' },
    { id: 'biologic_eta', name: 'Etanercept (Enbrel)', category: 'biologic_1_2w' },
    { id: 'biologic_ada', name: 'Adalimumab (Humira)', category: 'biologic_2_3w' },
    { id: 'jak_inhibitor', name: 'JAK Inhibitors (Tofacitinib/Baricitinib)', category: 'jak_inhibitor' },

    // 9. Hormones, HIV, Others
    { id: 'chc_hrt', name: 'ยาคุมกำเนิด (CHC) / ยาฮอร์โมนทดแทน (HRT)', category: 'hormone' },
    { id: 'hiv_art', name: 'ยารักษา HIV (ART)', category: 'hiv' },
    { id: 'thyroid', name: 'Levothyroxine (Thyroid)', category: 'thyroid' },
    { id: 'pde5', name: 'Sildenafil / Tadalafil (PDE5i)', category: 'pde5' }
];

// --- Database: รายการหัตถการ (Procedure Database) ---
const procedureDatabase = [
    // Minimal Risk
    { name: "Cataract surgery (ผ่าตัดต้อกระจก)", risk: "minimal", riskLabel: "Minimal Risk" },
    { name: "Minor dental procedures (ถอนฟัน 1-2 ซี่, ขูดหินปูน, รักษารากฟัน)", risk: "minimal", riskLabel: "Minimal Risk" },
    { name: "Minor dermatologic excision (ผ่าตัดผิวหนังขนาดเล็ก, ตัดไฝ, ซีสต์)", risk: "minimal", riskLabel: "Minimal Risk" },
    { name: "Pacemaker / ICD implant (ใส่เครื่องกระตุ้นหัวใจ)", risk: "minimal", riskLabel: "Minimal Risk" },
    { name: "Bone marrow aspiration (เจาะไขกระดูก)", risk: "minimal", riskLabel: "Minimal Risk" },
    { name: "Arthrocentesis / Joint injection (เจาะน้ำในข้อ, ฉีดยาเข้าข้อ)", risk: "minimal", riskLabel: "Minimal Risk" },
    { name: "Superficial abscess drainage (กรีดหนองตื้นๆ)", risk: "minimal", riskLabel: "Minimal Risk" },

    // Low/Moderate Risk
    { name: "Laparoscopic Cholecystectomy (ผ่าตัดถุงน้ำดีผ่านกล้อง)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Inguinal Hernia Repair (ผ่าตัดไส้เลื่อนขาหนีบ)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Appendectomy (ผ่าตัดไส้ติ่ง)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Endoscopy / Colonoscopy with biopsy (ส่องกล้องกระเพาะ/ลำไส้ และตัดชิ้นเนื้อ)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Arthroscopy (ส่องกล้องข้อเข่า, ข้อไหล่)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Breast surgery (ผ่าตัดเต้านม)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Minor orthopedic surgery (ผ่าตัดกระดูก/ข้อขนาดเล็ก เช่น มือ, เท้า)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Major gynecologic surgery (ผ่าตัดมดลูก, รังไข่, นรีเวช)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Prostate biopsy (เจาะชิ้นเนื้อต่อมลูกหมาก)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },
    { name: "Cardiac catheterization (ฉีดสีดูหลอดเลือดหัวใจ Diagnostic)", risk: "low-mod", riskLabel: "Low/Moderate Risk" },

    // High Risk
    { name: "Major abdominal surgery / Cancer (ผ่าตัดใหญ่ช่องท้อง / ผ่าตัดมะเร็ง)", risk: "high", riskLabel: "High Risk" },
    { name: "Bowel resection (ผ่าตัดตัดต่อลำไส้)", risk: "high", riskLabel: "High Risk" },
    { name: "Major orthopedic surgery (ผ่าตัดเปลี่ยนข้อเข่า, ข้อสะโพก TKR/THR)", risk: "high", riskLabel: "High Risk" },
    { name: "Thoracic surgery (ผ่าตัดปอด, ช่องอก)", risk: "high", riskLabel: "High Risk" },
    { name: "Vascular surgery / AAA repair (ผ่าตัดหลอดเลือดใหญ่)", risk: "high", riskLabel: "High Risk" },
    { name: "Major urologic surgery / TURP / Nephrectomy (ผ่าตัดทางเดินปัสสาวะใหญ่, ขูดต่อมลูกหมาก, ตัดไต)", risk: "high", riskLabel: "High Risk" },
    { name: "Liver or Kidney biopsy (เจาะชิ้นเนื้อตับ หรือ ไต)", risk: "high", riskLabel: "High Risk" },
    { name: "CABG / Open heart surgery (ผ่าตัดบายพาสหัวใจ, เปิดหน้าอก)", risk: "high", riskLabel: "High Risk" },

    // Neuroaxial / Critical Site
    { name: "Intracranial surgery / Craniotomy (ผ่าตัดสมอง, เปิดกะโหลกศีรษะ)", risk: "neuro-spine", riskLabel: "Neuroaxial/Critical Site" },
    { name: "Spinal surgery (ผ่าตัดกระดูกสันหลัง, ไขสันหลัง)", risk: "neuro-spine", riskLabel: "Neuroaxial/Critical Site" },
    { name: "Spinal / Epidural anesthesia (บล็อกหลัง, แทงเข็มไขสันหลัง)", risk: "neuro-spine", riskLabel: "Neuroaxial/Critical Site" },
    { name: "Posterior eye surgery / Vitrectomy (ผ่าตัดจอประสาทตา, ส่วนหลังลูกตา)", risk: "neuro-spine", riskLabel: "Neuroaxial/Critical Site" }
];

let selectedDrugs = [];

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    // ยา (Drugs)
    const searchInput = document.getElementById('drugSearch');
    if (searchInput) {
        searchInput.addEventListener('focus', () => filterDrugs(true));
        searchInput.addEventListener('click', () => filterDrugs(true));
        searchInput.addEventListener('keyup', () => filterDrugs(false));
    }

    // หัตถการ (Procedures)
    const procSearchInput = document.getElementById('procedureSearch');
    if (procSearchInput) {
        procSearchInput.addEventListener('focus', () => filterProcedures(true));
        procSearchInput.addEventListener('click', () => filterProcedures(true));
        procSearchInput.addEventListener('keyup', () => filterProcedures(false));
    }

    document.addEventListener('click', (e) => {
        // Hide drug list
        const drugContainer = document.getElementById('drugListContainer');
        const drugInput = document.getElementById('drugSearch');
        if (drugContainer && !drugContainer.contains(e.target) && e.target !== drugInput) {
            drugContainer.style.display = 'none';
        }

        // Hide procedure list
        const procContainer = document.getElementById('procedureListContainer');
        const procInput = document.getElementById('procedureSearch');
        if (procContainer && !procContainer.contains(e.target) && e.target !== procInput) {
            procContainer.style.display = 'none';
        }
    });
});

// --- UI Functions ---
function toggleInfo(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

// --- Procedure Search Functions ---
function filterProcedures(showAll = false) {
    const input = document.getElementById('procedureSearch').value.toLowerCase();
    const listContainer = document.getElementById('procedureListContainer');
    listContainer.innerHTML = '';
    listContainer.style.display = 'block';

    const filtered = showAll && input === '' 
        ? procedureDatabase 
        : procedureDatabase.filter(p => p.name.toLowerCase().includes(input));

    if (filtered.length === 0) {
        listContainer.innerHTML = '<div class="drug-item" style="color:#999; cursor:default;">ไม่พบหัตถการนี้ ลองพิมพ์คำอื่น หรือเลือกความเสี่ยงเองจากเมนูด้านล่าง</div>';
        return;
    }

    filtered.forEach(proc => {
        const div = document.createElement('div');
        div.className = 'drug-item';
        
        let riskColor = proc.risk === 'minimal' ? '#28a745' : 
                        proc.risk === 'low-mod' ? '#fd7e14' : 
                        proc.risk === 'high' ? '#dc3545' : '#8b0000';
        
        div.innerHTML = `
            <div><strong>${proc.name}</strong></div>
            <div style="font-size: 0.85rem; color: ${riskColor}; font-weight: bold;"><i class="fa-solid fa-flag"></i> ${proc.riskLabel}</div>
        `;
        div.onclick = () => selectProcedure(proc);
        listContainer.appendChild(div);
    });
}

function selectProcedure(proc) {
    document.getElementById('procedureSearch').value = proc.name;
    document.getElementById('procedureListContainer').style.display = 'none';
    
    const selectEl = document.getElementById('bleedingRisk');
    selectEl.value = proc.risk;
    
    // Highlight
    selectEl.style.transition = 'background-color 0.3s';
    selectEl.style.backgroundColor = '#e2f0cb'; 
    setTimeout(() => {
        selectEl.style.backgroundColor = '#f8f9fa';
    }, 800);
}

// --- Drug Search Functions ---
function filterDrugs(showAll = false) {
    const input = document.getElementById('drugSearch').value.toLowerCase();
    const listContainer = document.getElementById('drugListContainer');
    listContainer.innerHTML = '';
    listContainer.style.display = 'block';

    const filtered = showAll && input === '' 
        ? drugDatabase 
        : drugDatabase.filter(d => d.name.toLowerCase().includes(input));

    if (filtered.length === 0) {
        listContainer.innerHTML = '<div class="drug-item" style="color:#999; cursor:default;">ไม่พบชื่อยา</div>';
        return;
    }

    filtered.forEach(drug => {
        const div = document.createElement('div');
        div.className = 'drug-item';
        div.innerText = drug.name;
        div.onclick = () => selectDrug(drug);
        listContainer.appendChild(div);
    });
}

function selectDrug(drug) {
    if (!selectedDrugs.find(d => d.id === drug.id)) {
        selectedDrugs.push(drug);
        renderSelectedDrugs();
        checkSpecificQuestions();
    }
    const searchInput = document.getElementById('drugSearch');
    searchInput.value = '';
    document.getElementById('drugListContainer').style.display = 'none';
}

function removeDrug(id) {
    selectedDrugs = selectedDrugs.filter(d => d.id !== id);
    renderSelectedDrugs();
    checkSpecificQuestions();
}

function renderSelectedDrugs() {
    const container = document.getElementById('selectedTags');
    const area = document.getElementById('selectedDrugsArea');
    
    if (selectedDrugs.length > 0) {
        area.classList.remove('hidden');
    } else {
        area.classList.add('hidden');
    }

    container.innerHTML = '';
    selectedDrugs.forEach(drug => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `${drug.name} <i class="fa-solid fa-times" onclick="removeDrug('${drug.id}')"></i>`;
        container.appendChild(tag);
    });
}

// --- Dynamic Questions Logic ---
function checkSpecificQuestions() {
    const container = document.getElementById('dynamicQuestions');
    const section = document.getElementById('step-3');
    container.innerHTML = '';
    let hasQuestions = false;

    // 1. Warfarin
    if (selectedDrugs.find(d => d.id === 'warfarin')) {
        hasQuestions = true;
        const refImage = `<div class="image-container mt-2"><img src="ref_warfarin.jpg" onerror="this.style.display='none'" onclick="openModal(this.src)" alt="Warfarin Management"></div>`;

        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-heart-crack"></i> Warfarin: Thrombotic Risk Assessment</h4>
                <p class="small-text">เลือกข้อที่ผู้ป่วยมี (เพื่อประเมิน Bridging):</p>
                
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">Mechanical Heart Valve:</label><br>
                    <label><input type="checkbox" id="war_mech_mitral"> ลิ้นหัวใจเทียมตำแหน่ง Mitral</label><br>
                    <label><input type="checkbox" id="war_mech_aortic"> ลิ้นหัวใจเทียมตำแหน่ง Aortic รุ่นเก่า</label><br>
                    <label><input type="checkbox" id="war_mech_stroke"> เคยมี Stroke/TIA ภายใน 6 เดือน</label>
                </div>
                <hr>
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">
                        Atrial Fibrillation (AF) 
                        <button class="btn-xs" onclick="openChadModal()" style="margin-left:5px; background:#17a2b8; color:white; border:none; padding:2px 8px; border-radius:10px; cursor:pointer; font-size:0.8rem;">
                            <i class="fa-solid fa-calculator"></i> คำนวณ
                        </button>
                        <i class="fa-solid fa-circle-info tooltip-icon" onclick="toggleInfo('tip-af')" title="รายละเอียด CHA2DS2-VASc"></i>
                    </label>
                    <div id="tip-af" class="info-box hidden small-text" style="background:#fff3cd;">
                        <strong>High Risk Features:</strong><br>
                        - CHA2DS2-VASc ≥ 7<br>
                        - Rheumatic Heart Disease (Mitral Stenosis)
                    </div>
                    <br>
                    <label><input type="checkbox" id="war_af_high"> CHA2DS2-VASc score ≥ 7</label><br>
                    <label><input type="checkbox" id="war_af_stroke"> เคยมี Stroke/TIA ภายใน 3 เดือน</label><br>
                    <label><input type="checkbox" id="war_af_rheumatic"> เป็น Rheumatic Heart Disease</label>
                </div>
                <hr>
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">
                        VTE (DVT/PE)
                        <i class="fa-solid fa-circle-info tooltip-icon" onclick="toggleInfo('tip-vte')"></i>
                    </label>
                    <div id="tip-vte" class="info-box hidden small-text" style="background:#fff3cd;">
                        <strong>Severe Thrombophilia:</strong> Protein C/S deficiency, Antithrombin deficiency
                    </div>
                    <br>
                    <label><input type="checkbox" id="war_vte_recent"> เพิ่งเป็น VTE ภายใน 3 เดือน</label><br>
                    <label><input type="checkbox" id="war_vte_severe"> มีภาวะ Severe Thrombophilia</label>
                </div>
                <div class="image-container mt-2">
                   <img src="thrombotic_risk.jpg" alt="ตารางความเสี่ยง" style="width:100%; max-width:400px; border-radius:5px;">
                </div>
                ${refImage}
            </div>
        `;
        container.innerHTML += html;
    }

    // 2. ACEI/ARB
    if (selectedDrugs.find(d => d.category === 'raas_inhibitor')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box" style="border-left-color: #f0ad4e; background-color: #fcf8e3;">
                <h4><i class="fa-solid fa-heart-pulse"></i> ACEI/ARB: ข้อบ่งใช้หลัก</h4>
                <select id="raas_indication" class="form-control">
                    <option value="ht">รักษาความดันโลหิตสูง (Hypertension)</option>
                    <option value="hf">รักษาหัวใจล้มเหลว (Heart Failure - HFrEF)</option>
                </select>
            </div>
        `;
        container.innerHTML += html;
    }

    // 3. Antiplatelet
    if (selectedDrugs.some(d => d.category === 'antiplatelet')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-ring"></i> Antiplatelet: ประวัติขดลวด (Stent)</h4>
                <select id="stent_status" class="form-control" onchange="toggleStentDate()">
                    <option value="no">ไม่เคย / นานมากแล้ว (> 1 ปี)</option>
                    <option value="yes">เคยใส่ (ภายใน 1 ปี)</option>
                </select>
                <div id="stent_details" class="hidden mt-2">
                    <input type="text" id="stent_time_text" class="form-control" placeholder="ระยะเวลาตั้งแต่ใส่ Stent">
                    <select id="stent_type" class="form-control mt-2">
                        <option value="des">Drug-Eluting Stent (DES)</option>
                        <option value="bms">Bare Metal Stent (BMS)</option>
                    </select>
                </div>
            </div>
        `;
        container.innerHTML += html;
    }

    // 4. GLP-1 Weekly
    if (selectedDrugs.find(d => d.category === 'glp1_weekly')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-syringe"></i> GLP-1 Weekly: มื้อล่าสุด</h4>
                <input type="date" id="glp1_last_date" class="form-control">
                <small class="text-muted">สำคัญ! เพื่อประเมินความเสี่ยง Full Stomach</small>
            </div>
        `;
        container.innerHTML += html;
    }

    // 5. PDE5i
    if (selectedDrugs.find(d => d.category === 'pde5')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-pills"></i> Sildenafil/Tadalafil: ข้อบ่งใช้หลัก</h4>
                <select id="pde5_indication" class="form-control">
                    <option value="ed">รักษาภาวะหย่อนสมรรถภาพทางเพศ (ED)</option>
                    <option value="pah">รักษาความดันหลอดเลือดปอดสูง (PAH)</option>
                </select>
            </div>
        `;
        container.innerHTML += html;
    }

    // 6. Hormone/CHC
    if (selectedDrugs.find(d => d.category === 'hormone')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-venus"></i> ยาคุมกำเนิด/ฮอร์โมน (CHC/HRT)</h4>
                <label>การผ่าตัดในครั้งนี้ เป็นการผ่าตัดใหญ่ที่ผู้ป่วยต้องนอนติดเตียงนาน (Prolonged immobilization) หรือไม่?</label>
                <select id="hormone_immobilize" class="form-control">
                    <option value="no">ไม่ใช่ (การผ่าตัดเล็ก หรือเคลื่อนไหวได้เร็ว)</option>
                    <option value="yes">ใช่ (ผ่าตัดใหญ่ / ต้องนอนติดเตียงนาน)</option>
                </select>
            </div>
        `;
        container.innerHTML += html;
    }

    if (hasQuestions) section.classList.remove('hidden');
    else section.classList.add('hidden');
}

window.toggleStentDate = function() {
    const status = document.getElementById('stent_status').value;
    const details = document.getElementById('stent_details');
    if (status === 'yes') details.classList.remove('hidden');
    else details.classList.add('hidden');
}

// --- Main Logic ---
function processResults() {
    const bleedRisk = document.getElementById('bleedingRisk').value;
    const crclInput = document.getElementById('renalFunction').value;
    const crcl = crclInput ? parseInt(crclInput) : 90;
    
    const resultDiv = document.getElementById('resultContent');
    const resultSection = document.getElementById('results-section');
    const surgeryDateStr = document.getElementById('surgeryDate').value;
    const surgeryDate = surgeryDateStr ? new Date(surgeryDateStr) : null;

    if (!bleedRisk) {
        alert("กรุณาระบุความเสี่ยงเลือดออก (Bleeding Risk) ใน Step 1 ก่อนครับ");
        return;
    }

    let recommendations = "";

    selectedDrugs.forEach(drug => {
        let advice = "";
        let styleClass = "rec-stop";
        let bridgingContent = ""; 
        let refImage = ""; 

        // 1. Warfarin
        if (drug.id === 'warfarin') {
            refImage = `<div class="image-container mt-2"><img src="ref_warfarin.jpg" onerror="this.style.display='none'" onclick="openModal(this.src)"></div>`;

            if (bleedRisk === 'minimal') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ไม่ต้องหยุดยา (Continue)</span> <br><small>เช็ค INR ก่อนทำ 1-2 วัน (Target 2-3)</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา 5 วันก่อนผ่าตัด</span>`;
                
                const isMechMitral = document.getElementById('war_mech_mitral')?.checked;
                const isMechAorticOld = document.getElementById('war_mech_aortic')?.checked;
                const isMechStroke = document.getElementById('war_mech_stroke')?.checked;
                const isAfHigh = document.getElementById('war_af_high')?.checked;
                const isAfStroke = document.getElementById('war_af_stroke')?.checked;
                const isAfRheum = document.getElementById('war_af_rheumatic')?.checked;
                const isVteRecent = document.getElementById('war_vte_recent')?.checked;
                const isVteSevere = document.getElementById('war_vte_severe')?.checked;

                const needBridging = isMechMitral || isMechAorticOld || isMechStroke || 
                                     isAfHigh || isAfStroke || isAfRheum || 
                                     isVteRecent || isVteSevere;

                if (needBridging) {
                    styleClass = "rec-bridge";
                    advice += `<br><strong>⚠️ Bridging Required:</strong> ความเสี่ยงลิ่มเลือดสูง (High Risk)`;
                    bridgingContent = generateBridgingRegimen(crcl, bleedRisk);
                } else {
                    advice += `<br><small class="text-muted">✅ ไม่ต้อง Bridging (Low/Moderate Risk)</small>`;
                }
            }
        }
        
        // 2. DOACs
        else if (drug.category === 'doac' || drug.category === 'doac_dabi') {
            refImage = `<div class="image-container mt-2"><img src="ref_doac.png" onerror="this.style.display='none'" onclick="openModal(this.src)"></div>`;
            let stopDays = 0;
            
            if (drug.category === 'doac_dabi') {
                if (crcl >= 50) stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                else stopDays = (bleedRisk === 'low-mod') ? 2 : 4;
                if (crcl < 30) advice = `<strong>${drug.name}:</strong> ⚠️ Contraindicated (CrCl ต่ำมาก)`;
            } else {
                stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                if (bleedRisk === 'neuro-spine') stopDays = 3;
            }

            if (!advice) { 
                if (bleedRisk === 'minimal') {
                     advice = `<strong>${drug.name}:</strong> พิจารณาไม่หยุดยา (งดมื้อเช้าวันผ่าตัด) หรือหยุด 1 วัน,,`;
                     styleClass = "rec-continue";
                } else {
                     advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา ${stopDays} วันก่อนผ่าตัด (งด Bridging),,</span>`;
                     if (crcl < 30) advice += ` <br>⚠️ ระวัง: ไตเสื่อมอาจต้องหยุดนานกว่านี้`;
                }
            }
            
            // Reversal Agent
            advice += `<br><small>🚨 <strong>Emergency Reversal:</strong> `;
            if (drug.category === 'doac_dabi') advice += `Idarucizumab (Praxbind) 5g IV หรือ Dialysis,</small>`;
            else advice += `Andexanet alfa หรือ 4F-PCC (Beriplex 50 units/kg),,</small>`;
        }

        // 3. Antiplatelets
        else if (drug.category === 'antiplatelet') {
            refImage = `<div class="image-container mt-2"><img src="ref_antiplatelet.png" onerror="this.style.display='none'" onclick="openModal(this.src)"></div>`;

            if (drug.id === 'aspirin') {
                if (bleedRisk === 'neuro-spine') {
                    advice = `<strong>${drug.name}:</strong> หยุดยา 7 วันก่อนผ่าตัด (Neuro/Eye Risk)`;
                } else {
                    advice = `<strong>${drug.name}:</strong> <span style="color:green">ไม่ต้องหยุดยา (Continue)</span>`;
                    styleClass = "rec-continue";
                }
            } else {
                let days = 5;
                if (drug.id === 'ticagrelor') days = 3; 
                if (drug.id === 'prasugrel') days = 7;
                if (drug.id === 'cilostazol') days = 3; 
                advice = `<strong>${drug.name}:</strong> หยุดยา ${days} วันก่อนผ่าตัด`;
                advice += `<br><small>🚨 <strong>Emergency/Failed to Stop:</strong> ไม่มียาแก้ฤทธิ์โดยตรง แพทย์อาจพิจารณา Platelet transfusion หรือ Tranexamic acid</small>`;
            }

            const stentStatus = document.getElementById('stent_status')?.value;
            if (stentStatus === 'yes') {
                 advice += `<br><div class="warning-box" style="margin-top:5px; background:#FFF0F0; padding:10px; border:1px solid red; border-radius:5px;">
                 <strong>🚨 Stent Alert:</strong> ผู้ป่วยเพิ่งใส่ Stent < 1 ปี<br>
                 - โปรดปรึกษา Cardiologist ก่อนหยุดยา Antiplatelet</div>`;
            }
        }

        // 4. Diabetes (SGLT2i, GLP-1, Oral)
        else if (drug.category.startsWith('sglt2')) {
            let days = drug.category === 'sglt2_4d' ? '4 วัน' : '3 วัน,';
            advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา ${days} ก่อนผ่าตัด ป้องกัน EDKA,</span>`;
            advice += `<br><small>🚨 <strong>Emergency/Failed to Stop:</strong> แม้น้ำตาลปกติ แต่อาจเกิดเลือดเป็นกรดรุนแรง หากต้องผ่าตัดฉุกเฉิน ให้วิสัญญีแพทย์บริหารสารละลาย Dextrose 5% ควบคู่กับ Insulin infusion เสมอ เพื่อปิด Anion gap, </small>`;
        }
        else if (drug.category === 'glp1_weekly') {
            advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา 1 สัปดาห์เต็มก่อนผ่าตัด (ป้องกัน Full stomach)</span>`;
            const lastDoseStr = document.getElementById('glp1_last_date')?.value;
            if (lastDoseStr && surgeryDate) {
                const diffTime = Math.abs(surgeryDate - new Date(lastDoseStr));
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if (diffDays < 7) {
                    advice += `<br><span style="color:red">⚠️ <strong>Full Stomach Risk:</strong> หยุดไม่ครบ 7 วัน แจ้งวิสัญญีแพทย์เพื่อประเมินความเสี่ยงสำลัก (Aspiration) หากเสี่ยงสูงควรให้ Liquid diet 24h ก่อนผ่าตัด</span>`;
                }
            }
        }
        else if (drug.category === 'glp1_daily' || drug.category === 'dm_oral') {
            advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด`;
        }

        // 5. Cardiovascular (RAASi, Beta-blockers, Statins, Diuretics)
        else if (drug.category === 'raas_inhibitor') {
            const indication = document.getElementById('raas_indication')?.value;
            if (indication === 'hf') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ให้ยาต่อ (Continue),</span> <br><small>HFrEF ไม่ควรหยุดยา</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:orange">หยุดยาล่วงหน้า 24 ชั่วโมงก่อนผ่าตัด</span> <br><small>ป้องกัน Intraop Hypotension</small>`;
                styleClass = "rec-stop";
            }
            advice += `<br><small>🚨 <strong>Emergency/Failed to Stop:</strong> หากเกิดความดันตกที่ดื้อต่อยา (Refractory Hypotension) วิสัญญีแพทย์ควรพิจารณาใช้ Vasopressin หรือ Terlipressin, </small>`;
        }
        else if (drug.category === 'betablocker') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">รับประทานยาต่อเนื่อง (Continue)</span> ห้ามหยุดกะทันหัน`;
            styleClass = "rec-continue";
        }
        else if (drug.category === 'statin') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">รับประทานยาต่อเนื่อง (Continue)</span> ช่วยรักษาเสถียรภาพ Plaque`;
            styleClass = "rec-continue";
        }
        else if (drug.category === 'diuretic') {
            advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด (Hold)`;
            styleClass = "rec-stop";
        }

        // 6. NSAIDs
        else if (drug.category.startsWith('nsaid')) {
            if (drug.category === 'nsaid_short') advice = `<strong>${drug.name}:</strong> หยุดยา 1 วันก่อนผ่าตัด`;
            else if (drug.category === 'nsaid_med') advice = `<strong>${drug.name}:</strong> หยุดยา 3-4 วันก่อนผ่าตัด`;
            else if (drug.category === 'nsaid_long') advice = `<strong>${drug.name}:</strong> หยุดยาล่วงหน้า 10 วันก่อนผ่าตัด,`;
            else if (drug.category === 'nsaid_cox2') advice = `<strong>${drug.name}:</strong> หยุดยา 2-3 วันก่อนผ่าตัด`;
        }

        // 7. Herbals
        else if (drug.category.startsWith('herbal')) {
            advice = `<strong>${drug.name}:</strong> <span style="color:red">งดใช้อย่างน้อย 1-2 สัปดาห์ก่อนการผ่าตัด</span><br>`;
            if (drug.category === 'herbal_bleed') advice += `<small>ระวังการยับยั้งเกล็ดเลือด ทำให้เลือดออกนานขึ้น</small>`;
            else if (drug.category === 'herbal_cns') advice += `<small>ระวังฤทธิ์เสริมยาสลบ/ความดันสูง,</small>`;
            else if (drug.category === 'herbal_thai') advice += `<small>ระวังอันตรกิริยาระบบเอนไซม์ในตับและรบกวนการแข็งตัวของเลือด , </small>`;
        }

        // 8. Psychiatric & Neurological
        else if (drug.category === 'maoi') {
            advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยาล่วงหน้า 14 วัน, </span><br><small>⚠️ <strong>ข้อห้าม (Failed to stop):</strong> ห้ามใช้ยาระงับปวดกลุ่ม Synthetic opioids (เช่น Pethidine, Tramadol) เพราะเสี่ยง Serotonin Syndrome อันตรายถึงชีวิต, <br>หลีกเลี่ยง Ephedrine ในการแก้ความดันตก เพราะเสี่ยง Hypertensive crisis ให้ใช้ Phenylephrine แทน </small>`;
        }
        else if (drug.category === 'selegiline') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">รับประทานต่อเนื่องได้ (Continue) </span>`;
            styleClass = "rec-continue";
        }
        else if (drug.category === 'lithium') {
            advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา 72 ชั่วโมงก่อนผ่าตัด (หรืออย่างน้อยคืนก่อนผ่า) </span><br><small>⚠️ เริ่มยาใหม่ได้ 1 วันหลังผ่าตัด ห้ามแพทย์สั่งจ่าย NSAIDs หลังผ่าตัดเพราะจะทำให้ระดับ Lithium เป็นพิษ <br>🚨 <strong>Emergency/Failed to Stop:</strong> ต้องให้สารน้ำ IV Hydration ปริมาณมากเพื่อเร่งขับออกทางไต </small>`;
        }
        else if (drug.category === 'ssri_tca') {
            advice = `<strong>${drug.name}:</strong> ประเมินเป็นรายกรณี ไม่ควรหยุดกะทันหัน <small>แต่ต้องเฝ้าระวังความดันตก (TCAs) และเลือดออก (SSRIs) </small>`;
            styleClass = "rec-continue";
        }
        else if (drug.category === 'parkinson') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">ห้ามหยุดยาเด็ดขาด (Continue),</span> ให้ทานน้ำจิบเล็กน้อยได้ถึง 2 ชม.ก่อนผ่าตัด<br><small>⚠️ <strong>ข้อห้าม:</strong> ห้ามให้ยาแก้คลื่นไส้อาเจียนกลุ่ม Dopamine antagonists (เช่น Metoclopramide, Haloperidol) เด็ดขาด ให้ใช้ Domperidone หรือ Ondansetron แทน, </small>`;
            styleClass = "rec-continue";
        }

        // 9. DMARDs & Biologics
        else if (drug.category === 'dmard_conv') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">รับประทานต่อเนื่อง (Continue) ไม่ลดโอกาสติดเชื้อ</span>`;
            styleClass = "rec-continue";
        }
        else if (drug.category === 'biologic_1_2w') {
            advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยาล่วงหน้า 1-2 สัปดาห์ก่อนผ่าตัด,</span><br><small>ควรเริ่มยาใหม่เมื่อแผลสมานตัวดีและไม่มีการติดเชื้อ (ประมาณ 14 วันหลังผ่า)</small>`;
        }
        else if (drug.category === 'biologic_2_3w') {
            advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยาล่วงหน้า 2-3 สัปดาห์ก่อนผ่าตัด,</span><br><small>ควรเริ่มยาใหม่เมื่อแผลสมานตัวดีและไม่มีการติดเชื้อ (ประมาณ 14 วันหลังผ่า)</small>`;
        }
        else if (drug.category === 'jak_inhibitor') {
            advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยาล่วงหน้า 3-4 วันก่อนผ่าตัด</span><br><small>ควรเริ่มยาใหม่เมื่อแผลสมานตัวดีและไม่มีการติดเชื้อ</small>`;
        }

        // 10. Hormones, HIV, Others
        else if (drug.category === 'hormone') {
            const isImmobilize = document.getElementById('hormone_immobilize')?.value;
            if (isImmobilize === 'yes') {
                advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยาล่วงหน้า 2-4 สัปดาห์</span> <small>ลดความเสี่ยง VTE จากการผ่าตัดใหญ่และนอนติดเตียงนาน</small>`;
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">รับประทานต่อเนื่องได้ (Continue)</span> <small>หากเป็นการผ่าตัดเล็ก ไม่จำเป็นต้องหยุดยา</small>`;
                styleClass = "rec-continue";
            }
        }
        else if (drug.category === 'hiv') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">ห้ามหยุดยาเด็ดขาด (Continue)</span> <small>เพื่อป้องกันไวรัสดื้อยา หากกินไม่ได้ต้องปรึกษาแพทย์โรคติดเชื้อ</small>`;
            styleClass = "rec-continue";
        }
        else if (drug.category === 'thyroid') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">รับประทานต่อเนื่อง (Continue)</span>`;
            styleClass = "rec-continue";
        }
        else if (drug.category === 'pde5') {
            const ind = document.getElementById('pde5_indication')?.value;
            if (ind === 'pah') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ห้ามหยุดยากะทันหัน (Continue)</span><br><small>ป้องกันวิกฤตหลอดเลือดปอดตีบฉับพลัน (Rebound PAH)</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยาล่วงหน้า 1-2 วัน</span><br><small>ป้องกันความดันโลหิตตกรุนแรงเมื่อได้รับยาสลบร่วมกับ Nitrates</small>`;
            }
        }

        recommendations += `<div class="recommendation-box ${styleClass}">
            ${advice}
            ${bridgingContent}
            ${refImage}
        </div>`;
    });

    if (recommendations === "") {
        recommendations = "<p class='text-center'>ไม่มีรายการยาที่ต้องหยุดเป็นพิเศษ หรือ ไม่ได้เลือกยา</p>";
    }

    // Copy Button
    recommendations += `
        <div style="margin-top: 20px; text-align: center;">
            <button onclick="copyToClipboard()" class="btn-primary" style="background-color: #28a745; width: auto; padding: 10px 20px; font-size: 1rem;">
                <i class="fa-solid fa-copy"></i> คัดลอกสรุป (Copy)
            </button>
            <p id="copy-msg" style="color: green; display: none; margin-top: 5px;">คัดลอกเรียบร้อย!</p>
        </div>
    `;

    resultDiv.innerHTML = recommendations;
    resultSection.classList.remove('hidden');
    
    // Show Summary Timeline Image
    const summaryImg = document.getElementById('summary-timeline-img');
    if(summaryImg) summaryImg.src = "timeline.png";

    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function generateBridgingRegimen(crcl, bleedRisk) {
    let lwhmDose = "";
    if (crcl >= 30) {
        lwhmDose = "<strong>Enoxaparin (LMWH):</strong> 1 mg/kg SC ทุก 12 ชม. (BID) <br><em>หรือ</em> 1.5 mg/kg SC วันละครั้ง (OD)";
    } else {
        lwhmDose = "<strong>Enoxaparin (LMWH):</strong> 1 mg/kg SC วันละครั้ง (OD) <br><em>(CrCl < 30)</em> <br>⚠️ หรือใช้ <strong>UFH IV drip</strong>";
    }

    let startPostOp = (bleedRisk === 'high' || bleedRisk === 'neuro-spine') 
        ? "48-72 ชม. หลังผ่าตัด" 
        : "24 ชม. หลังผ่าตัด";

    return `
        <div style="margin-top:10px; background-color: #f0faff; padding:10px; border-radius:5px; border:1px dashed #008CBA;">
            <h5 style="margin:0; color:#005580;"><i class="fa-solid fa-syringe"></i> คำแนะนำการ Bridging (Heparin)</h5>
            <p style="margin-bottom:5px;">${lwhmDose}</p>
            <small>
                <ul>
                    <li><strong>เริ่ม Bridging:</strong> เมื่อ INR ต่ำกว่าเกณฑ์ (มักจะเป็น 2 วันหลังหยุด Warfarin)</li>
                    <li><strong>หยุด LMWH:</strong> 24 ชม. ก่อนผ่าตัด (เข็มสุดท้ายให้ลดโดสลงครึ่งหนึ่งในตอนเช้าวันก่อนผ่า)</li>
                    <li><strong>เริ่มหลังผ่าตัด:</strong> ${startPostOp}</li>
                </ul>
            </small>
        </div>
    `;
}

function copyToClipboard() {
    const surgeryDateVal = document.getElementById('surgeryDate').value;
    const surgeryDateDisplay = surgeryDateVal ? new Date(surgeryDateVal).toLocaleDateString('th-TH') : "ไม่ระบุ";
    
    let textToCopy = `📋 สรุปแผนการหยุดยาก่อนผ่าตัด\n`;
    textToCopy += `วันที่ผ่าตัด: ${surgeryDateDisplay}\n`;
    textToCopy += `----------------------------\n`;

    const recBoxes = document.querySelectorAll('.recommendation-box');
    recBoxes.forEach(box => {
        let cleanText = box.innerText.replace(/Bridging Required:/g, "\n   ⚠️ ต้องฉีดยาแทน (Bridging):")
                                     .replace(/คำแนะนำการ Bridging/g, "")
                                     .replace(/\n\s*\n/g, '\n');
        textToCopy += `• ${cleanText.trim()}\n\n`;
    });

    textToCopy += `----------------------------\n`;
    textToCopy += `หมายเหตุ: ผลลัพธ์เบื้องต้นจาก Guideline โปรดปฏิบัติตามคำสั่งแพทย์เจ้าของไข้`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const msg = document.getElementById('copy-msg');
        msg.style.display = 'block';
        setTimeout(() => msg.style.display = 'none', 3000);
    });
}

// --- Modals Logic (Images, CHA2DS2-VASc, Caprini) ---
function openModal(src) {
    let modal = document.getElementById('imageModal');
    if (!modal) {
        const modalHtml = `
            <div id="imageModal" class="modal-overlay" onclick="closeModal()">
                <span class="modal-close">&times;</span>
                <img class="modal-content" id="img01">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('imageModal');
    }
    const modalImg = document.getElementById("img01");
    modal.style.display = "flex"; 
    modalImg.src = src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

// --- CHA2DS2-VASc ---
function openChadModal() {
    document.getElementById('chadModal').style.display = 'flex';
    calculateChad();
}

function closeChadModal() {
    document.getElementById('chadModal').style.display = 'none';
}

document.querySelectorAll('#chadModal input, #chadModal select').forEach(input => {
    input.addEventListener('change', calculateChad);
});

function calculateChad() {
    let score = 0;
    if(document.getElementById('c_chf').checked) score += 1;
    if(document.getElementById('c_ht').checked) score += 1;
    if(document.getElementById('c_dm').checked) score += 1;
    if(document.getElementById('c_stroke').checked) score += 2;
    if(document.getElementById('c_vasc').checked) score += 1;
    score += parseInt(document.getElementById('c_age').value);
    score += parseInt(document.getElementById('c_sex').value);

    document.getElementById('chadScoreTotal').innerText = score;
    const adviceText = document.getElementById('chadAdvice');
    if (score >= 7) {
        adviceText.innerHTML = `<span style="color:red; font-weight:bold;">High Risk (Score ${score})</span> -> ต้อง Bridge!`;
    } else {
        adviceText.innerHTML = `<span style="color:green;">Low/Moderate Risk (Score ${score})</span> -> อาจไม่ต้อง Bridge`;
    }
}

function applyChadScore() {
    const score = parseInt(document.getElementById('chadScoreTotal').innerText);
    const checkbox = document.getElementById('war_af_high');
    if (score >= 7) {
        checkbox.checked = true;
        checkbox.parentElement.style.backgroundColor = "#fff3cd";
        checkbox.parentElement.style.padding = "2px 5px";
        checkbox.parentElement.style.borderRadius = "3px";
    } else {
        checkbox.checked = false;
        checkbox.parentElement.style.backgroundColor = "transparent";
    }
    closeChadModal();
}

// --- Caprini Score ---
function openCapriniModal() {
    document.getElementById('capriniModal').style.display = 'flex';
    calculateCaprini();
}

function closeCapriniModal() {
    document.getElementById('capriniModal').style.display = 'none';
}

document.querySelectorAll('#capriniModal input').forEach(input => {
    input.addEventListener('change', calculateCaprini);
});

function calculateCaprini() {
    let score = 0;
    document.querySelectorAll('.caprini-1:checked').forEach(() => score += 1);
    document.querySelectorAll('.caprini-2:checked').forEach(() => score += 2);
    document.querySelectorAll('.caprini-3:checked').forEach(() => score += 3);
    document.querySelectorAll('.caprini-5:checked').forEach(() => score += 5);
    
    document.getElementById('capriniScoreTotal').innerText = score;
    const adviceText = document.getElementById('capriniAdvice');
    
    if (score >= 5) {
        adviceText.innerHTML = `<span style="color:red; font-weight:bold;">High Risk (Score ${score}) </span><br>มาตรการผสมผสาน: ต้องใช้ LMWH/UFH ร่วมกับ IPC อย่างเคร่งครัด , `;
    } else if (score >= 3) {
        adviceText.innerHTML = `<span style="color:orange; font-weight:bold;">Moderate Risk (Score ${score}) </span><br>พิจารณาให้ LMWH/UFH ร่วมกับการใช้ IPC , `;
    } else {
        adviceText.innerHTML = `<span style="color:green; font-weight:bold;">Low Risk (Score ${score}) </span><br>กระตุ้นลุกเดินเร็ว (Early ambulation) หรือ IPC , `;
    }
}
