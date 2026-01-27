// --- Database: รายการยา (Updated) ---
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

    // Cardiovascular / Anti-HT (New AHA 2024)
    { id: 'acei', name: 'ACE Inhibitors (Enalapril/Lisinopril/etc.)', category: 'raas_inhibitor' },
    { id: 'arb', name: 'ARBs (Losartan/Valsartan/etc.)', category: 'raas_inhibitor' },
    { id: 'betablocker', name: 'Beta-blockers (Atenolol/Bisoprolol/Carvedilol)', category: 'betablocker' },
    { id: 'diuretic', name: 'Diuretics (Furosemide/HCTZ)', category: 'diuretic' }
];

let selectedDrugs = [];

// --- UI Functions ---
function toggleInfo(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
}

function filterDrugs() {
    const input = document.getElementById('drugSearch').value.toLowerCase();
    const listContainer = document.getElementById('drugListContainer');
    listContainer.innerHTML = '';

    const filtered = drugDatabase.filter(d => d.name.toLowerCase().includes(input));

    filtered.forEach(drug => {
        const div = document.createElement('div');
        div.className = 'drug-item';
        // (Optional) ถ้ามีรูปภาพ ให้ใส่ <img> tag ตรงนี้ได้
        // div.innerHTML = `<img src="images/${drug.id}.jpg" class="drug-thumb"> ${drug.name}`;
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
    document.getElementById('drugSearch').value = '';
    document.getElementById('drugListContainer').innerHTML = '';
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

    // 1. Warfarin -> Ask Bridging Risk
    if (selectedDrugs.find(d => d.id === 'warfarin')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-heart-crack"></i> คำถามสำหรับ Warfarin: ความเสี่ยงลิ่มเลือด (Thrombotic Risk)</h4>
                <p class="small-text">เลือกข้อที่ผู้ป่วยมี (เพื่อประเมิน Bridging):</p>
                
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">Mechanical Heart Valve:</label><br>
                    <label><input type="checkbox" id="war_mech_mitral"> ลิ้นหัวใจเทียมตำแหน่ง Mitral (Mitral Valve)</label><br>
                    <label><input type="checkbox" id="war_mech_aortic"> ลิ้นหัวใจเทียมตำแหน่ง Aortic (Aortic Valve) รุ่นเก่า (Caged-ball/Tilting)</label><br>
                    <label><input type="checkbox" id="war_mech_stroke"> เคยมี Stroke/TIA ภายใน 6 เดือน</label>
                </div>
                <hr>
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">Atrial Fibrillation (AF):</label><br>
                    <label><input type="checkbox" id="war_af_high"> CHA2DS2-VASc score ≥ 7</label><br>
                    <label><input type="checkbox" id="war_af_stroke"> เคยมี Stroke/TIA ภายใน 3 เดือน</label><br>
                    <label><input type="checkbox" id="war_af_rheumatic"> เป็น Rheumatic Heart Disease</label>
                </div>
                <hr>
                <div class="checkbox-group">
                    <label style="font-weight:bold; color:#d9534f;">VTE (DVT/PE):</label><br>
                    <label><input type="checkbox" id="war_vte_recent"> เพิ่งเป็น VTE ภายใน 3 เดือน</label><br>
                    <label><input type="checkbox" id="war_vte_severe"> มีภาวะ Severe Thrombophilia (เช่น Protein C/S def, Antiphospholipid)</label>
                </div>
                
                <div class="image-container mt-2">
                   <img src="images/table_bridging_risk.png" alt="ตารางประเมินความเสี่ยงลิ่มเลือด" style="width:100%; max-width:400px; border-radius:5px;">
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
                <label>ผู้ป่วยใช้ยานี้เพื่อรักษาอะไรเป็นหลัก?</label>
                <select id="raas_indication" class="form-control">
                    <option value="ht">รักษาความดันโลหิตสูง (Hypertension) - พบส่วนใหญ่</option>
                    <option value="hf">รักษาหัวใจล้มเหลว (Heart Failure - HFrEF)</option>
                </select>
                <small class="text-muted">*AHA 2024 แนะนำต่างกันตามข้อบ่งชี้</small>
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
                    <label>วันที่ใส่ (Implant Date) หรือระบุจำนวนเดือน:</label>
                    <input type="text" id="stent_time_text" class="form-control" placeholder="เช่น 3 เดือน, 6 สัปดาห์">
                    <label>ชนิด Stent (ถ้าทราบ):</label>
                    <select id="stent_type" class="form-control">
                        <option value="des">Drug-Eluting Stent (DES) - ส่วนใหญ่เป็นชนิดนี้</option>
                        <option value="bms">Bare Metal Stent (BMS)</option>
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
                <h4><i class="fa-solid fa-syringe"></i> คำถามสำหรับ GLP-1 (Weekly):</h4>
                <label>วันที่ฉีดยาเข็มล่าสุด (Last Dose Date):</label>
                <input type="date" id="glp1_last_date" class="form-control">
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
    const crcl = crclInput ? parseInt(crclInput) : 90; // Default normal if empty
    
    const resultDiv = document.getElementById('resultContent');
    const resultSection = document.getElementById('results-section');
    const surgeryDateStr = document.getElementById('surgeryDate').value;
    const surgeryDate = surgeryDateStr ? new Date(surgeryDateStr) : null;

    if (!bleedRisk) {
        alert("กรุณาระบุความเสี่ยงเลือดออก (Bleeding Risk) ใน Step 1 ก่อนครับ");
        return;
    }

    let recommendations = "";

    // 1. Loop Through Drugs
    selectedDrugs.forEach(drug => {
        let advice = "";
        let styleClass = "rec-stop"; // Default Red
        let bridgingContent = ""; // For Warfarin Bridging Info

        // --- A. Warfarin Logic ---
        if (drug.id === 'warfarin') {
            if (bleedRisk === 'minimal') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ไม่ต้องหยุดยา (Continue)</span> <br><small>เช็ค INR ก่อนทำ 1-2 วัน (Target 2-3)</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:red">หยุดยา 5 วันก่อนผ่าตัด</span>`;
                
                // Check Bridging Need
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
                    
                    // --- Generate Bridging Regimen (New!) ---
                    bridgingContent = generateBridgingRegimen(crcl, bleedRisk);
                } else {
                    advice += `<br><small class="text-muted">✅ ไม่ต้อง Bridging (Low/Moderate Thrombotic Risk)</small>`;
                }
            }
        }
        
        // --- B. DOACs Logic ---
        else if (drug.category === 'doac') {
            let stopDays = 0;
            
            // Dabigatran Logic (1-2-2-4 rule)
            if (drug.id === 'dabigatran') {
                if (crcl >= 50) stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                else stopDays = (bleedRisk === 'low-mod') ? 2 : 4;
                
                if (crcl < 30) advice = `<strong>${drug.name}:</strong> ⚠️ Contraindicated (ปรึกษาแพทย์เฉพาะทาง) CrCl ต่ำมาก`;
            } 
            // Other DOACs Logic (1-2 rule)
            else {
                stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                if (bleedRisk === 'neuro-spine') stopDays = 3; // Safety margin
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

        // --- C. ACEI / ARB (New AHA 2024) ---
        else if (drug.category === 'raas_inhibitor') {
            const indication = document.getElementById('raas_indication')?.value;
            if (indication === 'hf') {
                advice = `<strong>${drug.name}:</strong> <span style="color:green">ให้ยาต่อ (Continue)</span> <br><small>สำหรับ HFrEF ไม่ควรหยุดยา</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> <span style="color:orange">หยุดยา 24 ชม. ก่อนผ่าตัด</span> <br><small>ป้องกันภาวะความดันตกขณะผ่าตัด (Intraop Hypotension)</small>`;
                styleClass = "rec-stop"; // Use warning color/style
            }
            advice += `<br><small>เริ่มยาใหม่เมื่อความดันคงที่ (post-op day 2)</small>`;
        }

        // --- D. Beta-blockers (New AHA 2024) ---
        else if (drug.category === 'betablocker') {
            advice = `<strong>${drug.name}:</strong> <span style="color:green">ให้ยาต่อ (Continue)</span> ห้ามหยุดทันที`;
            advice += `<br><small>⚠️ ข้อห้าม: ห้ามเริ่มยา Beta-blocker ขนาดสูงในวันผ่าตัด (Start > 1 สัปดาห์ก่อนผ่า)</small>`;
            styleClass = "rec-continue";
        }

        // --- E. Diuretics ---
        else if (drug.category === 'diuretic') {
            advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด (Hold on morning of surgery)`;
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
                // P2Y12
                let days = 5;
                if (drug.id === 'ticagrelor') days = 3; 
                if (drug.id === 'prasugrel') days = 7;
                if (drug.id === 'cilostazol') days = 3; 
                advice = `<strong>${drug.name}:</strong> หยุดยา ${days} วันก่อนผ่าตัด`;
            }

            // Stent Check
            const stentStatus = document.getElementById('stent_status')?.value;
            if (stentStatus === 'yes') {
                 advice += `<br><div class="warning-box" style="margin-top:5px; background:#FFF0F0; padding:10px; border:1px solid red; border-radius:5px;">
                 <strong>🚨 Stent Alert:</strong> ผู้ป่วยเพิ่งใส่ Stent < 1 ปี<br>
                 - หากหยุด Antiplatelet เสี่ยง Stent Thrombosis สูงมาก<br>
                 - โปรดปรึกษา Cardiologist ก่อนหยุดยา</div>`;
            }
        }

        // --- G. GLP-1 & SGLT2 ---
        else if (drug.category === 'sglt2') {
            advice = `<strong>${drug.name}:</strong> หยุดยา 3-4 วันก่อนผ่าตัด <br><small>ระวัง Euglycemic DKA</small>`;
        }
        else if (drug.category === 'glp1_weekly') {
            advice = `<strong>${drug.name}:</strong> หยุดยา 1 สัปดาห์ก่อนผ่าตัด`;
            // Check Last Dose logic... (Same as before)
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

        // Add to result block
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

// --- Bridging Regimen Generator Function (Updated) ---
function generateBridgingRegimen(crcl, bleedRisk) {
    let regimen = "";
    let lwhmDose = "";
    
    // 1. Calculate Dose based on Renal Function
    if (crcl >= 30) {
        lwhmDose = "<strong>Enoxaparin (LMWH):</strong> 1 mg/kg SC ทุก 12 ชม. (BID) <br><em>หรือ</em> 1.5 mg/kg SC วันละครั้ง (OD)";
    } else {
        lwhmDose = "<strong>Enoxaparin (LMWH):</strong> 1 mg/kg SC วันละครั้ง (OD) <br><em>(สำหรับ CrCl < 30)</em> <br>⚠️ หรือพิจารณาใช้ <strong>UFH IV drip</strong> แทน";
    }

    // 2. Pre-op Stopping Time
    let stopPreOp = `
        <ul>
            <li><strong>เริ่ม Bridging:</strong> เมื่อ INR ต่ำกว่าเกณฑ์ (มักจะ 2 วันหลังหยุด Warfarin)</li>
            <li><strong>หยุด LMWH:</strong> 24 ชม. ก่อนผ่าตัด (เข็มสุดท้ายให้แค่ครึ่งโดสในตอนเช้าวันก่อนผ่า)</li>
            <li><strong>หยุด UFH IV:</strong> 4-6 ชม. ก่อนผ่าตัด</li>
        </ul>`;

    // 3. Post-op Resumption Time
    let startPostOp = "";
    if (bleedRisk === 'high' || bleedRisk === 'neuro-spine') {
        startPostOp = "48-72 ชม. หลังผ่าตัด (เมื่อแน่ใจว่าเลือดหยุดดีแล้ว)";
    } else {
        startPostOp = "24 ชม. หลังผ่าตัด";
    }

    regimen = `
        <div style="margin-top:10px; background-color: #f0faff; padding:10px; border-radius:5px; border:1px dashed #008CBA;">
            <h5 style="margin:0; color:#005580;"><i class="fa-solid fa-syringe"></i> คำแนะนำการ Bridging (Heparin)</h5>
            <p style="margin-bottom:5px;">${lwhmDose}</p>
            <small>
                ${stopPreOp}
                <strong>เริ่มยาหลังผ่าตัด:</strong> ${startPostOp}
            </small>
        </div>
    `;
    return regimen;
}
