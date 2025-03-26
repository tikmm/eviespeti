document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const modal = document.getElementById("thankYouModal");
  const closeBtn = document.querySelector(".close");

  // Ellenőrizzük, hogy a szükséges elemek léteznek-e
  if (!form || !modal || !closeBtn) {
    console.error("A szükséges elemek nem találhatóak az oldalon.");
    return; // Ha valami hiányzik, nem futtatjuk tovább a kódot
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Megakadályozza az alapértelmezett form elküldést

    const formData = new FormData(this);

    // Kérjük, győződj meg arról, hogy az action URL helyes és a megfelelő Formspree URL-t tartalmazza
    console.log("Form action URL:", this.action);

    fetch(this.action, {
      method: "POST", // POST metódus
      body: formData,
    })
      .then((response) => {
        console.log("Response:", response); // A válasz naplózása
        if (response.ok) {
          // Modális ablak megjelenítése
          modal.style.display = "block";
          this.reset(); // Opció: form kiürítése sikeres beküldés után

          // Automatikusan bezárja a modal-t 3 másodperc után
          setTimeout(() => {
            modal.style.display = "none";
          }, 3000);
        } else {
          return response.text().then((text) => {
            throw new Error(text); // Ha nem ok, hibát dobunk
          });
        }
      })
      .catch((error) => {
        console.error("Hiba:", error); // Hibák részletes naplózása
        alert("Hiba történt, próbáld újra. Részletek: " + error.message);
      });
  });

  // Modális ablak bezárása
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Ha a felhasználó a modal külsejére kattint, zárja be
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
