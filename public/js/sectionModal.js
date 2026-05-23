// console.log("sectionModal loaded");

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
