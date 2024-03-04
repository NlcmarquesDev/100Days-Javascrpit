const api =
  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example";

const text = document.querySelector(".container input");
const generateBtn = document.querySelector(".generate");
const divQr = document.querySelector(".qr-show");

generateBtn.addEventListener("click", () => {
  const image = document.createElement("img");
  if (text.value.length > 0) {
    divQr.appendChild(image);
    image.classList.add("show");
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.value}`;
  } else {
    text.classList.add("error");
    setTimeout(() => {
      text.classList.remove("error");
    }, 1000);
    divQr.removeChild(document.querySelector(".qr-show img"));
  }
});
