// Replace with your Firebase project config from console.firebase.google.com — free Spark plan is sufficient
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveWorkoutLog(day, exercises) {
  try {
    const docRef = await addDoc(collection(db, "workoutLogs"), {
      day: day,
      exercises: exercises,
      timestamp: serverTimestamp()
    });
    console.log("Workout logged with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export async function saveMealLog(date, meals) {
  try {
    const docRef = await addDoc(collection(db, "mealLogs"), {
      date: date,
      meals: meals,
      timestamp: serverTimestamp()
    });
    console.log("Meal logged with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export async function saveWeightEntry(date, weight) {
  try {
    const docRef = await addDoc(collection(db, "weightEntries"), {
      date: date,
      weight: weight,
      timestamp: serverTimestamp()
    });
    console.log("Weight logged with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export async function getProgressHistory() {
  try {
    const querySnapshot = await getDocs(collection(db, "weightEntries"));
    const history = [];
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });
    return history;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
}
