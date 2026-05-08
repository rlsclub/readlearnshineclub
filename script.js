// Enrollment form validation and success modal.
const enrollForm = document.querySelector("#enrollForm");
const modal = document.querySelector("#successModal");
const closeModal = document.querySelector(".modal-close");

const validators = {
  firstName: value => value.trim() ? "" : "Please enter your first name.",
  lastName: value => value.trim() ? "" : "Please enter your last name.",
  gender: value => value ? "" : "Please select your gender.",
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.",
  phone: value => /^[0-9+\-\s()]{7,15}$/.test(value.trim()) ? "" : "Please enter a valid phone number.",
  location: value => value.trim() ? "" : "Please enter your address or location.",
  occupation: value => value.trim() ? "" : "Please enter your occupation or designation.",
  interests: value => value.trim() ? "" : "Please tell us your areas of interest.",
  reason: value => value.trim() ? "" : "Please tell us why you want to join.",
  photo: (_value, field) => field.files.length ? "" : "Please upload a profile photo."
};

function showError(field, message) {
  const wrapper = field.closest("label");
  const error = wrapper.querySelector(".error");
  field.classList.toggle("invalid", Boolean(message));
  error.textContent = message;
}

function validateField(field) {
  const validator = validators[field.name];
  if (!validator) return true;
  const message = validator(field.value, field);
  showError(field, message);
  return !message;
}

function openModal() {
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function hideModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

if (enrollForm) {
  enrollForm.addEventListener("submit", event => {
    event.preventDefault();
    const fields = Array.from(enrollForm.elements).filter(field => field.name);
    const isValid = fields.map(validateField).every(Boolean);

    if (isValid) {
      enrollForm.reset();
      openModal();
    }
  });

  enrollForm.addEventListener("input", event => {
    if (event.target.name) validateField(event.target);
  });
}

if (closeModal) closeModal.addEventListener("click", hideModal);
if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) hideModal();
  });
}
