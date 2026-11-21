
// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav_links");

menuToggle.addEventListener("click", function() {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

function closeMenu() {
  navLinks.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

document.querySelectorAll(".nav_links a").forEach(function(link) {
  link.addEventListener("click", closeMenu);
});

// CONTACT FORM POPUP


const openFormButtons = document.querySelectorAll(".open-form-btn");
const closeForm = document.getElementById("closeForm");
const formOverlay = document.getElementById("formOverlay");
const projectSelect = document.getElementById("project");

openFormButtons.forEach(function(button) {
  button.addEventListener("click", function() {

    const packageName = button.dataset.package;

    projectSelect.value = packageName || "";

    formOverlay.classList.add("active");
  });
});

closeForm.addEventListener("click", function() {
  formOverlay.classList.remove("active");
});

formOverlay.addEventListener("click", function(event) {
  if (event.target === formOverlay) {
    formOverlay.classList.remove("active");
  }
});


// CONTACT FORM SUBMISSION


const enquiryForm = document.querySelector(".contact-form");
const formSuccess = document.getElementById("formSuccess");
const submitButton = enquiryForm.querySelector('button[type="submit"]');

enquiryForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  // Prevent multiple submissions
  if (submitButton.disabled) return;

  submitButton.disabled = true;
  submitButton.textContent = "Sending Enquiry...";

  const formData = new FormData(enquiryForm);

  try {
    const response = await fetch(enquiryForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      enquiryForm.reset();

      formOverlay.classList.remove("active");

      formSuccess.hidden = false;

      // Show success message
      
formSuccess.hidden = false;

setTimeout(function() {
  formSuccess.hidden = true;
}, 4000);
    } else {
      alert("Something went wrong. Please try again.");
    }

  } catch (error) {
    alert("Unable to send your enquiry. Please check your internet connection.");

  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Enquiry";
  }
});
