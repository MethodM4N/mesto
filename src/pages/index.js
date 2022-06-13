import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from '../components/UserInfo.js';

import {
   validationConfig,
   editButton,
   editAvatarButton,
   userNameSelector,
   userInfoSelector,
   userAvatarSelector,
   nameInput,
   descriptionInput,
   popupFormElement,
   popupFormDescription,
   popupFormAvatar,
   addButton,
   popupImage,
   elements,
   popupDescription,
   popupAddCard,
   popupDeleteCard,
   popupEditAvatar
} from "../utils/constants.js";

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-42', 'e2227718-927a-4e5e-aa94-7167af559800');

const userInfo = new UserInfo({ userNameSelector, userInfoSelector, userAvatarSelector });

const validateFormDescription = new FormValidator(validationConfig, popupFormDescription);
validateFormDescription.enableValidation();

const validateFormElement = new FormValidator(validationConfig, popupFormElement);
validateFormElement.enableValidation();

const validateFormAvatar = new FormValidator(validationConfig, popupFormAvatar);
validateFormAvatar.enableValidation();

const popupImg = new PopupWithImage(popupImage);

const popupDelete = new PopupWithSubmit(
   function submitForm(card) {
      api.deleteCard(card.Id)
         .then(() => {
            {
               card.removeElement();
               popupDelete.close();
            }
         })
         .catch((err) => console.log(err));
   },
   popupDeleteCard);


function createNewCard(item, userId, typeOfCard) {
   const card = new Card(item, '#elementTemplate', handleCardClick, handleCardLike, handleCardDelete, userId);
   if (typeOfCard === 'serverCards') {
      const cardElement = card.generateServerCards();
      return cardElement;
   }
   if (typeOfCard === 'newCard') {
      const cardElement = card.createCard();
      return cardElement;
   }
}

function handleCardLike(card) {
   const likeToggle = card.liked() ? api.deleteLikeUpdate(card.Id) : api.addLikeUpdate(card.Id);
   likeToggle.then((res) => {
      card.likes = res.likes;
      card.handleToggleLike();
      card.updateLikes(res.likes.length);
   })
      .catch((err) => console.log(err));
}

function handleCardDelete(card) {
   popupDelete.open(card);
}

function handleCardClick(name, link) {
   popupImg.open({ name, link });
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
   .then(([userData, cardsData]) => {
      userInfo.setUserInfo(userData.name, userData.about, userData._id);
      userInfo.setUserAvatar(userData.avatar);
      const classSection = new Section(
         {
            renderer: (item) => {
               const card = createNewCard(item, userData._id, 'serverCards');
               classSection.addItem(card, 'serverCards');
            }
         },
         elements);
      classSection.render(cardsData);

      const popupEdit = new PopupWithForm(
         popupDescription,
         function submitForm(data) {
            popupEdit.updateTextOnButton('Сохранение...');
            validateFormDescription.disableSubmit();
            api.updateUserInfo(data.profileName, data.profileDescription)
               .then(() => {
                  userInfo.setUserInfo(data.profileName, data.profileDescription);
                  popupEdit.close();
               })
               .catch((err) => console.log(err))
               .finally(() => {
                  popupEdit.updateTextOnButton('Сохранить');
               });
         }
      );
      editButton.addEventListener('click', () => {
         validateFormDescription.resetValidation();
         const userData = userInfo.getUserInfo();
         nameInput.value = userData.name;
         descriptionInput.value = userData.info;
         validateFormDescription.enableSubmit();
         popupEdit.open();
      });
      popupEdit.setEventListeners();

      const popupUpdateAvatar = new PopupWithForm(popupEditAvatar,
         function submitForm(inputsList) {
            popupUpdateAvatar.updateTextOnButton('Сохранение...');
            validateFormAvatar.disableSubmit();
            api.updateAvatar(inputsList.link)
               .then(() => {
                  userInfo.setUserAvatar(inputsList.link);
                  popupUpdateAvatar.close();
               })
               .catch((err) => console.log(err))
               .finally(() => {
                  popupUpdateAvatar.updateTextOnButton('Сохранить');
               });
         });
      popupUpdateAvatar.setEventListeners();
      editAvatarButton.addEventListener('click', () => {
         popupUpdateAvatar.open();
         validateFormAvatar.resetValidation();
      });

      const popupAdd = new PopupWithForm(
         popupAddCard,
         function submitForm(CardData) {
            popupAdd.updateTextOnButton('Создание...');
            validateFormElement.disableSubmit();
            api.addNewCard(CardData.name, CardData.link)
               .then((data) => {
                  const userId = userData._id;
                  const newCard = createNewCard(data, userId, 'newCard');
                  classSection.addItem(newCard, 'newCard');
                  popupAdd.close();
               })
               .catch((err) => console.log(err))
               .finally(() => {
                  popupAdd.updateTextOnButton('Создать');
               });
         }
      );
      popupAdd.setEventListeners();
      addButton.addEventListener('click', () => {
         popupAdd.open();
         validateFormElement.resetValidation();
      });
   })
   .catch((err) => console.log(err));

popupImg.setEventListeners();
popupDelete.setEventListeners();


