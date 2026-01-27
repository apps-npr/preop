// --- Database: รายการยา ---
const drugDatabase = [
    { id: 'warfarin', name: 'Warfarin (Coumadin)', category: 'anticoagulant' },
    { id: 'apixaban', name: 'Apixaban (Eliquis)', category: 'doac' },
    { id: 'rivaroxaban', name: 'Rivaroxaban (Xarelto)', category: 'doac' },
    { id: 'dabigatran', name: 'Dabigatran (Pradaxa)', category: 'doac' },
    { id: 'edoxaban', name: 'Edoxaban (Lixiana)', category: 'doac' },
    { id: 'aspirin', name: 'Aspirin (ASA)', category: 'antiplatelet' },
    { id: 'clopidogrel', name: 'Clopidogrel (Plavix)', category: 'antiplatelet' },
    { id: 'ticagrelor', name: 'Ticagrelor (Brilinta)', category: 'antiplatelet' },
    { id: 'dapagliflozin', name: 'Dapagliflozin (Forxiga)', category: 'sglt2' },
    { id: 'empagliflozin', name: 'Empagliflozin (Jardiance)', category: 'sglt2' },
    { id: 'semaglutide_inj', name: 'Semaglutide Injection (Ozempic/Wegovy)', category: 'glp1_weekly' },
    { id: 'liraglutide', name: 'Liraglutide (Victoza/Saxenda)', category: 'glp1_daily' },
    { id: 'metformin', name: 'Metformin', category: 'dm_oral' }
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

    // Check Warfarin -> Ask Bridging Risk
    if (selectedDrugs.find(d => d.id === 'warfarin')) {
        hasQuestions = true;
        const html = `
            <div class="form-group highlight-box">
                <h4><i class="fa-solid fa-heart-crack"></i> คำถามสำหรับ Warfarin: ความเสี่ยงลิ่มเลือด (Thrombotic Risk)</h4>
                <p class="small-text">เลือกข้อที่ผู้ป่วยมี (ถ้าไม่มีไม่ต้องเลือก):</p>
                
                <label><input type="checkbox" id="war_mech_valve"> มีลิ้นหัวใจเทียม (Mechanical Mitral/Aortic Valve)</label>
                <label><input type="checkbox" id="war_af_stroke"> เป็น AF + เคยมี Stroke/TIA ใน 3 เดือน หรือ CHADS2 สูง</label>
                <label><input type="checkbox" id="war_vte"> เป็น VTE (ลิ่มเลือดอุดตันที่ขา/ปอด) ในช่วง 3 เดือนที่ผ่านมา</label>
                
                <div class="image-placeholder small">
                   <p>[วางรูปตาราง Stratification for Bridging ตรงนี้]</p>
                </div>
            </div>
        `;
        container.innerHTML += html;
    }

    // Check Antiplatelets -> Ask Stent
    const hasAntiplatelet = selectedDrugs.some(d => d.category === 'antiplatelet');
    if (hasAntiplatelet) {
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
                    <label>วันที่ใส่ (Implant Date):</label>
                    <input type="date" id="stent_date" class="form-control">
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

    // Check GLP-1 Weekly -> Ask Last Dose
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

    if (hasQuestions) {
        section.classList.remove('hidden');
    } else {
        section.classList.add('hidden');
    }
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
    const crcl = parseInt(document.getElementById('renalFunction').value) || 90; // Default normal
    const resultDiv = document.getElementById('resultContent');
    const resultSection = document.getElementById('results-section');
    const surgeryDateStr = document.getElementById('surgeryDate').value;
    const surgeryDate = surgeryDateStr ? new Date(surgeryDateStr) : null;

    if (!bleedRisk) {
        alert("กรุณาระบุความเสี่ยงเลือดออก (Bleeding Risk) ก่อนครับ");
        return;
    }

    let recommendations = "";

    // 1. Logic: Anticoagulants
    selectedDrugs.forEach(drug => {
        let advice = "";
        let styleClass = "rec-stop"; // Default to stop warning

        // --- Warfarin ---
        if (drug.id === 'warfarin') {
            if (bleedRisk === 'minimal') {
                advice = `<strong>${drug.name}:</strong> ไม่ต้องหยุดยา (Continue) <br><small>เช็ค INR ก่อนทำ 1-2 วัน (Target 2-3)</small>`;
                styleClass = "rec-continue";
            } else {
                advice = `<strong>${drug.name}:</strong> หยุดยา 5 วันก่อนผ่าตัด`;
                
                // Check Bridging
                const isMechValve = document.getElementById('war_mech_valve')?.checked;
                const isAfStroke = document.getElementById('war_af_stroke')?.checked;
                const isVte = document.getElementById('war_vte')?.checked;

                if (isMechValve || isAfStroke || isVte) {
                    advice += `<br><span style="color:#008CBA"><strong>Need Bridging:</strong> แนะนำให้ Bridge ด้วย LMWH/UFH (ความเสี่ยงลิ่มเลือดสูง)</span>`;
                    styleClass = "rec-bridge";
                } else {
                    advice += `<br><small>ไม่ต้อง Bridging (ความเสี่ยงลิ่มเลือดต่ำ/ปานกลาง)</small>`;
                }
            }
        }
        
        // --- DOACs ---
        else if (drug.category === 'doac') {
            let stopDays = 0;
            
            // Dabigatran Logic
            if (drug.id === 'dabigatran') {
                if (crcl >= 50) stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                else stopDays = (bleedRisk === 'low-mod') ? 2 : 4;
                
                if (crcl < 30) advice = `<strong>${drug.name}:</strong> ⚠️ Contraindicated (ปรึกษาแพทย์เฉพาะทาง) CrCl ต่ำมาก`;
            } 
            // Other DOACs
            else {
                stopDays = (bleedRisk === 'low-mod') ? 1 : 2;
                if (bleedRisk === 'neuro-spine') stopDays = 3; // Conservative for high risk
            }

            if (!advice) { // If not overridden
                if (bleedRisk === 'minimal') {
                     advice = `<strong>${drug.name}:</strong> พิจารณาไม่หยุดยา (งดมื้อเช้าวันผ่าตัด) หรือหยุด 1 วัน`;
                     styleClass = "rec-continue";
                } else {
                     advice = `<strong>${drug.name}:</strong> หยุดยา ${stopDays} วันก่อนผ่าตัด (งด Bridging)`;
                }
            }
        }

        // --- Antiplatelets ---
        else if (drug.category === 'antiplatelet') {
            if (drug.id === 'aspirin') {
                if (bleedRisk === 'neuro-spine' || bleedRisk === 'high') { // High bleed risk defined for ASA
                    advice = `<strong>${drug.name}:</strong> หยุดยา 7 วันก่อนผ่าตัด (High/Neuro Bleeding Risk)`;
                } else {
                    advice = `<strong>${drug.name}:</strong> ไม่ต้องหยุดยา (Continue) <br><small>Ischemic risk มักสูงกว่า Bleeding risk</small>`;
                    styleClass = "rec-continue";
                }
            } else {
                // P2Y12
                let days = 5;
                if (drug.id === 'ticagrelor') days = 3; // to 5
                if (drug.id === 'prasugrel') days = 7;
                advice = `<strong>${drug.name}:</strong> หยุดยา ${days} วันก่อนผ่าตัด`;
            }

            // Stent Check Alert
            const stentStatus = document.getElementById('stent_status')?.value;
            if (stentStatus === 'yes') {
                 // Simple logic for Alert (Detailed logic needs date calculation)
                 advice += `<br><div class="warning-box" style="margin-top:5px; background:#FFF0F0; padding:5px; border-radius:5px;">⚠️ <strong>Stent Alert:</strong> ผู้ป่วยมีประวัติใส่ Stent < 1 ปี โปรดระวัง! หากหยุดยา Antiplatelet เสี่ยง Stent Thrombosis สูงมาก (Consult Cardio)</div>`;
            }
        }

        // --- SGLT2i ---
        else if (drug.category === 'sglt2') {
            advice = `<strong>${drug.name}:</strong> หยุดยา 3-4 วันก่อนผ่าตัด <br><small>ระวัง Euglycemic DKA</small>`;
        }

        // --- GLP-1 Weekly ---
        else if (drug.category === 'glp1_weekly') {
            advice = `<strong>${drug.name}:</strong> หยุดยา 1 สัปดาห์ก่อนผ่าตัด`;
            
            const lastDoseStr = document.getElementById('glp1_last_date')?.value;
            if (lastDoseStr && surgeryDate) {
                const lastDose = new Date(lastDoseStr);
                const diffTime = Math.abs(surgeryDate - lastDose);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                
                if (diffDays < 7) {
                    advice += `<br><span style="color:red">⚠️ <strong>Full Stomach Risk:</strong> ยามีฤทธิ์ค้าง (หยุดไม่ครบ 7 วัน) แจ้งวิสัญญีแพทย์เพื่อทำ Gastric Ultrasound หรือพิจารณาเลื่อนผ่าตัด</span>`;
                } else {
                     advice += `<br><span style="color:green">✅ ระยะเวลาหยุดยาปลอดภัย (>7 วัน)</span>`;
                }
            }
        }
        
         // --- GLP-1 Daily ---
        else if (drug.category === 'glp1_daily') {
            advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด (Hold on day of surgery)`;
        }

        // --- General Meds ---
        else if (drug.id === 'metformin') {
             advice = `<strong>${drug.name}:</strong> หยุดยาเช้าวันผ่าตัด (หรือ 24 ชม. ถ้าฉีดสี/ไตวาย)`;
        }

        // Add to result block
        recommendations += `<div class="recommendation-box ${styleClass}">${advice}</div>`;
    });

    if (recommendations === "") {
        recommendations = "<p>ยังไม่ได้เลือกยาที่มีความเสี่ยง หรือ ยาที่เลือกไม่มีข้อห้ามหยุดยาพิเศษ (ให้พิจารณาตามมาตรฐาน รพ.)</p>";
    }

    resultDiv.innerHTML = recommendations;
    resultSection.classList.remove('hidden');
    
    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });
}
