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

    // Itt küldjük el a formot a Formspree API-nak
    fetch(this.action, {
      method: this.method,
      body: formData,
    })
      .then((response) => {
        // Ha sikeres a válasz
        if (response.ok) {
          // Modális ablak megjelenítése
          modal.style.display = "block";
          this.reset(); // Opció: form kiürítése sikeres beküldés után
        } else {
          alert("Hiba történt, próbáld újra.");
        }
      })
      .catch((error) => {
        console.error("Hiba:", error);
        alert("Hiba történt, próbáld újra.");
      });
  });

  // Modális ablak bezárása
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // A modal bezárása akkor is, ha bárhol máshol kattintanak
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
