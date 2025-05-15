let galleryCategories = {
  Traditional: [],
  Bridal: [],
  Modern: [],
  Festive: []
};

let gallery2Images = [];
let currentZoom = 1;
let isAdmin = false;

function loginAdmin() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;
  if (user === "admin" && pass === "admin123") {
    document.getElementById("adminSection").style.display = "block";
    isAdmin = true;
    showCategory("Traditional");
    renderGallery2();
  } else {
    alert("Incorrect login");
  }
}

function uploadCategoryImage(input) {
  const cat = document.getElementById("uploadCategory").value;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    galleryCategories[cat].push(e.target.result);
    showCategory(cat);
  };
  reader.readAsDataURL(file);
}

function uploadGallery2Image(input) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    gallery2Images.push(e.target.result);
    renderGallery2();
  };
  reader.readAsDataURL(file);
}

function showCategory(cat) {
  const div = document.getElementById("galleryDisplay");
  div.innerHTML = "";
  galleryCategories[cat].forEach((src, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    const img = document.createElement("img");
    img.src = src;
    wrapper.appendChild(img);
    if (isAdmin) {
      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.style.position = "absolute";
      delBtn.style.top = "5px";
      delBtn.style.right = "5px";
      delBtn.onclick = () => deleteCategoryImage(cat, index);
      wrapper.appendChild(delBtn);
    }
    div.appendChild(wrapper);
  });
}

function deleteCategoryImage(cat, index) {
  galleryCategories[cat].splice(index, 1);
  showCategory(cat);
}

function renderGallery2() {
  const container = document.getElementById("gallery2Container");
  container.innerHTML = "";
  gallery2Images.forEach((src, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => zoomImage(src);
    wrapper.appendChild(img);
    if (isAdmin) {
      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.style.position = "absolute";
      delBtn.style.top = "5px";
      delBtn.style.right = "5px";
      delBtn.onclick = () => deleteGallery2Image(index);
      wrapper.appendChild(delBtn);
    }
    container.appendChild(wrapper);
  });
}

function deleteGallery2Image(index) {
  gallery2Images.splice(index, 1);
  renderGallery2();
}

function zoomImage(src) {
  const zoomed = document.getElementById("zoomedImage");
  zoomed.src = src;
  zoomed.style.display = "block";
  document.getElementById("zoomControls").style.display = "block";
  currentZoom = 1;
  zoomed.style.transform = `translate(-50%, -50%) scale(${currentZoom})`;
}

function toggleZoom() {
  document.getElementById("zoomedImage").style.display = "none";
  document.getElementById("zoomControls").style.display = "none";
}

function zoomIn() {
  currentZoom = Math.min(currentZoom + 0.1, 2);
  document.getElementById("zoomedImage").style.transform = `translate(-50%, -50%) scale(${currentZoom})`;
}

function zoomOut() {
  currentZoom = Math.max(currentZoom - 0.1, 0.5);
  document.getElementById("zoomedImage").style.transform = `translate(-50%, -50%) scale(${currentZoom})`;
}

function updateContact() {
  const text = document.getElementById("contactInput").value;
  const ig = document.getElementById("instagram").value;
  const fb = document.getElementById("facebook").value;
  const wa = document.getElementById("whatsapp").value;

  document.getElementById("adminContactInfo").innerHTML = text.replace(/\n/g, "<br>") + `<br>
    <strong>Instagram:</strong> <a href="${ig}" target="_blank">${ig}</a><br>
    <strong>Facebook:</strong> <a href="${fb}" target="_blank">${fb}</a><br>
    <strong>WhatsApp:</strong> <a href="${wa}" target="_blank">${wa}</a>`;

  document.getElementById("footerSocialLinks").innerHTML = `
    <a href="${ig}" target="_blank">Instagram</a> |
    <a href="${fb}" target="_blank">Facebook</a> |
    <a href="${wa}" target="_blank">WhatsApp</a>`;
}

function saveBooking(e) {
  e.preventDefault();
  alert("Thank you! Your booking is confirmed.");
}

function changeTheme(color) {
  document.documentElement.style.setProperty('--themeColor', color);
}

function changeTitleColor(color) {
  document.documentElement.style.setProperty('--titleColor', color);
}

function updateTitleFont() {
  const font = document.getElementById("fontSelector").value;
  const size = document.getElementById("fontSizeRange").value;
  const title = document.querySelector("header h1");
  title.style.fontFamily = font;
  title.style.fontSize = size + "px";
}