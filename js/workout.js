'use strict';

const WORKOUTS = {
  Mon: [
    { emoji: '🏋️', name: 'Barbell Back Squat', type: 'strength', sets: '4 × 8', weight: '100kg', rest: '90s', desc: 'Keep chest up and core tight. Break parallel if mobility allows.' },
    { emoji: '🦵', name: 'Leg Press', type: 'strength', sets: '3 × 12', weight: '200kg', rest: '60s', desc: 'Controlled negative, explosive positive. Do not lock out knees.' },
    { emoji: '🦵', name: 'Romanian Deadlift', type: 'strength', sets: '3 × 10', weight: '80kg', rest: '90s', desc: 'Hinge at the hips. Keep back straight and barbell close to legs.' },
    { emoji: '🏃', name: 'Stationary Bike', type: 'cardio', sets: '1 × 15m', weight: 'BW', rest: '-', desc: 'Moderate intensity cool down. Keep heart rate around 130bpm.' }
  ],
  Tue: [
    { emoji: '💪', name: 'Barbell Bench Press', type: 'strength', sets: '4 × 8', weight: '80kg', rest: '90s', desc: 'Plant feet firmly. Slight arch in back. Lower to mid-chest.' },
    { emoji: '🦅', name: 'Incline Dumbbell Press', type: 'strength', sets: '3 × 10', weight: '30kg', rest: '90s', desc: 'Angle bench at 30 degrees. Focus on upper chest contraction.' },
    { emoji: '🦋', name: 'Cable Crossovers', type: 'strength', sets: '3 × 15', weight: '15kg', rest: '60s', desc: 'Squeeze pecs at the center. Keep a slight bend in elbows.' },
    { emoji: '🔥', name: 'Triceps Pushdown', type: 'strength', sets: '3 × 12', weight: '25kg', rest: '60s', desc: 'Keep elbows tucked to sides. Fully extend at the bottom.' }
  ],
  Wed: [
    { emoji: '🧘', name: 'Active Recovery Yoga', type: 'cardio', sets: '1 × 30m', weight: 'BW', rest: '-', desc: 'Focus on breathing and stretching tight muscles from previous days.' },
    { emoji: '🚶', name: 'Brisk Walk', type: 'cardio', sets: '1 × 30m', weight: 'BW', rest: '-', desc: 'Outdoor walk or treadmill at 5km/h. Good for blood flow.' }
  ],
  Thu: [
    { emoji: '🦍', name: 'Conventional Deadlift', type: 'strength', sets: '3 × 5', weight: '140kg', rest: '120s', desc: 'Keep bar close to shins. Push the floor away. Neutral spine.' },
    { emoji: '🦅', name: 'Pull-Ups', type: 'strength', sets: '3 × AMRAP', weight: 'BW', rest: '90s', desc: 'Full range of motion. Dead hang to chin over bar.' },
    { emoji: '🚣', name: 'Barbell Rows', type: 'strength', sets: '3 × 10', weight: '70kg', rest: '90s', desc: 'Hinge at 45 degrees. Pull bar to belly button. Squeeze lats.' },
    { emoji: '💪', name: 'Barbell Bicep Curls', type: 'strength', sets: '3 × 12', weight: '30kg', rest: '60s', desc: 'Keep elbows pinned. Squeeze at the top, control the eccentric.' }
  ],
  Fri: [
    { emoji: '🏋️', name: 'Overhead Press', type: 'strength', sets: '4 × 8', weight: '50kg', rest: '90s', desc: 'Brace core. Press in a straight line. Head through at the top.' },
    { emoji: '🦅', name: 'Lateral Raises', type: 'strength', sets: '4 × 15', weight: '10kg', rest: '60s', desc: 'Lead with the elbows. Slight bend in arms. Pour the pitcher.' },
    { emoji: '🔥', name: 'Face Pulls', type: 'strength', sets: '3 × 15', weight: '20kg', rest: '60s', desc: 'Pull to forehead. Externally rotate shoulders. Squeeze rear delts.' },
    { emoji: '🏃', name: 'HIIT Sprints', type: 'cardio', sets: '8 × 30s', weight: 'BW', rest: '60s', desc: 'All out sprint for 30s, followed by 60s slow walk.' }
  ],
  Sat: [
    { emoji: '🦵', name: 'Bulgarian Split Squats', type: 'strength', sets: '3 × 10', weight: '20kg', rest: '90s', desc: 'Keep torso upright for quad focus. Deep stretch at the bottom.' },
    { emoji: '🍑', name: 'Hip Thrusts', type: 'strength', sets: '3 × 12', weight: '100kg', rest: '90s', desc: 'Chin tucked. Drive through heels. Squeeze glutes hard at top.' },
    { emoji: '🦵', name: 'Leg Extensions', type: 'strength', sets: '3 × 15', weight: '50kg', rest: '60s', desc: 'Hold contraction for 1 second at the top.' },
    { emoji: '🦵', name: 'Calf Raises', type: 'strength', sets: '4 × 20', weight: '80kg', rest: '60s', desc: 'Full stretch at bottom, full contraction at top. Pause on both.' }
  ],
  Sun: [
    { emoji: '🛋️', name: 'Full Rest Day', type: 'cardio', sets: '-', weight: '-', rest: '-', desc: 'Eat well, hydrate, and get plenty of sleep. You earned it.' }
  ]
};

window.initWorkout = function(day) {
  const grid = document.getElementById('workout-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const exercises = WORKOUTS[day];
  if (!exercises) return;

  exercises.forEach((ex, idx) => {
    const article = document.createElement('article');
    article.className = 'exercise-card';
    
    // Sanitize values
    const safeEmoji = window.sanitize(ex.emoji);
    const safeName = window.sanitize(ex.name);
    const safeType = window.sanitize(ex.type);
    const safeSets = window.sanitize(ex.sets);
    const safeWeight = window.sanitize(ex.weight);
    const safeRest = window.sanitize(ex.rest);
    const safeDesc = window.sanitize(ex.desc);

    const typeClass = ex.type === 'strength' ? 'type-strength' : 'type-cardio';

    article.innerHTML = `
      <div class="ex-header">
        <span class="ex-emoji" aria-hidden="true">${safeEmoji}</span>
        <div style="flex:1">
          <h3 class="ex-name">${safeName}</h3>
          <span class="ex-type ${typeClass}">${safeType}</span>
        </div>
      </div>
      <div class="ex-details">
        <span>🔄 ${safeSets}</span>
        <span>⚖️ ${safeWeight}</span>
        <span>⏱️ ${safeRest}</span>
      </div>
      <p class="ex-desc">${safeDesc}</p>
      <button class="mark-done-btn" aria-pressed="false" onclick="markDone(this, '${safeName.replace(/'/g, "\\'")}')">
        Mark as Done
      </button>
    `;
    grid.appendChild(article);
  });
};

window.markDone = function(btn, name) {
  const isPressed = btn.getAttribute('aria-pressed') === 'true';
  if (isPressed) {
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = 'Mark as Done';
  } else {
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = 'Completed!';
    window.showToast(`${name} completed! Great job!`);
  }
};

window.setDay = function(el, day) {
  window.AppState.currentDay = day;
  const tabs = document.querySelectorAll('.day-tab');
  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-selected', 'true');
  window.initWorkout(day);
};
