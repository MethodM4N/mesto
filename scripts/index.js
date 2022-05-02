import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './initial.js';

const popupDescription = document.querySelector('.popup_type_description');
const editButton = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupContainer = popupDescription.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('#popupName');
const descriptionInput = popupContainer.querySelector('#popupDescription');
const popupFormDescription = document.querySelector('.popup__form_description');
const popupFormElement = document.querySelector('.popup__form_element');
const ESC_KEY = "Escape";
const popupAddCard = document.querySelector('.popup_type_add-element');
const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const buttonCloseElement = document.querySelector('.popup__close-button_element');
const buttonCloseImage = document.querySelector('.popup__close-button_image');
const buttonSaveDescription = document.querySelector('.popup__save-button-description');
const buttonSaveElement = document.querySelector('.popup__save-button-element');
const elementDescription = document.querySelector('#elementDescription');
const elementLink = document.querySelector('#elementLink');
const popupCaption = document.querySelector('.popup__image-caption');
const popupPhoto = document.querySelector('.popup__image');
const popupList = Array.from(document.querySelectorAll('.popup'));

initialCards.forEach((item) => {
   const card = new Card(item, '#elementTemplate');
   const cardElement = card.generateCard();
   document.querySelector('.elements').append(cardElement);
});

const validateFormDescription = new FormValidator(validationConfig, popupFormDescription);
validateFormDescription.enableValidation();

const validateFormElement = new FormValidator(validationConfig, popupFormElement);
validateFormElement.enableValidation();

function openPopup(popup) {
   popup.classList.add('popup_open');
   document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup(popup) {
   popup.classList.remove('popup_open');
   document.removeEventListener('keyup', onDocumentKeyUp);
}

function openPopupAddCard() {
   validateFormElement.resetValidation();
   elementDescription.value = "";
   elementLink.value = "";
   buttonSaveElement.classList.add('popup__save-button_disabled');
   buttonSaveElement.disabled = true;
   openPopup(popupAddCard);
}

export function openPopupImage(evt) {
   popupPhoto.src = evt.target.src;
   popupPhoto.alt = evt.target.alt;
   popupCaption.textContent = evt.target.alt;
   openPopup(popupImage);
}

// save and edit description
function onDocumentKeyUp(event) {
   if (event.key === ESC_KEY) {
      const activePopup = document.querySelector('.popup_open');
      closePopup(activePopup);
   }
}

popupList.forEach((popup) => {
   popup.addEventListener('mousedown', (event) => {
      if (event.target === popup) {
         const activePopup = document.querySelector('.popup_open');
         closePopup(activePopup);
      };
   });
});

function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = descriptionInput.value;
   closePopup(popupDescription);
}

function openPopupDescription() {
   validateFormDescription.resetValidation();
   nameInput.value = profileName.textContent;
   descriptionInput.value = profileDescription.textContent;
   buttonSaveDescription.classList.remove('popup__save-button_disabled');
   buttonSaveDescription.disabled = false;
   openPopup(popupDescription);
}

function handleAddCardFormSubmit(evt) {
   evt.preventDefault();
   const item = {
      name: elementDescription.value,
      link: elementLink.value,
   };
   const card = new Card(item, '#elementTemplate');
   const cardElement = card.generateCard();
   document.querySelector('.elements').prepend(cardElement);
   closePopup(popupAddCard);
}

addButton.addEventListener('click', openPopupAddCard);
editButton.addEventListener('click', openPopupDescription);
buttonCloseEdit.addEventListener('click', () => closePopup(popupDescription));
buttonCloseElement.addEventListener('click', () => closePopup(popupAddCard));
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));
popupFormDescription.addEventListener('submit', handleProfileFormSubmit);
popupFormElement.addEventListener('submit', handleAddCardFormSubmit);








