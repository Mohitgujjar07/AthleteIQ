'use strict';

window.initDashboard = function() {
  initWater();
  initStreak();
};

function initWater() {
  const container = document.getElementById('water-cups');
  if (!container) return;
  container.innerHTML = '';
  
  for (let i = 0; i < window.AppState.WATER_GOAL; i++) {
    const btn = document.createElement('button');
    btn.className = 'cup-btn';
    btn.setAttribute('aria-label', `Glass ${i + 1} of water`);
    
    const isPressed = i < window.AppState.waterCount;
    btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    
    btn.onclick = () => {
      // Toggle logic: clicking the last filled cup removes it, otherwise fills up to the clicked cup
      if (window.AppState.waterCount === i + 1) {
        window.AppState.waterCount = i;
      } else {
        window.AppState.waterCount = i + 1;
      }
      initWater();
    };
    
    container.appendChild(btn);
  }
  
  const label = document.getElementById('water-label');
  if (label) {
    const liters = (window.AppState.waterCount * 0.25).toFixed(2);
    label.textContent = `Water: ${window.AppState.waterCount}/${window.AppState.WATER_GOAL} Glasses (${liters}L)`;
  }
}

function initStreak() {
  const container = document.getElementById('streak-days');
  if (!container) return;
  container.innerHTML = '';
  
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const streak = 6;
  
  days.forEach((day, i) => {
    const div = document.createElement('div');
    div.className = `streak-day ${i < streak ? 'done' : ''}`;
    div.textContent = day;
    container.appendChild(div);
  });
}
