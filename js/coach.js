'use strict';

const RESPONSES = [
  { keywords: ['pre-workout', 'preworkout', 'before workout'], reply: 'For pre-workout, aim for fast-digesting carbs and a bit of protein 1-2 hours before. Think: oatmeal, a banana, or rice cakes with a protein shake.' },
  { keywords: ['post-workout', 'postworkout', 'after workout'], reply: 'Post-workout, you need protein to rebuild and carbs to replenish glycogen. A chicken and rice meal, or a whey protein shake with some fruit is perfect.' },
  { keywords: ['protein'], reply: 'Aim for 1.6-2.2g of protein per kg of body weight. Great sources are chicken breast, lean beef, eggs, greek yogurt, and whey protein.' },
  { keywords: ['bulking', 'bulk'], reply: 'To bulk effectively, eat in a 300-500 calorie surplus. Prioritize protein and complex carbs to fuel heavy workouts and build muscle.' },
  { keywords: ['cutting', 'cut', 'fat loss', 'weight loss'], reply: 'For cutting, maintain a 300-500 calorie deficit. Keep protein high to preserve muscle mass, and add some cardio to increase expenditure.' },
  { keywords: ['keto', 'ketogenic'], reply: 'Keto involves high fat, moderate protein, and very low carbs (under 50g). It forces your body to burn fat for fuel. Watch your electrolytes!' },
  { keywords: ['bench press', 'bench'], reply: 'For a strong bench: plant your feet firmly, maintain a slight arch in your lower back, squeeze your shoulder blades together, and lower the bar to your mid-chest.' },
  { keywords: ['squat', 'squats'], reply: 'Squat tips: Keep your chest up, brace your core hard, initiate by pushing your hips back slightly, and drive through your mid-foot. Break parallel if your mobility allows.' },
  { keywords: ['deadlift', 'deadlifts'], reply: 'Deadlift safely: Keep the bar directly over your mid-foot, hinge at the hips, maintain a neutral spine, and think about "pushing the floor away" rather than pulling.' },
  { keywords: ['cardio'], reply: 'Cardio is great for heart health. You can do LISS (Low Intensity Steady State) like walking, or HIIT (High Intensity Interval Training) for quicker, intense sessions.' },
  { keywords: ['muscle gain', 'build muscle'], reply: 'Muscle gain requires 3 things: a caloric surplus, progressive overload in the gym, and adequate sleep (7-9 hours) for recovery.' },
  { keywords: ['sleep', 'recovery'], reply: 'Sleep is when you grow! Aim for 7-9 hours per night. Active recovery (like walking or yoga) on rest days can also help reduce soreness.' },
  { keywords: ['hydration', 'water'], reply: 'Hydration is key for performance. Aim for at least 3-4 liters a day, especially if you are sweating a lot during workouts.' },
  { keywords: ['supplements', 'supps'], reply: 'Supplements are just supplements. Get your diet in check first. Then, look into Whey Protein, Creatine Monohydrate, and maybe a pre-workout.' },
  { keywords: ['creatine'], reply: 'Creatine Monohydrate is the most researched supplement. Take 3-5g daily. It helps with explosive power and muscle volume. No need to cycle it.' },
  { keywords: ['hiit'], reply: 'HIIT (High Intensity Interval Training) involves short bursts of max effort followed by rest. It is time-efficient but taxing on the CNS, so limit to 1-2 times a week.' },
  { keywords: ['progressive overload'], reply: 'Progressive overload means doing more over time. Add weight, add a rep, or improve your form. It is the main driver of muscle growth.' },
  { keywords: ['rest days', 'rest day'], reply: 'Rest days are crucial! Your central nervous system and muscles need time to recover. Do some light stretching, walking, and eat well.' },
  { keywords: ['motivation'], reply: 'Motivation fades, discipline remains. Remember why you started. Fall in love with the process of improving a little bit every single day.' },
  { keywords: ['hello', 'hi', 'hey'], reply: 'Hey there! I am AthleteIQ Coach. How can I help you reach your fitness goals today?' }
];

window.getCoachReply = function(message) {
  const lowerMsg = message.toLowerCase();
  for (let i = 0; i < RESPONSES.length; i++) {
    const r = RESPONSES[i];
    for (let j = 0; j < r.keywords.length; j++) {
      if (lowerMsg.includes(r.keywords[j])) {
        return r.reply;
      }
    }
  }
  return 'Great question! Focus on consistency, progressive overload, and hitting your daily protein target. Want me to cover a specific topic like bulking, cutting, or a specific lift?';
};

window.appendMsg = function(role, text) {
  const container = document.getElementById('chat-msgs');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `msg ${role === 'user' ? 'msg-user' : 'msg-bot'}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
};

window.sendChat = function() {
  const inp = document.getElementById('chat-inp');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  
  const safeText = window.sanitize(text);
  window.appendMsg('user', safeText);
  inp.value = '';

  setTimeout(() => {
    const reply = window.getCoachReply(safeText);
    window.appendMsg('bot', reply);
  }, 600);
};

window.sendPrompt = function(btn) {
  const inp = document.getElementById('chat-inp');
  if (inp) {
    inp.value = btn.textContent;
    window.sendChat();
  }
};

window.initChat = function() {
  const container = document.getElementById('chat-msgs');
  if (!container) return;
  if (container.children.length === 0) {
    window.appendMsg('bot', 'Welcome back! Ready to crush your goals? Ask me anything about training or nutrition.');
  }
};
