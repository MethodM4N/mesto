// close and open
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeEdit = document.querySelector('.popup__close-button');
// save and edit
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupContainer = popup.querySelector('.popup__container');
let nameInput = popupContainer.querySelector('#popupName');
let descriptionInput = popupContainer.querySelector('#popupDescription');
let formElement = document.querySelector('.popup__form');

function openPopup() {
   nameInput.value = profileName.textContent;
   descriptionInput.value = profileDescription.textContent;
   popup.classList.add('popup_open');
}
function closePopup() {
   popup.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = descriptionInput.value;
   closePopup();
}

editButton.addEventListener('click', openPopup);
closeEdit.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
