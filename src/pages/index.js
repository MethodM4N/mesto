import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationConfig } from '../utils/initial.js';

import {
   editButton,
   userNameSelector,
   userInfoSelector,
   nameInput,
   descriptionInput,
   popupFormDescription,
   popupFormElement,
   popupAddCard,
   popupImage,
   addButton,
   elements
} from "../utils/constants.js";

const userInfo = new UserInfo({ userNameSelector, userInfoSelector });

const validateFormDescription = new FormValidator(validationConfig, popupFormDescription);
validateFormDescription.enableValidation();

const validateFormElement = new FormValidator(validationConfig, popupFormElement);
validateFormElement.enableValidation();

function handleCardClick(name, link) {
   const popupImg = new PopupWithImage(popupImage);
   popupImg.open(name, link);
}

function createNewCard(item) {
   const card = new Card(item, '#elementTemplate', handleCardClick);
   const cardElement = card.generateCard();
   return cardElement;
}

const classSection = new Section(
   {
      items: initialCards,
      renderer: (cardItem) => {
         const card = createNewCard(cardItem);
         classSection.addItem(card, 'initialCard');
      }
   },
   elements);
classSection.render();

const popupEdit = new PopupWithForm(
   popupFormDescription,
   function submitForm(cardData) {
      userInfo.setUserInfo(cardData.profileName, cardData.profileDescription);
      popupEdit.close();
   }
);

const popupAdd = new PopupWithForm(
   popupAddCard,
   function submitForm(cardData) {
      const newCard = createNewCard(cardData);
      classSection.addItem(newCard, 'newCard');
      popupAdd.close();
      validateFormElement.disableSubmit();
   }
);


/* Listeners */

popupEdit.setEventListeners();
editButton.addEventListener('click', () => {
   validateFormDescription.resetValidation();
   const userData = userInfo.getUserInfo();
   nameInput.value = userData.name;
   descriptionInput.value = userData.info;
   validateFormDescription.enableSubmit();
   popupEdit.open();
});

popupAdd.setEventListeners();
addButton.addEventListener('click', () => {
   popupAdd.open();
   validateFormElement.resetValidation();
});






