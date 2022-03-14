// close and open

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeEdit = document.querySelector('.popup__close-button');

function openPopup() {
   popup.classList.add('popup_open');
}
function closePopup() {
   popup.classList.remove('popup_open');
}

editButton.addEventListener('click', openPopup);

closeEdit.addEventListener('click', closePopup);

// save and edit
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupContainer = popup.querySelector('.popup__container');
let nameInput = popupContainer.querySelector('.popup__name');
let descriptionInput = popupContainer.querySelector('.popup__description');
let submitButton = popupContainer.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__form');

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function formSubmitHandler(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = descriptionInput.value;
   closePopup();
}

submitButton.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);
