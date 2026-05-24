const editModal = document.getElementById("editModal");

const editForm = document.getElementById("editForm");

const editModalTitle = document.getElementById("editModalTitle");

const editIdInput = document.getElementById("editIdInput");

const editTitleInput = document.getElementById("editTitleInput");

const editDescriptionInput = document.getElementById("editDescriptionInput");

const editButtons = document.querySelectorAll(".edit-button");

editButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const editType = button.dataset.editType;

    if (editType === "section") {
      editModalTitle.textContent = "Edit Section";
      editForm.action = "/edit-section";

      editIdInput.value = button.dataset.sectionId;
      editTitleInput.value = button.dataset.sectionTitle;
      editDescriptionInput.value = button.dataset.sectionDescription;
    }

    if (editType === "command") {
      editModalTitle.textContent = "Edit Command";
      editForm.action = "/edit-command";

      editIdInput.value = button.dataset.commandId;
      editTitleInput.value = button.dataset.commandText;
      editDescriptionInput.value = button.dataset.commandDescription;
    }

    editModal.classList.remove("hidden");
  });
});

editModal.addEventListener("click", (event) => {
  if (event.target === editModal) {
    editModal.classList.add("hidden");
  }
});
