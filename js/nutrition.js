'use strict';

const DIET_FOODS = {
  bulk: [
    { emoji: '🥩', name: 'Steak', macro: '25g P / 0g C / 15g F', tagClass: 'tag-high-protein', tagLabel: 'High Protein' },
    { emoji: '🍚', name: 'White Rice', macro: '3g P / 45g C / 0g F', tagClass: 'tag-carb', tagLabel: 'Carbs' },
    { emoji: '🥜', name: 'Peanut Butter', macro: '8g P / 6g C / 16g F', tagClass: 'tag-fat', tagLabel: 'Fats' },
    { emoji: '🥑', name: 'Avocado', macro: '2g P / 9g C / 15g F', tagClass: 'tag-fat', tagLabel: 'Fats' },
    { emoji: '🥔', name: 'Sweet Potato', macro: '2g P / 20g C / 0g F', tagClass: 'tag-carb', tagLabel: 'Carbs' },
    { emoji: '🥛', name: 'Whole Milk', macro: '8g P / 12g C / 8g F', tagClass: 'tag-high-protein', tagLabel: 'Balanced' }
  ],
  cut: [
    { emoji: '🍗', name: 'Chicken Breast', macro: '31g P / 0g C / 3g F', tagClass: 'tag-high-protein', tagLabel: 'High Protein' },
    { emoji: '🥦', name: 'Broccoli', macro: '3g P / 6g C / 0g F', tagClass: 'tag-carb', tagLabel: 'Low Cal' },
    { emoji: '🐟', name: 'White Fish', macro: '20g P / 0g C / 1g F', tagClass: 'tag-high-protein', tagLabel: 'High Protein' },
    { emoji: '🥚', name: 'Egg Whites', macro: '11g P / 0g C / 0g F', tagClass: 'tag-high-protein', tagLabel: 'High Protein' },
    { emoji: '🥗', name: 'Spinach', macro: '3g P / 4g C / 0g F', tagClass: 'tag-carb', tagLabel: 'Low Cal' },
    { emoji: '🫐', name: 'Blueberries', macro: '1g P / 14g C / 0g F', tagClass: 'tag-carb', tagLabel: 'Antioxidants' }
  ],
  maintain: [
    { emoji: '🍗', name: 'Chicken Thighs', macro: '24g P / 0g C / 8g F', tagClass: 'tag-high-protein', tagLabel: 'High Protein' },
    { emoji: '🍚', name: 'Brown Rice', macro: '3g P / 23g C / 1g F', tagClass: 'tag-carb', tagLabel: 'Complex Carbs' },
    { emoji: '🥚', name: 'Whole Eggs', macro: '6g P / 0g C / 5g F', tagClass: 'tag-high-protein', tagLabel: 'Balanced' },
    { emoji: '🍞', name: 'Whole Wheat Bread', macro: '4g P / 12g C / 1g F', tagClass: 'tag-carb', tagLabel: 'Carbs' },
    { emoji: '🍎', name: 'Apple', macro: '0g P / 25g C / 0g F', tagClass: 'tag-carb', tagLabel: 'Fiber' },
    { emoji: '🧀', name: 'Cheese', macro: '7g P / 1g C / 9g F', tagClass: 'tag-fat', tagLabel: 'Fats' }
  ],
  keto: [
    { emoji: '🥓', name: 'Bacon', macro: '12g P / 0g C / 42g F', tagClass: 'tag-keto', tagLabel: 'Keto' },
    { emoji: '🥑', name: 'Avocado', macro: '2g P / 9g C / 15g F', tagClass: 'tag-fat', tagLabel: 'Fats' },
    { emoji: '🧀', name: 'Cheddar Cheese', macro: '7g P / 1g C / 9g F', tagClass: 'tag-fat', tagLabel: 'Fats' },
    { emoji: '🐟', name: 'Salmon', macro: '20g P / 0g C / 13g F', tagClass: 'tag-high-protein', tagLabel: 'High Protein' },
    { emoji: '🥩', name: 'Ribeye Steak', macro: '24g P / 0g C / 20g F', tagClass: 'tag-keto', tagLabel: 'Keto' },
    { emoji: '🥥', name: 'Coconut Oil', macro: '0g P / 0g C / 14g F', tagClass: 'tag-fat', tagLabel: 'Pure Fat' }
  ]
};

const DIET_TARGETS = {
  bulk: { cal: 3200, protein: 180, carbs: 400, fat: 90, water: 4000 },
  cut: { cal: 2100, protein: 180, carbs: 150, fat: 70, water: 4000 },
  maintain: { cal: 2600, protein: 160, carbs: 250, fat: 80, water: 3500 },
  keto: { cal: 2500, protein: 140, carbs: 30, fat: 180, water: 4000 }
};

window.initFoodRecs = function(diet) {
  const container = document.getElementById('food-rec-list');
  if (!container) return;
  container.innerHTML = '';

  const foods = DIET_FOODS[diet];
  if (!foods) return;

  foods.forEach(f => {
    const safeEmoji = window.sanitize(f.emoji);
    const safeName = window.sanitize(f.name);
    const safeMacro = window.sanitize(f.macro);
    const safeTagClass = window.sanitize(f.tagClass);
    const safeTagLabel = window.sanitize(f.tagLabel);

    const div = document.createElement('div');
    div.className = 'food-card';
    div.innerHTML = `
      <span class="food-emoji" aria-hidden="true">${safeEmoji}</span>
      <div class="food-info">
        <h3 class="food-name">${safeName}</h3>
        <span class="food-macro">${safeMacro}</span>
      </div>
      <span class="food-tag ${safeTagClass}">${safeTagLabel}</span>
    `;
    container.appendChild(div);
  });
};

window.initNutriTargets = function(diet) {
  const container = document.getElementById('nutri-targets');
  if (!container) return;
  container.innerHTML = '';

  const targets = DIET_TARGETS[diet];
  if (!targets) return;

  // Mock current progress values (e.g. 70% done for the day)
  const progressRatio = 0.7;

  const bars = [
    { name: 'Calories', current: Math.round(targets.cal * progressRatio), max: targets.cal, unit: 'kcal', fillClass: 'fill-cal' },
    { name: 'Protein', current: Math.round(targets.protein * progressRatio), max: targets.protein, unit: 'g', fillClass: 'fill-pro' },
    { name: 'Carbs', current: Math.round(targets.carbs * progressRatio), max: targets.carbs, unit: 'g', fillClass: 'fill-carb' },
    { name: 'Fat', current: Math.round(targets.fat * progressRatio), max: targets.fat, unit: 'g', fillClass: 'fill-fat' },
    { name: 'Water', current: Math.round(targets.water * progressRatio), max: targets.water, unit: 'ml', fillClass: 'fill-water' }
  ];

  bars.forEach(b => {
    const pct = Math.min(100, Math.round((b.current / b.max) * 100));
    const div = document.createElement('div');
    div.className = 'progress-bar-container';
    div.innerHTML = `
      <div class="progress-label">
        <span>${b.name}</span>
        <span>${b.current} / ${b.max}${b.unit}</span>
      </div>
      <div class="progress-track" role="progressbar" aria-valuenow="${b.current}" aria-valuemin="0" aria-valuemax="${b.max}">
        <div class="progress-fill ${b.fillClass}" style="width: ${pct}%"></div>
      </div>
    `;
    container.appendChild(div);
  });
};

window.initMealPlan = function() {
  const container = document.getElementById('meal-plan-grid');
  if (!container) return;
  container.innerHTML = '';

  const plans = [
    {
      day: 'Monday',
      meals: [
        { type: 'Breakfast', desc: '4 Scrambled Eggs, 2 slices Whole Wheat Toast, 1 Apple' },
        { type: 'Lunch', desc: 'Grilled Chicken Breast (200g), White Rice (150g), Broccoli' },
        { type: 'Dinner', desc: 'Salmon (150g), Sweet Potato (200g), Asparagus' }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { type: 'Breakfast', desc: 'Oatmeal (80g) with Whey Protein and Berries' },
        { type: 'Lunch', desc: 'Lean Ground Beef (200g), Pasta (100g), Tomato Sauce' },
        { type: 'Dinner', desc: 'Chicken Thighs (200g), Mixed Salad with Olive Oil' }
      ]
    },
    {
      day: 'Wednesday',
      meals: [
        { type: 'Breakfast', desc: 'Greek Yogurt (250g) with Honey and Walnuts' },
        { type: 'Lunch', desc: 'Tuna Salad Wrap (2 Whole Wheat Tortillas)' },
        { type: 'Dinner', desc: 'Steak (200g), Roasted Potatoes (200g), Spinach' }
      ]
    }
  ];

  plans.forEach(p => {
    let mealsHtml = p.meals.map(m => `
      <div class="meal-item">
        <div class="meal-type">${m.type}</div>
        <div class="meal-desc">${m.desc}</div>
      </div>
    `).join('');

    const div = document.createElement('div');
    div.className = 'meal-day';
    div.innerHTML = `
      <h3>${p.day}</h3>
      ${mealsHtml}
    `;
    container.appendChild(div);
  });
};

window.setDiet = function(el, diet) {
  window.AppState.currentDiet = diet;
  const tabs = document.querySelectorAll('.diet-tab');
  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-selected', 'true');
  
  window.initFoodRecs(diet);
  window.initNutriTargets(diet);
};
