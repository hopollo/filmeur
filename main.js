const sourceInput = document.getElementById("source");
const waLinkEl = document.getElementById("waLink");
const titleEl = document.getElementById("title");

const gmapsBaseUrl = "https://www.google.com/maps/dir/?api=1&origin=Current+Location&travelmode=driving&dir_action=navigate"
const waBaseUrl = "whatsapp://send?text=" + titleEl.value;
const trimmedLink = sourceInput.value.replace(/\s/g, '+').replace(/,/g, '');

waLinkEl.href = waBaseUrl + gmapsBaseUrl + "&destination=" + trimmedLink;
