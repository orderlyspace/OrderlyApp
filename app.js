import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBioov0N0XC9oc6nP0gSr-fVZPqABUA7vw",
  authDomain: "orderlylive-616b2.firebaseapp.com",
  projectId: "orderlylive-616b2",
  storageBucket: "orderlylive-616b2.firebasestorage.app",
  messagingSenderId: "472492158971",
  appId: "1:472492158971:web:73dbf1490f3771af47255e",
  measurementId: "G-1QWMJD3GPB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const restaurantId = "urbanEatery"; // must match Firestore document name

async function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "<p>Loading menu...</p>";

  try {
    const menuRef = collection(db, `restaurants/${restaurantId}/menu`);
    const snapshot = await getDocs(menuRef);
    
    menuDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const item = doc.data();
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("menu-item");
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      `;
      menuDiv.appendChild(itemDiv);
    });

    if (snapshot.empty) {
      menuDiv.innerHTML = "<p>No menu items found.</p>";
    }
  } catch (err) {
    console.error(err);
    menuDiv.innerHTML = "<p>Error loading menu.</p>";
  }
}

loadMenu();

import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const orderButton = document.querySelector("button");
  const menuItems = document.querySelectorAll(".menu-item"); // adjust if your HTML differs

  orderButton.addEventListener("click", async () => {
    try {
      // Collect selected items — for now, hardcoded since only 1 item (you’ll expand later)
      const orderData = {
        restaurant: "urbanEatery",
        tableID: "T1",
        items: [{ name: "Burger", price: 120 }],
        total: 120,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);
      alert("✅ Order placed successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("❌ Failed to place order");
    }
  });
});
