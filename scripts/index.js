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
const elementDescription = document.querySelector('#elementDescription');
const elementLink = document.querySelector('#elementLink');
const popupCaption = document.querySelector('.popup__image-caption');
const popupPhoto = document.querySelector('.popup__image');
const popupList = Array.from(document.querySelectorAll('.popup'));
const elements = document.querySelector('.elements');

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
   validateFormElement.disableSubmit();
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
   validateFormDescription.enableSubmit();
   openPopup(popupDescription);
}

function createNewCard(item) {
   const card = new Card(item, '#elementTemplate');
   const cardElement = card.generateCard();
   return cardElement;
}

initialCards.forEach((item) => {
   elements.append(createNewCard(item));
});

function handleAddCardFormSubmit(evt) {
   evt.preventDefault();
   const item = {
      name: elementDescription.value,
      link: elementLink.value,
   };
   elements.prepend(createNewCard(item));
   closePopup(popupAddCard);
   validateFormElement.disableSubmit();
}

addButton.addEventListener('click', openPopupAddCard);
editButton.addEventListener('click', openPopupDescription);
buttonCloseEdit.addEventListener('click', () => closePopup(popupDescription));
buttonCloseElement.addEventListener('click', () => closePopup(popupAddCard));
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));
popupFormDescription.addEventListener('submit', handleProfileFormSubmit);
popupFormElement.addEventListener('submit', handleAddCardFormSubmit);








