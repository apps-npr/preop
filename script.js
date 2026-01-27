// --- Database: รายการยา ---
const drugDatabase = [
    // Anticoagulants
    { id: 'warfarin', name: 'Warfarin (Coumadin)', category: 'anticoagulant' },
    { id: 'apixaban', name: 'Apixaban (Eliquis)', category: 'doac' },
    { id: 'rivaroxaban', name: 'Rivaroxaban (Xarelto)', category: 'doac' },
    { id: 'dabigatran', name: 'Dabigatran (Pradaxa)', category: 'doac' },
    { id: 'edoxaban', name: 'Edoxaban (Lixiana)', category: 'doac' },
    
    // Antiplatelets
    { id: 'aspirin', name: 'Aspirin (ASA)', category: 'antiplatelet' },
    { id: 'clopidogrel', name: 'Clopidogrel (Plavix)', category: 'antiplatelet' },
    { id: 'ticagrelor', name: 'Ticagrelor (Brilinta)', category: 'antiplatelet' },
    { id: 'prasugrel', name: 'Prasugrel (Effient)', category: 'antiplatelet' },
    { id: 'cilostazol', name: 'Cilostazol (Pletaal)', category: 'antiplatelet' },

    // Diabetes
    { id: 'dapagliflozin', name: 'Dapagliflozin (Forxiga)', category: 'sglt2' },
    { id: 'empagliflozin', name: 'Empagliflozin (Jardiance)', category: 'sglt2' },
    { id: 'canagliflozin', name: 'Canagliflozin (Invokana)', category: 'sglt2' },
    { id: 'semaglutide_inj', name: 'Semaglutide Inj. (Ozempic/Wegovy)', category: 'glp1_weekly' },
    { id: 'dulaglutide', name: 'Dulaglutide (Trulicity)', category: 'glp1_weekly' },
    { id: 'tirzepatide', name: 'Tirzepatide (Mounjaro)', category: 'glp1_weekly' },
    { id: 'liraglutide', name: 'Liraglutide (Victoza/Saxenda)', category: 'glp1_daily' },
    { id: 'metformin', name: 'Metformin', category: 'dm_oral' },
    { id: 'sulfonylurea', name: 'Sulfonylureas (Glipizide/Glibenclamide)', category: 'dm_oral' },

    // Cardiovascular / Anti-HT
    { id: 'acei', name: 'ACE Inhibitors (Enalapril/Lisinopril)', category: 'raas_inhibitor' },
    { id: 'arb', name: 'ARBs (Losartan/Valsartan)', category: 'raas_inhibitor' },
    { id: 'betablocker', name: 'Beta-blockers (Atenolol/Bisoprolol)', category: 'betablocker' },
    { id: 'diuretic', name: 'Diuretics (Furosemide/HCTZ)', category: 'diuretic' }
];

let selectedDrugs = [];

// --- Setup Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('drugSearch');
    
    // 1. Show all drugs on click/focus
    searchInput.addEventListener('focus', () => filterDrugs(true));
    searchInput.addEventListener('click', () => filterDrugs(true));
    
    // 2. Filter on typing
    searchInput.addEventListener('keyup', () => filterDrugs(false));

    // 3. Hide list when clicking outside
    document.addEventListener('click', (e) => {
        const container = document.getElementById('drugListContainer');
        const input = document.getElementById('drugSearch');
        if (!container.contains(e.target) && e.target !== input) {
            container.style.display = 'none';
        }
    });
});

// --- UI Functions ---
function toggleInfo(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

function filterDrugs(showAll = false) {
    const input = document.getElementById('drugSearch').value.toLowerCase();
    const listContainer = document.getElementById('drugListContainer');
    listContainer.innerHTML = '';
    listContainer.style.display = 'block'; // Show container

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
        // div.innerHTML = `<img src="images/${drug.id}.jpg" class="drug-thumb" onerror="this.style.display='none'"> ${drug.name}`; // Uncomment if images are ready
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
    document.getElementById('drugListContainer').style.display = 'none'; // Hide list
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

// --- Dynamic Questions Logic (With Tooltips) ---
function checkSpecificQuestions() {
    const container = document.getElementById('dynamicQuestions');
    const section = document.getElementById('step-3');
    container.innerHTML = '';
    let hasQuestions = false;

    // 1. Warfarin -> Ask Bridging Risk
    if (selectedDrugs.find(d => d.id === 'warfarin')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-heart-crack"></i> คำถามสำหรับ Warfarin (Thrombotic Risk)</h4>
                <p class="small-text">เลือกข้อที่ผู้ป่วยมี (เพื่อประเมิน Bridging):</p>
                
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">Mechanical Heart Valve:</label><br>
                    <label><input type="checkbox" id="war_mech_mitral"> ลิ้นหัวใจเทียมตำแหน่ง Mitral</label><br>
                    <label><input type="checkbox" id="war_mech_aortic"> ลิ้นหัวใจเทียมตำแหน่ง Aortic รุ่นเก่า (Caged-ball/Tilting)</label><br>
                    <label><input type="checkbox" id="war_mech_stroke"> เคยมี Stroke/TIA ภายใน 6 เดือน</label>
                </div>
                <hr>
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">
                        Atrial Fibrillation (AF) 
                        <i class="fa-solid fa-circle-info tooltip-icon" onclick="toggleInfo('tip-af')" title="คลิกเพื่อดูรายละเอียด"></i>
                    </label>
                    <div id="tip-af" class="info-box hidden small-text" style="background:#fff3cd;">
                        <strong>CHA2DS2-VASc Score ≥ 7:</strong><br>
                        (C=CHF, H=HT, A=Age>75, D=DM, S=Stroke, V=Vascular, A=Age 65-74, Sc=Sex)<br>
                        <strong>Rheumatic Heart Disease:</strong> เช่น Mitral Stenosis
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
                        <i class="fa-solid fa-circle-info tooltip-icon" onclick="toggleInfo('tip-vte')" title="คลิกเพื่อดูรายละเอียด"></i>
                    </label>
                    <div id="tip-vte" class="info-box hidden small-text" style="background:#fff3cd;">
                        <strong>Severe Thrombophilia:</strong> เช่น Protein C/S deficiency, Antithrombin deficiency, Antiphospholipid syndrome
                    </div>
                    <br>
                    <label><input type="checkbox" id="war_vte_recent"> เพิ่งเป็น VTE ภายใน 3 เดือน</label><br>
                    <label><input type="checkbox" id="war_vte_severe"> มีภาวะ Severe Thrombophilia</label>
                </div>
                
                <div class="image-container mt-2">
                   <img src="images/table_bridging_risk.png" alt="ตารางความเสี่ยง" style="width:100%; max-width:400px; border-radius:5px;">
                </div>
            </div>
        `;
        container.innerHTML += html;
    }

    // 2. ACEI/ARB -> Ask Indication
    if (selectedDrugs.find(d => d.category === 'raas_inhibitor')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box" style="border-left-color: #f0ad4e; background-color: #fcf8e3;">
                <h4><i class="fa-solid fa-heart-pulse"></i> คำถามสำหรับ ACEI/ARB:</h4>
                <label>
                    ผู้ป่วยใช้ยานี้เพื่อรักษาอะไรเป็นหลัก?
                    <i class="fa-solid fa-circle-info tooltip-icon" onclick="toggleInfo('tip-hf')" title="คำอธิบาย HFrEF"></i>
                </label>
                <div id="tip-hf" class="info-box hidden small-text">
                    <strong>HFrEF (Heart Failure with reduced Ejection Fraction):</strong><br>
                    ภาวะหัวใจล้มเหลวที่มีการบีบตัวของหัวใจห้องล่างซ้ายลดลง (LVEF ≤ 40%) การหยุดยาอาจทำให้หัวใจแย่ลงได้
                </div>
                <select id="raas_indication" class="form-control">
                    <option value="ht">รักษาความดันโลหิตสูง (Hypertension)</option>
                    <option value="hf">รักษาหัวใจล้มเหลว (Heart Failure - HFrEF)</option>
                </select>
            </div>
        `;
        container.innerHTML += html;
    }

    // 3. Antiplatelets -> Ask Stent
    if (selectedDrugs.some(d => d.category === 'antiplatelet')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-ring"></i> คำถามสำหรับ Antiplatelet: ประวัติขดลวด (Stent)</h4>
                <label>ผู้ป่วยเคยใส่ขดลวดหัวใจ (Stent) หรือไม่?</label>
                <select id="stent_status" class="form-control" onchange="toggleStentDate()">
                    <option value="no">ไม่เคย / นานมากแล้ว (> 1 ปี)</option>
                    <option value="yes">เคยใส่ (ภายใน 1 ปี)</option>
                </select>
                
                <div id="stent_details" class="hidden mt-2">
                    <label>ระยะเวลาตั้งแต่ใส่ Stent:</label>
                    <input type="text" id="stent_time_text" class="form-control" placeholder="เช่น 3 เดือน, 6 สัปดาห์">
                    <label>ชนิด Stent:</label>
                    <select id="stent_type" class="form-control">
                        <option value="des">Drug-Eluting Stent (DES) - ชนิดเคลือบยา (ส่วนใหญ่)</option>
                        <option value="bms">Bare Metal Stent (BMS) - ชนิดไม่เคลือบยา</option>
                    </select>
                </div>
            </div>
        `;
        container.innerHTML += html;
    }

    // 4. GLP-1 Weekly -> Ask Last Dose
    if (selectedDrugs.find(d => d.category === 'glp1_weekly')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-syringe"></i> คำถามสำหรับ GLP-1 รายสัปดาห์:</h4>
                <label>วันที่ฉีดยาเข็มล่าสุด (Last Dose Date):</label>
                <input type="date" id="glp1_last_date" class="form-control">
                <small class="text-muted">สำคัญมาก! เพื่อประเมินความเสี่ยงอาหารค้างในกระเพาะ (Full Stomach)</small>
            </div>
        `;
        container.innerHTML += html;
    }

    if (hasQuestions) section.classList.remove('hidden');
    else section.classList.add('hidden');
}

// Helper for Stent UI
window.toggleStentDate = function() {
    const status = document.getElementById('stent_status').value;
    const details = document.getElementById('stent_details');
    if (status === 'yes') details.classList.remove('hidden');
    else details.classList.add('hidden');
}

// --- Main Logic Processing ---
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

        // --- A. Warfarin Logic ---
        if (drug.id === 'warfarin') {
            if (bleedRisk === 'minimal') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ไม่ต้องหยุดยา (Continue)</span> <br><small>เช็ค INR ก่อนทำ 1-2 วัน (Target 2-3)</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา 5 วันก่อนผ่าตัด</span>`;
                
                // Bridging Logic
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
                    advice += `<br><strong>⚠️ Bridging Required:</strong> ผู้ป่วยมีความเสี่ยงลิ่มเลือดสูง (High Thrombotic Risk)`;
                    bridgingContent = generateBridgingRegimen(crcl, bleedRisk);
                } else {
                    advice += `<br><small class="text-muted">✅ ไม่ต้อง Bridging (Low/Moderate Thrombotic Risk)</small>`;
                }
            }
        }
        
        // --- B. DOACs Logic ---
        else if (drug.category === 'doac') {
            let stopDays = 0;
            if (drug.id === 'dabigatran') {
                if (crcl >= 50) stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                else stopDays = (bleedRisk === 'low-mod') ? 2 : 4;
                if (crcl < 30) advice = `<strong>${drug.name}:</strong> ⚠️ Contraindicated (ปรึกษาแพทย์เฉพาะทาง) CrCl ต่ำมาก`;
            } else {
                stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                if (bleedRisk === 'neuro-spine') stopDays = 3;
            }

            if (!advice) { 
                if (bleedRisk === 'minimal') {
                     advice = `<strong>${drug.name}:</strong> พิจารณาไม่หยุดยา (งดมื้อเช้าวันผ่าตัด) หรือหยุด 1 วัน`;
                     styleClass = "rec-continue";
                } else {
                     advice = `<strong>${drug.name}:</strong> หยุดยา ${stopDays} วันก่อนผ่าตัด (งด Bridging)`;
                     if (crcl < 30) advice += ` <br>⚠️ ระวัง: ผู้ป่วยไตเสื่อมมาก อาจต้องหยุดนานกว่านี้`;
                }
            }
        }

        // --- C. ACEI / ARB ---
        else if (drug.category === 'raas_inhibitor') {
            const indication = document.getElementById('raas_indication')?.value;
            if (indication === 'hf') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ให้ยาต่อ (Continue)</span> <br><small>สำหรับ HFrEF ไม่ควรหยุดยา</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:orange">หยุดยา 24 ชม. ก่อนผ่าตัด</span> <br><small>ป้องกันภาวะความดันตกขณะผ่าตัด</small>`;
                styleClass = "rec-stop";
            }
        }

        // --- D. Beta-blockers ---
        else if (drug.category === 'betablocker') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">ให้ยาต่อ (Continue)</span> ห้ามหยุดทันที`;
            styleClass = "rec-continue";
        }

        // --- E. Diuretics ---
        else if (drug.category === 'diuretic') {
            advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด (Hold)`;
            styleClass = "rec-stop";
        }

        // --- F. Antiplatelets ---
        else if (drug.category === 'antiplatelet') {
            if (drug.id === 'aspirin') {
                if (bleedRisk === 'neuro-spine') {
                    advice = `<strong>${drug.name}:</strong> หยุดยา 7 วันก่อนผ่าตัด (High/Neuro Risk)`;
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
            }

            const stentStatus = document.getElementById('stent_status')?.value;
            if (stentStatus === 'yes') {
                 advice += `<br><div class="warning-box" style="margin-top:5px; background:#FFF0F0; padding:10px; border:1px solid red; border-radius:5px;">
                 <strong>🚨 Stent Alert:</strong> ผู้ป่วยเพิ่งใส่ Stent < 1 ปี<br>
                 - โปรดปรึกษา Cardiologist ก่อนหยุดยา Antiplatelet</div>`;
            }
        }

        // --- G. GLP-1 & SGLT2 ---
        else if (drug.category === 'sglt2') {
            advice = `<strong>${drug.name}:</strong> หยุดยา 3-4 วันก่อนผ่าตัด <br><small>ระวัง Euglycemic DKA</small>`;
        }
        else if (drug.category === 'glp1_weekly') {
            advice = `<strong>${drug.name}:</strong> หยุดยา 1 สัปดาห์ก่อนผ่าตัด`;
            const lastDoseStr = document.getElementById('glp1_last_date')?.value;
            if (lastDoseStr && surgeryDate) {
                const diffTime = Math.abs(surgeryDate - new Date(lastDoseStr));
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if (diffDays < 7) {
                    advice += `<br><span style="color:red">⚠️ <strong>Full Stomach Risk:</strong> ยาหยุดไม่ครบ 7 วัน แจ้งวิสัญญีแพทย์ (Ultrasound/RSI)</span>`;
                }
            }
        }
        else if (drug.category === 'glp1_daily' || drug.id === 'metformin' || drug.id === 'sulfonylurea') {
            advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด`;
        }

        recommendations += `<div class="recommendation-box ${styleClass}">
            ${advice}
            ${bridgingContent} 
        </div>`;
    });

    if (recommendations === "") {
        recommendations = "<p class='text-center'>ไม่มีรายการยาที่ต้องหยุดเป็นพิเศษ หรือ ไม่ได้เลือกยา</p>";
    }

    resultDiv.innerHTML = recommendations;
    resultSection.classList.remove('hidden');
    
    // Show Summary Image
    const summaryImg = document.getElementById('summary-timeline-img');
    if(summaryImg) summaryImg.src = "images/summary_timeline.png";

    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function generateBridgingRegimen(crcl, bleedRisk) {
    let lwhmDose = "";
    if (crcl >= 30) {
        lwhmDose = "<strong>Enoxaparin (LMWH):</strong> 1 mg/kg SC ทุก 12 ชม. (BID) <br><em>หรือ</em> 1.5 mg/kg SC วันละครั้ง (OD)";
    } else {
        lwhmDose = "<strong>Enoxaparin (LMWH):</strong> 1 mg/kg SC วันละครั้ง (OD) <br><em>(สำหรับ CrCl < 30)</em> <br>⚠️ หรือพิจารณาใช้ <strong>UFH IV drip</strong> แทน";
    }

    let startPostOp = "";
    if (bleedRisk === 'high' || bleedRisk === 'neuro-spine') {
        startPostOp = "48-72 ชม. หลังผ่าตัด";
    } else {
        startPostOp = "24 ชม. หลังผ่าตัด";
    }

    return `
        <div style="margin-top:10px; background-color: #f0faff; padding:10px; border-radius:5px; border:1px dashed #008CBA;">
            <h5 style="margin:0; color:#005580;"><i class="fa-solid fa-syringe"></i> คำแนะนำการ Bridging (Heparin)</h5>
            <p style="margin-bottom:5px;">${lwhmDose}</p>
            <small>
                <ul>
                    <li><strong>เริ่ม Bridging:</strong> เมื่อ INR ต่ำกว่าเกณฑ์ (มักจะ 2 วันหลังหยุด Warfarin)</li>
                    <li><strong>หยุด LMWH:</strong> 24 ชม. ก่อนผ่าตัด (เข็มสุดท้ายให้ครึ่งโดสตอนเช้าวันก่อนผ่า)</li>
                    <li><strong>เริ่มหลังผ่าตัด:</strong> ${startPostOp} (เมื่อเลือดหยุดดีแล้ว)</li>
                </ul>
            </small>
        </div>
    `;
}
