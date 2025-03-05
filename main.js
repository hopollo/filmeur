const sourceInput = document.getElementById("source");
const waLinkEl = document.getElementById("waLink");
const titleEl = document.getElementById("title");

const clearSourceButton = document.getElementById("clearSource");

const errorEl = document.getElementById("error");

const gmapsBaseUrl = "https://www.google.com/maps/dir/?api=1&origin=Current+Location&travelmode=driving&dir_action=navigate";
const waBaseUrl = "whatsapp://send?text=";

function isValidInput(input) {
  //return /^[a-zA-Z0-9\s,.-]+$/.test(input);
   return true; 
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function toggleClearButton() {
  if (sourceInput.value.trim()) {
    clearSourceButton.style.display = "inline-block";
  } else {
    clearSourceButton.style.display = "none";
  }
}

function updatewaLink() {
  const sourceValue = sourceInput.value.trim();
  const titleValue = titleEl.value.trim();

  if (!isValidInput(sourceValue)) {
    waLinkEl.classList.add("hidden");
    errorEl.textContent = "Entrée invalide. Collez uniquement l'adresse copiée depuis google maps.";
    return;
  } else {
    errorEl.textContent = "";
  }

  if (sourceValue) {
    waLinkEl.classList.remove("hidden");
  } else {
    waLinkEl.classList.add("hidden");
    return;
  }

  const formattedSource = sourceValue.replace(/\s+/g, '+').replace(/,/g, '');
  const message = titleValue ? `${titleValue}: ${gmapsBaseUrl}&destination=${formattedSource}` : `${gmapsBaseUrl}&destination=${formattedSource}`;
  waLinkEl.href = `${waBaseUrl}${encodeURIComponent(message)}`;
}

titleEl.addEventListener("input", debounce(() => updatewaLink(), 300));

sourceInput.addEventListener("input", debounce(() => {
  toggleClearButton();
  updatewaLink()
}, 300));

clearSourceButton.addEventListener("click", () => {
  sourceInput.value = "";
  updatewaLink();
  toggleClearButton();
});

toggleClearButton();

if (!sourceInput.value.trim()) {
  waLinkEl.classList.add("hidden");
}
