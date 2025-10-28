// ===== Import Firebase =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ===== Your Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyBioov0N0XC9oc6nP0gSr-fVZPqABUA7vw",
  authDomain: "orderlylive-616b2.firebaseapp.com",
  projectId: "orderlylive-616b2",
  storageBucket: "orderlylive-616b2.firebasestorage.app",
  messagingSenderId: "472492158971",
  appId: "1:472492158971:web:73dbf1490f3771af47255e",
  measurementId: "G-1QWMJD3GPB"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== Load Menu Function =====
async function loadMenu() {
  try {
    const menuRef = collection(db, "restaurants/urbanEatery/menu");
    const querySnapshot = await getDocs(menuRef);
    const menuContainer = document.getElementById("menuList");

    menuContainer.innerHTML = ""; // clear old menu

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      const div = document.createElement("div");
      div.style.marginBottom = "10px";
      div.style.padding = "8px";
      div.style.borderBottom = "1px solid #ddd";
      div.innerHTML = `
        <strong>${item.name}</strong> - ₹${item.price}
      `;
      menuContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading menu:", error);
  }
}

// ===== Run on Page Load =====
window.addEventListener("load", loadMenu);
