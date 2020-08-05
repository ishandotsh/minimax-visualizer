// Thanks to https://sabe.io

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

let infomodal = document.querySelector(".info-modal");
let infotrigger = document.querySelector(".info-trigger");
let infocloseButton = document.querySelector(".info-close-button");

function toggleModal() {
	modal.classList.toggle("show-modal");
}

function toggleInfoModal() {
	infomodal.classList.toggle("show-modal");
}

function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
	}
	if (event.target === infomodal) {
		toggleInfoModal();
	}
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

infotrigger.addEventListener("click", toggleInfoModal);
infocloseButton.addEventListener("click", toggleInfoModal);

window.addEventListener("click", windowOnClick);

toggleModal();
