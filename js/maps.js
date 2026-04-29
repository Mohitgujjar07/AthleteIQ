'use strict';

window.initMap = function() {
  if (window.AppState.mapInited) return;
  window.AppState.mapInited = true;

  const iframe = document.getElementById('gmap');
  if (iframe) {
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d124424!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgyms+near+bengaluru!5e0!3m2!1sen!2sin';
  }

  const list = document.getElementById('gym-list');
  if (list) {
    const gyms = [
      { name: "Gold's Gym Koramangala", dist: '1.2km', rating: '4.6', hours: '6AM–10PM' },
      { name: "Cult.fit Indiranagar", dist: '2.1km', rating: '4.5', hours: '5AM–11PM' },
      { name: "Fitness First Brigade Road", dist: '3.4km', rating: '4.3', hours: '6AM–10PM' }
    ];

    gyms.forEach(g => {
      const card = document.createElement('div');
      card.className = 'gym-card';
      card.innerHTML = `
        <div class="gym-name">${g.name}</div>
        <div class="gym-details">
          <span>📍 ${g.dist} away</span><br>
          <span>⭐ <span class="gym-rating">${g.rating}</span> stars</span><br>
          <span>🕒 ${g.hours}</span>
        </div>
      `;
      list.appendChild(card);
    });
  }
};
