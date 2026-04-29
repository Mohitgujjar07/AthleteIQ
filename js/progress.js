'use strict';

window.initCharts = function() {
  if (window.AppState.chartsInited) return;
  window.AppState.chartsInited = true;

  const wCtx = document.getElementById('weightChart');
  if (wCtx) {
    new Chart(wCtx, {
      type: 'line',
      data: {
        labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
        datasets: [{
          label: 'Weight (kg)',
          data: [76.2, 76.5, 76.8, 77.1, 77.5, 77.8, 78.2, 78.5],
          borderColor: '#2D6A4F',
          backgroundColor: 'rgba(45, 106, 79, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { suggestedMin: 75, suggestedMax: 80 } }
      }
    });
  }

  const cCtx = document.getElementById('calChart');
  if (cCtx) {
    new Chart(cCtx, {
      type: 'bar',
      data: {
        labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
        datasets: [{
          label: 'Avg Calories',
          data: [2750, 2800, 2850, 2900, 2950, 3000, 3050, 3100],
          backgroundColor: '#2D6A4F'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { suggestedMin: 2500, suggestedMax: 3500 } }
      }
    });
  }
};

window.initPRs = function() {
  const container = document.getElementById('pr-list');
  if (!container) return;
  container.innerHTML = '';

  const prs = [
    { name: 'Bench Press', val: '102.5kg' },
    { name: 'Back Squat', val: '125kg' },
    { name: 'Deadlift', val: '150kg' },
    { name: '5K Run', val: '23:42' },
    { name: 'Pull-Ups', val: 'BW+20kg' }
  ];

  prs.forEach(pr => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${pr.name}</span><span class="pr-val">${pr.val}</span>`;
    container.appendChild(li);
  });
};

window.initBodyComp = function() {
  const container = document.getElementById('body-comp-grid');
  if (!container) return;
  container.innerHTML = '';

  const stats = [
    { label: 'Body Fat', val: '14.5%' },
    { label: 'Muscle Mass', val: '38.2kg' },
    { label: 'Visceral Fat', val: '6' },
    { label: 'Water', val: '58%' }
  ];

  stats.forEach(s => {
    const div = document.createElement('div');
    div.className = 'bc-item';
    div.innerHTML = `<span class="bc-label">${s.label}</span><span class="bc-val">${s.val}</span>`;
    container.appendChild(div);
  });
};

window.logWeight = function() {
  const w = prompt('Enter today\\'s weight in kg:');
  if (w === null) return;
  const num = parseFloat(w);
  if (isNaN(num)) {
    window.showToast('Please enter a valid number.');
  } else {
    window.showToast(`Successfully logged ${num}kg!`);
  }
};
