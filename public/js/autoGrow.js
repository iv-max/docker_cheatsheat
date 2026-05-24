function autoGrow(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

const autoGrowFields = document.querySelectorAll(".auto-grow");

autoGrowFields.forEach((field) => {
  autoGrow(field);

  field.addEventListener("input", () => {
    autoGrow(field);
  });
});
