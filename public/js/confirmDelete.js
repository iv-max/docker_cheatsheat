// console.log("confirmDelete loaded");

const confirmModal = document.getElementById("confirmModal");

const confirmDeleteButton = document.getElementById("confirmDeleteButton");

const cancelDeleteButton = document.getElementById("cancelDeleteButton");

const confirmTitle = document.getElementById("confirmTitle");

let formToSubmit = null;

const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    formToSubmit = button.closest("form");

    const deleteType = button.dataset.deleteType;

    confirmTitle.textContent =
      deleteType === "section" ? "Delete section?" : "Delete command?";

    confirmModal.classList.remove("hidden");
  });
});

cancelDeleteButton.addEventListener("click", () => {
  confirmModal.classList.add("hidden");

  formToSubmit = null;
});

confirmDeleteButton.addEventListener("click", () => {
  if (formToSubmit) {
    formToSubmit.submit();
  }
});

confirmModal.addEventListener("click", (event) => {
  if (event.target === confirmModal) {
    confirmModal.classList.add("hidden");

    formToSubmit = null;
  }
});
