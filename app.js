// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Fetch menu items
async function loadMenu() {
  const menuDiv = document.getElementById("menu");
  const querySnapshot = await getDocs(collection(db, "menu"));
  menuDiv.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const item = doc.data();
    menuDiv.innerHTML += `
      <div class="menu-item">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <input type="number" id="qty-${doc.id}" placeholder="Qty" min="1" />
      </div>
    `;
  });
}

// Place order
document.getElementById("placeOrderBtn").addEventListener("click", async () => {
  const querySnapshot = await getDocs(collection(db, "menu"));
  const orders = [];
  querySnapshot.forEach((doc) => {
    const qty = document.getElementById(`qty-${doc.id}`).value;
    if (qty > 0) {
      orders.push({ name: doc.data().name, qty, price: doc.data().price });
    }
  });
  if (orders.length === 0) return alert("Please select at least one item!");
  await addDoc(collection(db, "orders"), { orders, time: new Date() });
  document.getElementById("statusMsg").innerText = "✅ Order placed successfully!";
});

loadMenu();
