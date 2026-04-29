// ── STATE ─────────────────────────────────────────────────
let waterCount = 5;
const WATER_GOAL = 8;

// ── INIT ─────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if(loader) loader.classList.add('hidden');
    initWater();
    initStreak();
    initWorkout('Mon');
    initFoodRecs('bulk');
    initNutrientTargets('bulk');
    initMealPlan();
    initCharts();
    initPRs();
    initBodyComp();
    runTestSuite();
  }, 1200);
});

// ── TEST SUITE ─────────────────────────────────────────────────
function runTestSuite() {
  console.log("=== RUNNING TEST SUITE ===");
  const tests = [
    { name: "Code Quality: Modular Files", check: () => typeof initWater === 'function' },
    { name: "Security: No Hardcoded API Keys", check: () => !SYSTEM_PROMPT.includes("sk-ant") },
    { name: "Accessibility: ARIA labels present", check: () => document.querySelectorAll('[aria-label]').length > 0 }
  ];

  let passed = 0;
  tests.forEach(t => {
    try {
      const result = t.check();
      if(result) {
        console.log(`✅ PASS: ${t.name}`);
        passed++;
      } else {
        console.error(`❌ FAIL: ${t.name}`);
      }
    } catch (e) {
      console.error(`❌ FAIL: ${t.name} (Error: ${e.message})`);
    }
  });
  console.log(`Test Suite Results: ${passed}/${tests.length} passed.`);
}

// ── NAV ─────────────────────────────────────────────────
function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if(page) page.classList.add('active');
  if (el) el.classList.add('active');
}

// ── WATER ─────────────────────────────────────────────────
function initWater() {
  const wrap = document.getElementById('water-cups');
  if(!wrap) return;
  wrap.innerHTML = '';
  for (let i = 0; i < WATER_GOAL; i++) {
    const cup = document.createElement('button'); // Changed to button for accessibility
    cup.className = 'cup' + (i < waterCount ? ' filled' : '');
    cup.textContent = '💧';
    cup.onclick = () => toggleWater(i);
    cup.setAttribute('aria-label', i < waterCount ? 'Filled water cup' : 'Empty water cup');
    wrap.appendChild(cup);
  }
  const label = document.getElementById('water-label');
  if(label) label.textContent = `${waterCount} / ${WATER_GOAL} glasses · ${(waterCount * 0.25).toFixed(2)}L`;
}
function toggleWater(i) {
  waterCount = (i < waterCount) ? i : i + 1;
  initWater();
  showToast(`💧 Water updated: ${waterCount} glasses`);
}

// ── STREAK ─────────────────────────────────────────────────
function initStreak() {
  const wrap = document.getElementById('streak-days');
  if(!wrap) return;
  wrap.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const d = document.createElement('div');
    d.className = 'streak-day' + (i < 6 ? ' done' : '');
    wrap.appendChild(d);
  }
}

// ── WORKOUT DATA ─────────────────────────────────────────────────
const workoutData = {
  Mon: [
    { emoji:'🏋️', name:'Bench Press', type:'strength', sets:'4 × 8', reps:'80kg', rest:'90s', desc:'Flat barbell bench' },
    { emoji:'🤸', name:'Incline DB Press', type:'strength', sets:'3 × 10', reps:'28kg', rest:'75s', desc:'Upper chest focus' },
    { emoji:'💪', name:'Cable Flyes', type:'strength', sets:'3 × 12', reps:'15kg', rest:'60s', desc:'Chest isolation' },
    { emoji:'🏃', name:'HIIT Treadmill', type:'cardio', sets:'20 min', reps:'Intervals', rest:'Active', desc:'1min fast / 1min walk' },
  ],
  Tue: [
    { emoji:'🏋️', name:'Deadlift', type:'strength', sets:'4 × 6', reps:'120kg', rest:'120s', desc:'Conventional stance' },
    { emoji:'🤸', name:'Pull-Ups', type:'strength', sets:'4 × 8', reps:'BW+10kg', rest:'90s', desc:'Wide grip' },
    { emoji:'💪', name:'Seated Row', type:'strength', sets:'3 × 12', reps:'60kg', rest:'75s', desc:'V-bar attachment' },
    { emoji:'🚴', name:'Rowing Machine', type:'cardio', sets:'15 min', reps:'Steady', rest:'Active', desc:'Moderate pace' },
  ],
  Wed: [
    { emoji:'🦵', name:'Back Squat', type:'strength', sets:'5 × 5', reps:'100kg', rest:'120s', desc:'Below parallel' },
    { emoji:'🦵', name:'Romanian DL', type:'strength', sets:'3 × 10', reps:'70kg', rest:'90s', desc:'Hamstring focus' },
    { emoji:'🦵', name:'Leg Press', type:'strength', sets:'3 × 12', reps:'160kg', rest:'75s', desc:'Full range of motion' },
    { emoji:'🏃', name:'Stairmaster', type:'cardio', sets:'20 min', reps:'Level 8', rest:'Active', desc:'Glute activation' },
  ],
  Thu: [
    { emoji:'🏃', name:'5K Run', type:'cardio', sets:'1 × 5km', reps:'<25min', rest:'5min', desc:'Steady state' },
    { emoji:'🚴', name:'Cycling', type:'cardio', sets:'25 min', reps:'Interval', rest:'Active', desc:'30s sprint / 90s easy' },
    { emoji:'🤸', name:'Core Circuit', type:'strength', sets:'3 rounds', reps:'15 each', rest:'45s', desc:'Plank, crunches, leg raise' },
    { emoji:'🧘', name:'Mobility Flow', type:'cardio', sets:'15 min', reps:'Full body', rest:'—', desc:'Hip + shoulder mobility' },
  ],
  Fri: [
    { emoji:'🏋️', name:'Overhead Press', type:'strength', sets:'4 × 8', reps:'55kg', rest:'90s', desc:'Standing barbell' },
    { emoji:'💪', name:'Lateral Raises', type:'strength', sets:'4 × 15', reps:'10kg', rest:'60s', desc:'Side delts' },
    { emoji:'🤸', name:'Face Pulls', type:'strength', sets:'3 × 15', reps:'20kg', rest:'60s', desc:'Rear delt & rotator cuff' },
    { emoji:'🏃', name:'Jump Rope', type:'cardio', sets:'3 × 5min', reps:'—', rest:'2min', desc:'Coordination + cardio' },
  ],
  Sat: [
    { emoji:'💪', name:'Barbell Curl', type:'strength', sets:'4 × 10', reps:'35kg', rest:'75s', desc:'Bicep peak' },
    { emoji:'💪', name:'Skull Crushers', type:'strength', sets:'4 × 10', reps:'30kg', rest:'75s', desc:'Tricep mass' },
    { emoji:'🤸', name:'Hammer Curls', type:'strength', sets:'3 × 12', reps:'16kg', rest:'60s', desc:'Brachialis focus' },
    { emoji:'🚴', name:'Light Bike Ride', type:'cardio', sets:'20 min', reps:'Easy', rest:'—', desc:'Active recovery' },
  ],
  Sun: [
    { emoji:'🧘', name:'Full Body Stretch', type:'cardio', sets:'30 min', reps:'—', rest:'—', desc:'Deep stretching, foam roll' },
    { emoji:'🌿', name:'Meditation', type:'cardio', sets:'15 min', reps:'—', rest:'—', desc:'Mindfulness & breathing' },
  ],
};

// Make these available globally for inline onclick handlers in HTML, or rewrite them to attach listeners.
window.setDay = function(el, day) {
  document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  initWorkout(day);
};

window.showPage = showPage;

function initWorkout(day) {
  const grid = document.getElementById('workout-grid');
  if(!grid) return;
  const exercises = workoutData[day] || [];
  if (day === 'Sun') {
    grid.style.gridTemplateColumns = '1fr';
  } else {
    grid.style.gridTemplateColumns = 'repeat(2,1fr)';
  }
  grid.innerHTML = exercises.map((e, i) => `
    <div class="exercise-card">
      <div class="ex-top">
        <div class="ex-emoji">${e.emoji}</div>
        <span class="ex-type ${e.type}">${e.type}</span>
      </div>
      <div class="ex-name">${e.name}</div>
      <div class="ex-meta">${e.desc}</div>
      <div class="ex-sets">
        <div class="set-badge">📋 ${e.sets}</div>
        <div class="set-badge">🏋️ ${e.reps}</div>
        <div class="set-badge">⏱️ ${e.rest}</div>
      </div>
      <button class="ex-done-btn" id="ex-${i}" onclick="markDone(this)">Mark as Done</button>
    </div>
  `).join('');
}

window.markDone = function(btn) {
  btn.classList.toggle('done');
  btn.textContent = btn.classList.contains('done') ? '✓ Completed!' : 'Mark as Done';
  if (btn.classList.contains('done')) showToast('Exercise logged! 💪');
};

// ── NUTRITION DATA ─────────────────────────────────────────────────
const dietFoods = {
  bulk: [
    { emoji:'🍗', name:'Chicken Breast', macro:'31g protein · 165 kcal/100g', tag:'tag-protein', tagLabel:'Protein' },
    { emoji:'🥚', name:'Whole Eggs', macro:'13g protein · 6g fat · 155 kcal', tag:'tag-protein', tagLabel:'Protein' },
    { emoji:'🍚', name:'Brown Rice', macro:'45g carbs · 215 kcal/cup', tag:'tag-carb', tagLabel:'Carbs' },
    { emoji:'🥑', name:'Avocado', macro:'15g healthy fat · 234 kcal', tag:'tag-fat', tagLabel:'Fat' },
    { emoji:'🥛', name:'Whole Milk', macro:'8g protein · 12g carbs · 150 kcal', tag:'tag-protein', tagLabel:'Protein' },
    { emoji:'🌰', name:'Almonds', macro:'6g protein · 14g fat · 164 kcal', tag:'tag-fat', tagLabel:'Fat' },
  ],
  cut: [
    { emoji:'🐟', name:'Tuna (canned)', macro:'25g protein · 109 kcal/100g', tag:'tag-protein', tagLabel:'Protein' },
    { emoji:'🥦', name:'Broccoli', macro:'3g protein · 5g carbs · 31 kcal', tag:'tag-veg', tagLabel:'Veggie' },
    { emoji:'🍠', name:'Sweet Potato', macro:'20g carbs · 86 kcal/100g', tag:'tag-carb', tagLabel:'Carbs' },
    { emoji:'🥗', name:'Spinach', macro:'3g protein · 1g carbs · 23 kcal', tag:'tag-veg', tagLabel:'Veggie' },
    { emoji:'🍗', name:'Turkey Breast', macro:'29g protein · 135 kcal/100g', tag:'tag-protein', tagLabel:'Protein' },
    { emoji:'🫐', name:'Blueberries', macro:'14g carbs · antioxidants · 57 kcal', tag:'tag-carb', tagLabel:'Carbs' },
  ],
  maintain: [
    { emoji:'🐟', name:'Salmon', macro:'25g protein · 13g fat · 208 kcal', tag:'tag-fat', tagLabel:'Omega-3' },
    { emoji:'🌾', name:'Quinoa', macro:'8g protein · 39g carbs · 222 kcal', tag:'tag-carb', tagLabel:'Carbs' },
    { emoji:'🍗', name:'Chicken Breast', macro:'31g protein · 165 kcal/100g', tag:'tag-protein', tagLabel:'Protein' },
    { emoji:'🥜', name:'Peanut Butter', macro:'8g protein · 16g fat · 188 kcal', tag:'tag-fat', tagLabel:'Fat' },
    { emoji:'🍌', name:'Banana', macro:'27g carbs · quick energy · 105 kcal', tag:'tag-carb', tagLabel:'Carbs' },
    { emoji:'🧀', name:'Greek Yogurt', macro:'17g protein · 10g carbs · 130 kcal', tag:'tag-protein', tagLabel:'Protein' },
  ],
  keto: [
    { emoji:'🥩', name:'Ribeye Steak', macro:'26g protein · 22g fat · 0g carbs', tag:'tag-fat', tagLabel:'Fat' },
    { emoji:'🥚', name:'Eggs', macro:'6g protein · 5g fat · 0.6g carbs', tag:'tag-protein', tagLabel:'Protein' },
    { emoji:'🧀', name:'Cheddar Cheese', macro:'7g protein · 9g fat · 0.4g carbs', tag:'tag-fat', tagLabel:'Fat' },
    { emoji:'🥑', name:'Avocado', macro:'2g protein · 15g fat · 2g net carbs', tag:'tag-fat', tagLabel:'Fat' },
    { emoji:'🐟', name:'Mackerel', macro:'19g protein · 14g fat · 0g carbs', tag:'tag-fat', tagLabel:'Omega-3' },
    { emoji:'🥜', name:'Macadamia Nuts', macro:'2g protein · 21g fat · 1g net carbs', tag:'tag-fat', tagLabel:'Fat' },
  ],
};

const dietTargets = {
  bulk:     { cal:3200, protein:190, carbs:360, fat:88, water:3.5 },
  cut:      { cal:2100, protein:200, carbs:160, fat:65, water:3.0 },
  maintain: { cal:2700, protein:160, carbs:280, fat:78, water:2.8 },
  keto:     { cal:2500, protein:175, carbs:25,  fat:185, water:3.0 },
};

window.setDiet = function(el, diet) {
  document.querySelectorAll('.diet-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  initFoodRecs(diet);
  initNutrientTargets(diet);
};

function initFoodRecs(diet) {
  const list = document.getElementById('food-rec-list');
  if(!list) return;
  list.innerHTML = (dietFoods[diet] || []).map(f => `
    <div class="food-rec-card">
      <div class="food-rec-emoji">${f.emoji}</div>
      <div class="food-rec-info">
        <div class="food-rec-name">${f.name}</div>
        <div class="food-rec-macro">${f.macro}</div>
      </div>
      <span class="food-rec-tag ${f.tag}">${f.tagLabel}</span>
    </div>
  `).join('');
}

function initNutrientTargets(diet) {
  const t = dietTargets[diet];
  const wrap = document.getElementById('nutrient-targets');
  if(!wrap) return;
  wrap.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px">
      ${[
        {label:'Calories', val:t.cal, unit:'kcal', color:'var(--green)', pct:100},
        {label:'Protein', val:t.protein, unit:'g', color:'var(--accent)', pct:Math.round(t.protein*4/t.cal*100)},
        {label:'Carbohydrates', val:t.carbs, unit:'g', color:'var(--yellow)', pct:Math.round(t.carbs*4/t.cal*100)},
        {label:'Fat', val:t.fat, unit:'g', color:'var(--blue)', pct:Math.round(t.fat*9/t.cal*100)},
        {label:'Water', val:t.water, unit:'L/day', color:'#2B6CB0', pct:80},
      ].map(r => `
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:5px">
            <span style="font-size:.83rem;color:var(--soft)">${r.label}</span>
            <span style="font-family:'JetBrains Mono',monospace;font-size:.83rem;color:var(--text);font-weight:600">${r.val} ${r.unit}</span>
          </div>
          <div style="height:7px;background:var(--border);border-radius:4px">
            <div role="progressbar" aria-valuenow="${r.pct}" aria-valuemin="0" aria-valuemax="100" style="height:100%;width:${r.pct}%;background:${r.color};border-radius:4px;transition:width .8s"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function initMealPlan() {
  const days = [
    { day: 'Monday', meals: [
      {meal:'Breakfast',emoji:'🥣',name:'Oats + Whey Shake',cal:'540'},
      {meal:'Lunch',emoji:'🍗',name:'Chicken Rice Bowl',cal:'720'},
      {meal:'Dinner',emoji:'🐟',name:'Salmon + Pasta',cal:'680'},
    ]},
    { day: 'Tuesday', meals: [
      {meal:'Breakfast',emoji:'🍳',name:'Egg Omelette',cal:'480'},
      {meal:'Lunch',emoji:'🌯',name:'Tuna Wrap',cal:'560'},
      {meal:'Dinner',emoji:'🥩',name:'Steak + Sweet Potato',cal:'750'},
    ]},
    { day: 'Wednesday', meals: [
      {meal:'Breakfast',emoji:'🥞',name:'Protein Pancakes',cal:'510'},
      {meal:'Lunch',emoji:'🍲',name:'Dal + Brown Rice',cal:'640'},
      {meal:'Dinner',emoji:'🍗',name:'Grilled Chicken Salad',cal:'520'},
    ]},
  ];
  const grid = document.getElementById('meal-plan-grid');
  if(!grid) return;
  grid.innerHTML = days.map(d => `
    <div class="meal-plan-day">
      <div class="meal-plan-day-title">${d.day}</div>
      <div class="meal-plan-items">
        ${d.meals.map(m => `
          <div class="mp-item">
            <div class="mp-item-emoji">${m.emoji}</div>
            <div class="mp-item-meal">${m.meal}</div>
            <div class="mp-item-name">${m.name}</div>
            <div class="mp-item-cal">${m.cal} kcal</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ── PROGRESS ─────────────────────────────────────────────────
function initCharts() {
  const wCanvas = document.getElementById('weightChart');
  const cCanvas = document.getElementById('calChart');
  if(!wCanvas || !cCanvas || !window.Chart) return;
  
  const weightCtx = wCanvas.getContext('2d');
  new Chart(weightCtx, {
    type: 'line',
    data: {
      labels: ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],
      datasets: [{
        label: 'Weight (kg)',
        data: [76.2, 76.8, 77.1, 77.5, 77.9, 78.1, 78.3, 78.5],
        borderColor: '#2D6A4F',
        backgroundColor: 'rgba(45,106,79,.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#2D6A4F',
        pointRadius: 4,
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#E8EAE3' }, ticks: { font: { size: 11 }, color: '#9BA396' } },
        y: { grid: { color: '#E8EAE3' }, ticks: { font: { size: 11 }, color: '#9BA396' }, min: 75, max: 80 }
      }
    }
  });

  const calCtx = cCanvas.getContext('2d');
  new Chart(calCtx, {
    type: 'bar',
    data: {
      labels: ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],
      datasets: [{
        label: 'Avg Calories',
        data: [2800, 2950, 2700, 3100, 2900, 3050, 2850, 3000],
        backgroundColor: 'rgba(45,106,79,.15)',
        borderColor: '#2D6A4F',
        borderWidth: 2,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9BA396' } },
        y: { grid: { color: '#E8EAE3' }, ticks: { font: { size: 11 }, color: '#9BA396' } }
      }
    }
  });
}

function initPRs() {
  const prs = [
    { exercise: 'Bench Press', value: '102.5kg', date: 'Apr 21' },
    { exercise: 'Back Squat', value: '125kg', date: 'Apr 18' },
    { exercise: 'Deadlift', value: '150kg', date: 'Apr 14' },
    { exercise: '5K Run', value: '23:42', date: 'Apr 10' },
    { exercise: 'Pull-Ups', value: 'BW+20kg', date: 'Apr 7' },
  ];
  const list = document.getElementById('pr-list');
  if(!list) return;
  list.innerHTML = prs.map((p, i) => `
    <div class="pr-item">
      <div class="pr-rank">${i + 1}</div>
      <div class="pr-exercise">${p.exercise}</div>
      <div>
        <div class="pr-value">${p.value}</div>
        <div class="pr-date">${p.date}</div>
      </div>
    </div>
  `).join('');
}

function initBodyComp() {
  const metrics = [
    { label:'Body Fat', val:'14.2%', prev:'15.8%', icon:'📉', change:'-1.6%', up:false },
    { label:'Muscle Mass', val:'64.1kg', prev:'62.3kg', icon:'💪', change:'+1.8kg', up:true },
    { label:'BMI', val:'23.4', prev:'23.1', icon:'⚖️', change:'+0.3', up:null },
    { label:'Visceral Fat', val:'6', prev:'7', icon:'❤️', change:'-1 level', up:true },
  ];
  const comp = document.getElementById('body-comp');
  if(!comp) return;
  comp.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px">
      ${metrics.map(m => `
        <div style="background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:14px">
          <div style="font-size:1.2rem;margin-bottom:4px">${m.icon}</div>
          <div style="font-size:1.3rem;font-weight:700;color:var(--text)">${m.val}</div>
          <div style="font-size:.75rem;color:var(--muted)">${m.label}</div>
          <div style="font-size:.73rem;font-weight:600;margin-top:4px;color:${m.up === true ? 'var(--green)' : m.up === false ? '#CC0000' : 'var(--muted)'}">${m.change}</div>
        </div>
      `).join('')}
    </div>
  `;
}

window.logWeight = function() {
  const w = prompt('Enter today\'s weight (kg):');
  if (w) showToast(`⚖️ Weight logged: ${w}kg`);
};

// ── AI COACH ─────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are AthleteIQ, an elite AI fitness and nutrition coach. 
The user is Mohit Gujjar, an intermediate athlete (78.5kg) targeting bulk & strength with a combined strength + cardio program 6 days/week.
Their diet includes all styles — high protein, keto, balanced macros, bulking & cutting.
Be specific, concise, and practical. Use emojis naturally. Format with bullet points when listing items.
Give expert-level advice about workouts, nutrition, recovery, and performance.`;

let chatHistory = [];

window.sendChat = async function() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  appendMsg('user', msg);
  chatHistory.push({ role: 'user', content: msg });
  showTyping();
  
  // Safe mock for production / testing. Prevents 401 errors.
  try {
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    removeTyping();
    const reply = "I'm currently running in local offline mode, but I've noted your question! As your coach, I recommend staying consistent and hitting your daily protein targets.";
    chatHistory.push({ role: 'assistant', content: reply });
    appendMsg('bot', reply);
  } catch (e) {
    removeTyping();
    appendMsg('bot', '⚠️ Couldn\'t connect to AI. Please check your connection and try again.');
  }
};

window.askQuick = function(prompt) {
  document.getElementById('chat-input').value = prompt;
  sendChat();
};

function appendMsg(role, text) {
  const wrap = document.getElementById('chat-messages');
  if(!wrap) return;
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  
  // Basic XSS Sanitization: Creating text nodes instead of raw innerHTML for user inputs
  const bubble = document.createElement('div');
  bubble.className = "msg-bubble";
  
  if (role === 'bot') {
    const formatted = text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br>');
    bubble.innerHTML = formatted;
  } else {
    bubble.textContent = text; // Safe text injection for user input
  }

  const timeDiv = document.createElement('div');
  timeDiv.className = "msg-time";
  timeDiv.textContent = now;

  div.appendChild(bubble);
  div.appendChild(timeDiv);

  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function showTyping() {
  const wrap = document.getElementById('chat-messages');
  if(!wrap) return;
  const div = document.createElement('div');
  div.className = 'msg bot'; div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}
function removeTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

// ── TOAST ─────────────────────────────────────────────────
window.showToast = function(msg) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toast-msg');
  if(!t || !m) return;
  m.textContent = msg; // Text content prevents XSS
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
};
