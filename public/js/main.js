

const openButton = document.getElementById("openModalButton");

const modal = document.getElementById("modal");

openButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

const commandModal = document.getElementById("commandModal");

const sectionIdInput = document.getElementById("sectionIdInput");

const addCommandButtons = document.querySelectorAll(".add-command-area");

addCommandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.dataset.sectionId;

    sectionIdInput.value = sectionId;

    commandModal.classList.remove("hidden");
  });
});

commandModal.addEventListener("click", (event) => {
  if (event.target === commandModal) {
    commandModal.classList.add("hidden");
  }
});