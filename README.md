# AthleteIQ

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Maps](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

AthleteIQ is a complete, production-ready Fitness & Food Coach web application targeted at athletes and gym-goers. It features a fully responsive, modern design with an intelligent local rule-based AI Coach, progress tracking, and nutrition planning—all without requiring any paid external APIs.

## Features

- **Dashboard**: Track daily calories, protein, sleep, water intake, and your workout streak.
- **Workout Plan**: Detailed daily workout routines with exercises, sets, reps, and descriptions for a full week.
- **Nutrition Coach**: Diet-specific food recommendations (Bulking, Cutting, Maintenance, Keto) with daily targets and a 3-day meal plan.
- **Progress Tracker**: Visualize weight history and calorie intake over 8 weeks using interactive charts. Track personal records and body composition.
- **AI Coach**: A local, rule-based AI chat interface that answers fitness and nutrition questions instantly without external API calls.
- **Nearby Gyms**: Find local gyms using a free Google Maps embed, complete with distance, ratings, and operating hours.
- **App Tests**: A built-in test suite to verify application logic, state, DOM structure, and security.

## Tech Stack

| Technology | Usage |
| --- | --- |
| HTML5 | Semantic structure and accessibility (ARIA) |
| CSS3 | Custom properties, responsive grid/flexbox, modern UI |
| Vanilla JS | Application logic, state management, XSS sanitization |
| Chart.js | Interactive progress and calorie charts |
| Firebase Firestore | (Configured) For saving workout, meal, and weight logs |
| Google Maps | Free iframe embed for displaying nearby gyms |
| Docker & Nginx | Containerized deployment serving static files |

## Prerequisites

- Git
- Docker Desktop (optional, for running via Docker)
- A modern web browser
- A free Firebase account (Spark plan) for database features

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd athleteiq
   ```

2. **Configure Firebase:**
   Open `firebase/firebase-config.js` and replace the placeholder values with your free Firebase project config from the [Firebase Console](https://console.firebase.google.com).

3. **Run Locally:**
   You can serve the application locally using `serve`:
   ```bash
   npm install
   npm run start
   ```
   Or run it using Docker:
   ```bash
   docker-compose up
   ```

4. **Access the App:**
   Open `http://localhost:8080` (or `http://localhost:3000` if using `serve`) in your browser.

## Project Structure

```text
athleteiq/
├── index.html                 # Main Single Page Application shell
├── css/
│   └── styles.css             # Design tokens, layouts, and animations
├── js/
│   ├── app.js                 # Global state, routing, and XSS sanitization
│   ├── dashboard.js           # Water tracking and streak logic
│   ├── workout.js             # Daily workout routines and logging
│   ├── nutrition.js           # Diet plans and nutrition targets
│   ├── progress.js            # Chart.js integration and PR lists
│   ├── coach.js               # Rule-based local AI chatbot logic
│   ├── maps.js                # Google Maps integration
│   └── tests.js               # Integrated system verification tests
├── firebase/
│   ├── firebase-config.js     # Firebase initialization and DB functions
│   └── firestore-rules.txt    # Firestore security rules
├── Dockerfile                 # Docker build instructions (nginx:alpine)
├── docker-compose.yml         # Docker Compose service definition
├── .dockerignore              # Files to exclude from Docker build
├── .gitignore                 # Files to exclude from Git
├── README.md                  # Project documentation
└── package.json               # NPM scripts and dependencies
```

## Hackathon Criteria Coverage

| Criterion | Implementation |
| --- | --- |
| **Complete Functionality** | 7 functional pages including Dashboard, Workouts, Nutrition, Progress, AI Coach, Gyms, and Tests. |
| **Modern Design** | Premium aesthetic using `Plus Jakarta Sans`, cohesive color palette (`#2D6A4F` accents), glass-like cards, and smooth CSS transitions. |
| **No API Keys Required** | The AI Coach uses entirely local rule-based logic. No Anthropic, OpenAI, or paid APIs are used. Google Maps uses a free embed iframe. |
| **Offline/Local Capability**| Core features, UI, and the AI coach work entirely locally. |
| **Security & Accessibility** | Strict Content-Security-Policy (CSP) meta tags, XSS sanitization (`sanitize()` function), full ARIA attributes, and skip-navigation links. |
| **Deployment Ready** | Includes Dockerfile, docker-compose.yml, and package.json scripts for instant local or cloud deployment. |

## Google Cloud Run Deployment

To deploy this application to Google Cloud Run, ensure you have the Google Cloud SDK installed and authenticated. Then run the following command (also available as `npm run deploy`):

```bash
gcloud run deploy athleteiq --source . --platform managed --region asia-south1 --allow-unauthenticated
```

## No API Keys Required

**Important Note:** The "AI Coach" feature in this application runs entirely on local, rule-based keyword matching logic (`js/coach.js`). It does not make any external HTTP requests, requires no API keys, and incurs zero cost. The Google Maps embed is also a free-tier iframe that requires no API key.

## Firebase Setup

To enable the database logging features (saving workouts, meals, weights):
1. Go to [console.firebase.google.com](https://console.firebase.google.com).
2. Create a new project (the free Spark plan is sufficient).
3. Add a Web App to the project and copy the config object.
4. Paste the config into `firebase/firebase-config.js`.
5. Enable Firestore Database and apply the rules found in `firebase/firestore-rules.txt`.

## License

This project is licensed under the MIT License.
