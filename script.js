// --- Database: รายการยา (Updated Full List) ---
const drugDatabase = [
    // 1. Anticoagulants
    { id: 'warfarin', name: 'Warfarin (Coumadin)', category: 'anticoagulant' },
    { id: 'apixaban', name: 'Apixaban (Eliquis)', category: 'doac' },
    { id: 'rivaroxaban', name: 'Rivaroxaban (Xarelto)', category: 'doac' },
    { id: 'dabigatran', name: 'Dabigatran (Pradaxa)', category: 'doac' },
    { id: 'edoxaban', name: 'Edoxaban (Lixiana)', category: 'doac' },
    
    // 2. Antiplatelets
    { id: 'aspirin', name: 'Aspirin (ASA)', category: 'antiplatelet' },
    { id: 'clopidogrel', name: 'Clopidogrel (Plavix)', category: 'antiplatelet' },
    { id: 'ticagrelor', name: 'Ticagrelor (Brilinta)', category: 'antiplatelet' },
    { id: 'prasugrel', name: 'Prasugrel (Effient)', category: 'antiplatelet' },
    { id: 'cilostazol', name: 'Cilostazol (Pletaal)', category: 'antiplatelet' },

    // 3. Diabetes
    { id: 'dapagliflozin', name: 'Dapagliflozin (Forxiga)', category: 'sglt2' },
    { id: 'empagliflozin', name: 'Empagliflozin (Jardiance)', category: 'sglt2' },
    { id: 'canagliflozin', name: 'Canagliflozin (Invokana)', category: 'sglt2' },
    { id: 'semaglutide_inj', name: 'Semaglutide Inj. (Ozempic/Wegovy)', category: 'glp1_weekly' },
    { id: 'dulaglutide', name: 'Dulaglutide (Trulicity)', category: 'glp1_weekly' },
    { id: 'tirzepatide', name: 'Tirzepatide (Mounjaro)', category: 'glp1_weekly' },
    { id: 'liraglutide', name: 'Liraglutide (Victoza/Saxenda)', category: 'glp1_daily' },
    { id: 'metformin', name: 'Metformin', category: 'dm_oral' },
    { id: 'sulfonylurea', name: 'Sulfonylureas (Glipizide/Glibenclamide)', category: 'dm_oral' },

    // 4. Cardiovascular / Anti-HT (New AHA 2024)
    { id: 'acei', name: 'ACE Inhibitors (Enalapril/Lisinopril)', category: 'raas_inhibitor' },
    { id: 'arb', name: 'ARBs (Losartan/Valsartan)', category: 'raas_inhibitor' },
    { id: 'betablocker', name: 'Beta-blockers (Atenolol/Bisoprolol)', category: 'betablocker' },
    { id: 'diuretic', name: 'Diuretics (Furosemide/HCTZ)', category: 'diuretic' },

    // 5. NSAIDs (ยาแก้ปวด)
    { id: 'nsaid_short', name: 'Ibuprofen / Diclofenac / Indomethacin', category: 'nsaid' },
    { id: 'nsaid_long', name: 'Naproxen / Piroxicam / Meloxicam', category: 'nsaid' },
    { id: 'cox2', name: 'Celecoxib / Etoricoxib (Arcoxia)', category: 'nsaid' },

    // 6. Herbals & Supplements (สมุนไพร)
    { id: 'fish_oil', name: 'Fish Oil (น้ำมันปลา)', category: 'herbal' },
    { id: 'ginkgo', name: 'Ginkgo Biloba (แปะก๊วย)', category: 'herbal' },
    { id: 'garlic', name: 'Garlic (กระเทียมอัดเม็ด)', category: 'herbal' },
    { id: 'vit_e', name: 'Vitamin E', category: 'herbal' },
    { id: 'ginseng', name: 'Ginseng (โสม)', category: 'herbal' }
];

let selectedDrugs = [];

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('drugSearch');
    
    // Show all drugs on click/focus
    searchInput.addEventListener('focus', () => filterDrugs(true));
    searchInput.addEventListener('click', () => filterDrugs(true));
    
    // Filter on typing
    searchInput.addEventListener('keyup', () => filterDrugs(false));

    // Hide list when clicking outside
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

    // 1. Warfarin -> Bridging Risk
    if (selectedDrugs.find(d => d.id === 'warfarin')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-heart-crack"></i> Warfarin: Thrombotic Risk Assessment</h4>
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
                        <i class="fa-solid fa-circle-info tooltip-icon" onclick="toggleInfo('tip-vte')" title="รายละเอียด Thrombophilia"></i>
                    </label>
                    <div id="tip-vte" class="info-box hidden small-text" style="background:#fff3cd;">
                        <strong>Severe Thrombophilia:</strong> Protein C/S deficiency, Antithrombin deficiency, Antiphospholipid syndrome
                    </div>
                    <br>
                    <label><input type="checkbox" id="war_vte_recent"> เพิ่งเป็น VTE ภายใน 3 เดือน</label><br>
                    <label><input type="checkbox" id="war_vte_severe"> มีภาวะ Severe Thrombophilia</label>
                </div>
                
                <div class="image-container mt-2">
                   <img src="thrombotic_risk.jpg" alt="ตารางความเสี่ยง" style="width:100%; max-width:400px; border-radius:5px;">
                </div>
            </div>
        `;
        container.innerHTML += html;
    }

    // 2. ACEI/ARB -> Indication
    if (selectedDrugs.find(d => d.category === 'raas_inhibitor')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box" style="border-left-color: #f0ad4e; background-color: #fcf8e3;">
                <h4><i class="fa-solid fa-heart-pulse"></i> ACEI/ARB: ข้อบ่งใช้หลัก</h4>
                <label>
                    ผู้ป่วยใช้ยานี้เพื่อรักษาอะไรเป็นหลัก?
                    <i class="fa-solid fa-circle-info tooltip-icon" onclick="toggleInfo('tip-hf')" title="HFrEF คืออะไร"></i>
                </label>
                <div id="tip-hf" class="info-box hidden small-text">
                    <strong>HFrEF (Heart Failure with reduced Ejection Fraction):</strong><br>
                    หัวใจล้มเหลวที่ LVEF ≤ 40% (การหยุดยาอาจทำให้หัวใจแย่ลง)
                </div>
                <select id="raas_indication" class="form-control">
                    <option value="ht">รักษาความดันโลหิตสูง (Hypertension)</option>
                    <option value="hf">รักษาหัวใจล้มเหลว (Heart Failure - HFrEF)</option>
                </select>
            </div>
        `;
        container.innerHTML += html;
    }

    // 3. Antiplatelet -> Stent
    if (selectedDrugs.some(d => d.category === 'antiplatelet')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-ring"></i> Antiplatelet: ประวัติขดลวด (Stent)</h4>
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
                        <option value="des">Drug-Eluting Stent (DES) - ส่วนใหญ่</option>
                        <option value="bms">Bare Metal Stent (BMS)</option>
                    </select>
                </div>
            </div>
        `;
        container.innerHTML += html;
    }

    // 4. GLP-1 Weekly -> Last Dose
    if (selectedDrugs.find(d => d.category === 'glp1_weekly')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-syringe"></i> GLP-1 Weekly: มื้อล่าสุด</h4>
                <label>วันที่ฉีดยาเข็มล่าสุด (Last Dose Date):</label>
                <input type="date" id="glp1_last_date" class="form-control">
                <small class="text-muted">สำคัญ! เพื่อประเมินความเสี่ยง Full Stomach</small>
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
        let refImage = ""; // ตัวแปรสำหรับเก็บรูปภาพเพิ่มเติม

        // --- A. Warfarin ---
        if (drug.id === 'warfarin') {
            // ใส่รูปอ้างอิง Warfarin
            refImage = `<div class="image-container mt-2"><img src="ref_warfarin.jpg" onerror="this.style.display='none'" style="width:100%; max-width:500px; border-radius:5px; border:1px solid #ddd;" alt="Warfarin Management"></div>`;

            if (bleedRisk === 'minimal') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ไม่ต้องหยุดยา (Continue)</span> <br><small>เช็ค INR ก่อนทำ 1-2 วัน (Target 2-3)</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา 5 วันก่อนผ่าตัด</span>`;
                
                // Bridging Check
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
        
        // --- B. DOACs ---
        else if (drug.category === 'doac') {
            // ใส่รูปอ้างอิง DOAC
            refImage = `<div class="image-container mt-2"><img src="ref_doac.png" onerror="this.style.display='none'" style="width:100%; max-width:500px; border-radius:5px; border:1px solid #ddd;" alt="DOAC Management"></div>`;

            let stopDays = 0;
            if (drug.id === 'dabigatran') {
                if (crcl >= 50) stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                else stopDays = (bleedRisk === 'low-mod') ? 2 : 4;
                if (crcl < 30) advice = `<strong>${drug.name}:</strong> ⚠️ Contraindicated (ปรึกษาแพทย์) CrCl ต่ำมาก`;
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
                     if (crcl < 30) advice += ` <br>⚠️ ระวัง: ไตเสื่อมอาจต้องหยุดนานกว่านี้`;
                }
            }
        }

        // --- C. ACEI/ARB (AHA 2024) ---
        else if (drug.category === 'raas_inhibitor') {
            const indication = document.getElementById('raas_indication')?.value;
            if (indication === 'hf') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ให้ยาต่อ (Continue)</span> <br><small>HFrEF ไม่ควรหยุดยา</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:orange">หยุดยา 24 ชม. ก่อนผ่าตัด</span> <br><small>ป้องกัน Intraop Hypotension</small>`;
                styleClass = "rec-stop";
            }
        }

        // --- D. Beta-blockers (AHA 2024) ---
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
            // ใส่รูปอ้างอิง Antiplatelet
            refImage = `<div class="image-container mt-2"><img src="ref_antiplatelet.png" onerror="this.style.display='none'" style="width:100%; max-width:500px; border-radius:5px; border:1px solid #ddd;" alt="Antiplatelet Management"></div>`;

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
            }

            const stentStatus = document.getElementById('stent_status')?.value;
            if (stentStatus === 'yes') {
                 advice += `<br><div class="warning-box" style="margin-top:5px; background:#FFF0F0; padding:10px; border:1px solid red; border-radius:5px;">
                 <strong>🚨 Stent Alert:</strong> ผู้ป่วยเพิ่งใส่ Stent < 1 ปี<br>
                 - โปรดปรึกษา Cardiologist ก่อนหยุดยา Antiplatelet</div>`;
            }
        }

        // --- G. Diabetes (SGLT2 / GLP-1) ---
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
                    advice += `<br><span style="color:red">⚠️ <strong>Full Stomach Risk:</strong> หยุดไม่ครบ 7 วัน แจ้งวิสัญญีแพทย์ (Ultrasound/RSI)</span>`;
                }
            }
        }
        else if (drug.category === 'glp1_daily' || drug.id === 'metformin' || drug.id === 'sulfonylurea') {
            advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด`;
        }

        // --- H. NSAIDs ---
        else if (drug.category === 'nsaid') {
            if (drug.id === 'nsaid_long') {
                advice = `<strong>${drug.name}:</strong> หยุดยา 2-3 วันก่อนผ่าตัด`;
            } else if (drug.id === 'cox2') {
                advice = `<strong>${drug.name}:</strong> หยุดยา 1-2 วันก่อนผ่าตัด`;
            } else { // Short acting
                advice = `<strong>${drug.name}:</strong> หยุดยาอย่างน้อย 24 ชม. ก่อนผ่าตัด`;
            }
        }

        // --- I. Herbals ---
        else if (drug.category === 'herbal') {
            advice = `<strong>${drug.name}:</strong> หยุดยา 7 วันก่อนผ่าตัด <br><small>เสี่ยงเลือดออกง่าย</small>`;
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

    // Add Copy Button
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
    
    // Show Summary Image
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
                    <li><strong>เริ่ม Bridging:</strong> เมื่อ INR ต่ำกว่าเกณฑ์ (2 วันหลังหยุด Warfarin)</li>
                    <li><strong>หยุด LMWH:</strong> 24 ชม. ก่อนผ่าตัด (เข็มสุดท้ายครึ่งโดสเช้าวันก่อนผ่า)</li>
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
