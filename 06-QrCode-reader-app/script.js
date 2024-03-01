const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");

function fetchRequest(file, formData) {
  infoText.innerHTML = "Scanning QR Code ...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerHTML = result
        ? "Upload QR Code To Scan"
        : "Coulnd't Scan Qr Code";

      if (!result) return;
      document.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    })
    .ctach(() => {
      infoText.innerHTML = "Coulnd't Scan Qr Code...";
    });
}

fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

form.addEventListener("click", () => fileInp.click());
