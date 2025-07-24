document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Simple Validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Show confirmation
  document.getElementById("confirmation").classList.remove("hidden");

  // Optionally, reset the form
  document.getElementById("contactForm").reset();
});
