# AthleteIQ

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**AthleteIQ** is a polished fitness and nutrition command center for athletes, gym-goers, and disciplined beginners who want more than a generic calorie app. It combines training structure, macro guidance, progress visualization, hydration tracking, local AI-style coaching, and optional Firebase persistence inside one responsive single-page experience.

This project is built to feel like a real product, not a classroom demo:

- a premium dashboard with meaningful performance metrics
- a complete weekly training split with exercise cards and completion actions
- four nutrition modes with tailored foods and macro targets
- progress analytics through visual charts and PR tracking
- a local rule-based AI coach with zero paid API cost
- optional Firestore logging for workouts, meals, and body-weight data
- Docker and cloud-deployment paths for easy shipping

## Table of Contents

- [Why This Project Feels Strong](#why-this-project-feels-strong)
- [At a Glance](#at-a-glance)
- [Feature Tour](#feature-tour)
- [User Experience Flow](#user-experience-flow)
- [Technology Stack](#technology-stack)
- [Architecture Snapshot](#architecture-snapshot)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Running with Docker](#running-with-docker)
- [Deployment](#deployment)
- [Security and Accessibility](#security-and-accessibility)
- [Testing](#testing)
- [Extension Ideas](#extension-ideas)
- [License](#license)

## Why This Project Feels Strong

AthleteIQ stands out because it does not stop at surface-level UI. It combines product thinking, technical clarity, and portfolio-friendly execution:

- it solves a complete use case rather than showcasing isolated widgets
- it offers both training and nutrition planning in one flow
- it includes a coaching assistant that works without third-party AI billing
- it is readable and hackable because the code is organized into focused modules
- it is easy to demo locally and easy to deploy when you are ready to ship it

This makes AthleteIQ a strong fit for:

- hackathon submissions
- frontend portfolios
- fitness-tech prototypes
- student capstones
- startup MVP exploration

## At a Glance

| Category | What AthleteIQ Delivers |
| --- | --- |
| Product Type | Fitness and nutrition coaching dashboard |
| Audience | Athletes, gym-goers, beginners focused on strength, body composition, and consistency |
| App Style | Responsive single-page application |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Charts | Chart.js |
| Data Layer | Optional Firebase Firestore |
| AI Layer | Local rule-based coach |
| Deployment Options | Local server, Docker, Google Cloud Run |
| Cost Profile | Core experience works without paid APIs |

## Feature Tour

### 1. Dashboard That Feels Useful

The dashboard is designed to answer the user's first question every day: "How am I doing right now?"

It surfaces:

- calories consumed today
- protein intake
- weekly workout completion
- body weight snapshot
- macro progress visualization
- planned meals
- hydration tracking
- sleep status
- current workout streak

Instead of presenting static numbers only, the UI turns these into a more motivating summary that feels like a real athlete workspace.

### 2. Weekly Workout Planner

AthleteIQ includes a seven-day training structure with a clear split:

- Monday: chest plus HIIT
- Tuesday: back plus rowing
- Wednesday: legs plus stair work
- Thursday: running, cycling, core, and mobility
- Friday: shoulders and jump rope
- Saturday: arms and active recovery
- Sunday: stretching and meditation

Each workout card contains:

- movement name
- training type
- sets and reps
- rest guidance
- short exercise description
- a completion toggle for quick interaction

This gives the app more depth than a basic "to-do list for workouts."

### 3. Nutrition Planning by Goal

The nutrition module supports four distinct modes:

- `bulk`
- `cut`
- `maintain`
- `keto`

For each goal, the app provides:

- recommended foods
- simple macro-oriented tags
- calorie targets
- protein targets
- carbohydrate targets
- fat targets
- daily water goals
- meal-planning UI

Because the data is defined clearly in JavaScript, it is easy to adjust the plans for different athlete profiles later.

### 4. Progress and Performance Visibility

The progress module turns the experience from static planning into actual feedback.

It includes:

- body-weight charting
- calorie trend charting
- personal records section
- body-composition overview

This makes the app feel more like a fitness product and less like a brochure page.

### 5. Local AI Coach

One of AthleteIQ's most practical strengths is the coaching assistant. It responds to common questions around:

- pre-workout meals
- post-workout recovery
- protein intake
- bulking strategy
- cutting strategy
- squat, bench, and deadlift tips
- cardio basics
- sleep and recovery
- supplements
- creatine

Why this matters:

- no external AI provider is required
- no API key is needed for the core chat experience
- no billing risk exists for demos or portfolio use
- responses are fast and predictable

It is a smart product choice for an MVP because it demonstrates coaching behavior without introducing infrastructure overhead.

### 6. Nearby Gyms Section

AthleteIQ embeds Google Maps for a practical "nearby gyms" experience, helping users move from planning to action without leaving the app context.

### 7. Optional Firebase Data Logging

If Firebase is configured, the app can persist:

- workout logs
- meal logs
- body-weight entries
- progress history retrieval

This keeps the default project lightweight while still giving you a clean path toward a more complete app.

## User Experience Flow

AthleteIQ is organized like a guided user journey:

1. the user lands on a dashboard with immediate performance context
2. they review today's plan and macro status
3. they move into workouts or nutrition depending on their goal
4. they log or track progress over time
5. they ask the coach for specific fitness guidance when needed
6. they use charts and records to stay motivated

The flow feels practical because every section supports the same health-performance loop:

**plan -> perform -> track -> recover -> improve**

## Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Markup | HTML5 | Semantic single-page structure |
| Styling | CSS3 | Layout, design tokens, responsiveness, and transitions |
| Frontend logic | Vanilla JavaScript | Rendering, state, navigation, interactions |
| Charts | Chart.js | Weight and calorie visualizations |
| Persistence | Firebase Firestore | Optional cloud logging and history |
| Maps | Google Maps embed | Gym discovery |
| Local serving | `serve` | Development server |
| Container runtime | Docker + Nginx | Static hosting setup |
| Cloud deployment | Google Cloud Run | Fast deployment option |

## Architecture Snapshot

The app follows a simple, clear structure that is easy to understand and extend:

```text
Browser
  -> index.html loads the app shell
  -> css/styles.css provides the visual system
  -> js/app.js initializes shared UI behavior
  -> feature modules render workouts, nutrition, charts, maps, and coach logic
  -> firebase/firebase-config.js enables optional persistence
```

### Initialization Flow

On load, the app:

1. shows a loading state
2. initializes hydration tracking
3. initializes streak UI
4. loads the default workout day
5. loads default food recommendations
6. loads nutrient targets
7. renders meal-plan content
8. renders progress charts
9. renders PR and body-composition sections
10. runs the built-in test suite

This is a nice architecture for a portfolio project because it is direct, readable, and easy to demo.

## Project Structure

```text
athleteiq/
|-- index.html
|-- package.json
|-- Dockerfile
|-- docker-compose.yml
|-- .gitignore
|-- .dockerignore
|-- README.md
|-- css/
|   `-- styles.css
|-- js/
|   |-- app.js
|   |-- coach.js
|   |-- dashboard.js
|   |-- maps.js
|   |-- nutrition.js
|   |-- progress.js
|   |-- tests.js
|   `-- workout.js
`-- firebase/
    |-- firebase-config.js
    `-- firestore-rules.txt
```

### What Each File Does

- `index.html`
  Defines the SPA shell, page sections, semantic layout, script imports, and base accessibility structure.

- `css/styles.css`
  Contains the complete visual language for the app including spacing, typography, cards, grids, badges, and responsive behavior.

- `js/app.js`
  Handles shared app initialization, page navigation, workout rendering, hydration logic, streak logic, and UI helper actions.

- `js/coach.js`
  Powers the local rule-based coach and message-response handling.

- `js/dashboard.js`
  Supports dashboard behavior and related rendering.

- `js/workout.js`
  Encapsulates workout-specific logic and data interactions.

- `js/nutrition.js`
  Controls diet views, food recommendations, and macro target presentation.

- `js/progress.js`
  Handles progress visualization and related chart sections.

- `js/tests.js`
  Runs browser-based checks for sanitization, state shape, DOM presence, accessibility markers, and coach response behavior.

- `firebase/firebase-config.js`
  Initializes Firebase and provides helper functions for saving and reading user fitness data.

## Getting Started

### Prerequisites

Make sure you have:

- Git
- Node.js and npm
- a modern browser
- Docker Desktop if you want container-based local usage
- a Firebase project only if you want persistence

### Run Locally with a Dev Server

```bash
git clone https://github.com/Mohitgujjar07/AthleteIQ.git
cd AthleteIQ
npm install
npm run start
```

Then open:

```text
http://localhost:3000
```

### Run with Docker Compose

```bash
docker-compose up --build
```

Then open:

```text
http://localhost:8080
```

### Development Note

Because the project relies on browser modules and frontend runtime behavior, serving it through a local server is the best way to test it properly. Avoid relying on direct file opening for serious verification.

## Firebase Setup

Firebase is optional, but if you want real data persistence:

1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Use the Spark plan.
3. Add a web app inside the project.
4. Copy the generated configuration values.
5. Open `firebase/firebase-config.js`.
6. Replace the placeholder config:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

7. Enable Firestore Database.
8. Apply the rules from `firebase/firestore-rules.txt`.

### Firestore Helpers Already Included

The repository includes helper functions for:

- `saveWorkoutLog(day, exercises)`
- `saveMealLog(date, meals)`
- `saveWeightEntry(date, weight)`
- `getProgressHistory()`

## Running with Docker

The container setup is intentionally straightforward:

- base image: `nginx:alpine`
- static files copied into the Nginx web root
- exposed app port: `80`
- compose host mapping: `8080:80`

Manual commands:

```bash
docker build -t athleteiq .
docker run -p 8080:80 athleteiq
```

## Deployment

### Google Cloud Run

The repository already includes a deploy script in `package.json`:

```bash
npm run deploy
```

That script runs:

```bash
gcloud run deploy athleteiq --source . --platform managed --region asia-south1 --allow-unauthenticated
```

This gives the project a clear path from local demo to hosted application with very little setup friction.

## Security and Accessibility

AthleteIQ includes several thoughtful quality signals that make it more credible as a real product build.

### Security Highlights

- Content Security Policy is declared in `index.html`
- the coaching experience does not rely on external paid AI secrets
- sanitization behavior is checked in the test suite
- Firebase integration is isolated instead of mixed directly into unrelated UI code

### Accessibility Highlights

- skip-to-content navigation
- ARIA labels on interactive controls
- progress bars with `aria-valuenow`
- semantic main content landmark
- button-based interaction for clickable controls like hydration tracking

## Testing

The project includes an in-browser test layer for important expectations such as:

- sanitization of angle brackets and script tags
- required app state keys
- expected workout and diet data structure
- DOM presence for major UI sections
- accessibility markers
- coach response behavior

Run the provided command:

```bash
npm test
```

Current behavior:

- the command reminds you to open the app in the browser
- the browser-side suite performs the interactive checks

## Extension Ideas

If you want to level the project up even more, strong next steps would be:

- user authentication with Firebase Auth
- editable athlete profiles instead of fixed demo content
- localStorage fallback when Firebase is not configured
- richer analytics for training consistency and recovery
- expanded nutrition planning with calories per meal
- custom chart ranges and filtering
- better logging flows for completed workouts
- a more advanced retrieval or LLM-backed coach later
- screenshot assets or demo GIFs inside the README for even stronger presentation

## License

This project is licensed under the MIT License.
