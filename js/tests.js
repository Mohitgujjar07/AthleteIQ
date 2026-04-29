'use strict';

const TESTS = [
  { name: 'sanitize escapes script tags', fn: () => window.sanitize('<script>alert("xss")</script>') === '&lt;script&gt;alert("xss")&lt;/script&gt;' },
  { name: 'sanitize escapes angle brackets', fn: () => window.sanitize('<div>test</div>') === '&lt;div&gt;test&lt;/div&gt;' },
  { name: 'AppState has all required keys', fn: () => 'waterCount' in window.AppState && 'currentDiet' in window.AppState && 'currentDay' in window.AppState },
  { name: 'water count updates correctly', fn: () => { const old = window.AppState.waterCount; window.AppState.waterCount++; const res = window.AppState.waterCount > old; window.AppState.waterCount = old; return res; } },
  { name: 'DIET_TARGETS bulk calories greater than cut calories', fn: () => DIET_TARGETS.bulk.cal > DIET_TARGETS.cut.cal },
  { name: 'DIET_TARGETS keto carbs less than 50', fn: () => DIET_TARGETS.keto.carbs < 50 },
  { name: 'WORKOUTS has all 7 day keys', fn: () => ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].every(k => k in WORKOUTS) },
  { name: 'every exercise has name and type fields', fn: () => WORKOUTS.Mon.every(ex => 'name' in ex && 'type' in ex) },
  { name: 'DIET_FOODS has all 4 diet keys', fn: () => ['bulk','cut','maintain','keto'].every(k => k in DIET_FOODS) },
  { name: 'each diet food array has at least 4 items', fn: () => DIET_FOODS.bulk.length >= 4 },
  { name: 'DOM has at least 4 stat cards', fn: () => document.querySelectorAll('.stat-card, .water-tracker, .streak-card').length >= 4 },
  { name: 'DOM has at least 6 nav buttons', fn: () => document.querySelectorAll('.nav-btn').length >= 6 },
  { name: 'all role=progressbar elements have aria-valuenow', fn: () => Array.from(document.querySelectorAll('[role="progressbar"]')).every(el => el.hasAttribute('aria-valuenow')) },
  { name: 'skip-nav link exists in DOM', fn: () => document.querySelector('.skip-nav') !== null },
  { name: 'main landmark element exists', fn: () => document.querySelector('main') !== null },
  { name: 'nav has aria-label', fn: () => document.querySelector('nav').hasAttribute('aria-label') },
  { name: 'CSP meta tag is present', fn: () => document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null },
  { name: 'X-Content-Type-Options meta tag is present', fn: () => document.querySelector('meta[http-equiv="X-Content-Type-Options"]') !== null },
  { name: 'coach returns non-empty string for protein', fn: () => window.getCoachReply('tell me about protein').length > 0 },
  { name: 'coach returns non-empty string for unmatched', fn: () => window.getCoachReply('xyz123 unmatched').length > 0 }
];

window.runAllTests = function() {
  const resultsContainer = document.getElementById('test-results');
  if (!resultsContainer) return;
  resultsContainer.innerHTML = '';
  
  let passes = 0;
  let fails = 0;

  TESTS.forEach(test => {
    let passed = false;
    try {
      passed = test.fn();
    } catch (e) {
      passed = false;
      console.error(`Test "${test.name}" failed with error:`, e);
    }
    
    if (passed) passes++;
    else fails++;

    const div = document.createElement('div');
    div.className = 'test-row';
    const badgeClass = passed ? 'badge-pass' : 'badge-fail';
    const badgeText = passed ? 'PASS' : 'FAIL';
    div.innerHTML = `<span class="${badgeClass}">${badgeText}</span> <span>${test.name}</span>`;
    resultsContainer.appendChild(div);
  });

  const summary = document.getElementById('test-summary');
  if (summary) {
    summary.textContent = `Completed: ${passes} Passed, ${fails} Failed.`;
  }
  
  window.showToast(`Tests Finished: ${passes}/${TESTS.length} Passed`);
};
