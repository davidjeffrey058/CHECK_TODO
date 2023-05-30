// Get the popup and close button elements
var popup = document.getElementById("loginPopup");
var closeBtn = popup.querySelector(".close");

// Function to open the popup
function openPopup() {
	popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
	popup.style.display = "none";
}

// Close the popup when the user clicks outside of it
window.onclick = function (event) {
	if (event.target == popup) {
		popup.style.display = "none";
	}
}


//For the register modal
var registerPopup = document.getElementById("registerPopup");
var registerCloseBtn = popup.querySelector(".registerclose");

function openRegisterPopUp() {
    registerPopup.style.display = "block";
}

function closeRegisterPopUp() {
    registerPopup.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == registerPopup) {
        registerPopup.style.display = "none";
    }
}

function toRegister(e){
	closePopup();
	openRegisterPopUp();
	e.preventDefault();
}

function toLogin(e){
	closeRegisterPopUp();
	openPopup();
	e.preventDefault();
}