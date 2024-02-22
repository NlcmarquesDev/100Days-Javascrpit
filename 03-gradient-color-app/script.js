const colorInputs = document.querySelectorAll(".colors input");
const selectMenu = document.querySelector(".select-box select");
const gradientBox = document.querySelector(".gradient-box");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

const textareaField = document.querySelector("textarea");

colorInputs.forEach((color) => {
  color.addEventListener("input", () => generateGradient(false));
});
function getRandomColor() {
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${randomHex}`;
}

function generateGradient(isRandom) {
  if (isRandom) {
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value}`;
  gradientBox.style.background = gradient;

  textareaField.value = `background: ${gradient}`;
}

function copyCode() {
  navigator.clipboard.writeText(textareaField.value);
  copyBtn.innerText = "Code Copied";
  setTimeout(() => {
    copyBtn.innerText = "Copy Colors";
  }, 1500);
}

selectMenu.addEventListener("change", () => generateGradient(false));
refreshBtn.addEventListener("click", () => generateGradient(true));

copyBtn.addEventListener("click", copyCode);
