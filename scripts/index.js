// save and edit description
const popupDescription = document.querySelector('.popup_type_description');
const editButton = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupContainer = popupDescription.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('#popupName');
const descriptionInput = popupContainer.querySelector('#popupDescription');
const popupFormDescription = document.querySelector('.popup__form');
const popupFormElement = document.querySelector('.popup__form_element');
const ESC_KEY = "Escape";
// add delete and edit places
const popupElement = document.querySelector('.popup_type_add-element');
const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const buttonCloseElement = document.querySelector('.popup__close-button_element');
const buttonCloseImage = document.querySelector('.popup__close-button_image');
const elementDescription = document.querySelector('#elementDescription');
const elementTemplate = document.querySelector('#elementTemplate').content;
const elementLink = document.querySelector('#elementLink');
const elements = document.querySelector('.elements');
const popupCaption = document.querySelector('.popup__image-caption');
const popupPhoto = document.querySelector('.popup__image');
const activePopup = document.querySelector('.popup_open');

function openPopup(popup) {
   popup.classList.add('popup_open');
   document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup(popup) {
   popup.classList.remove('popup_open');
   document.removeEventListener('keyup', onDocumentKeyUp);
}

function openPopupElements() {
   elementDescription.value = "";
   elementLink.value = "";
   openPopup(popupElement);
}

function popupOpenImage(evt) {
   popupPhoto.src = evt.target.src;
   popupPhoto.alt = evt.target.alt;
   popupCaption.textContent = evt.target.alt;
   openPopup(popupImage);
}

// save and edit description
function openPopupDescription() {
   nameInput.value = profileName.textContent;
   descriptionInput.value = profileDescription.textContent;
   openPopup(popupDescription);
}
function onDocumentKeyUp(event) {
   if (event.key === ESC_KEY) {
      const activePopup = document.querySelector('.popup_open');
      closePopup(activePopup);
   }
}

function formSubmitHandler(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = descriptionInput.value;
   closePopup(popupDescription);
}

// add delete and edit places

const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];

function createCard(element) {
   const elementImage = elementTemplate.cloneNode(true);
   elementImage.querySelector('.element__title').textContent = element.name;
   const image = elementImage.querySelector('.element__photo');
   image.src = element.link;
   image.alt = element.name;
   image.addEventListener("click", popupOpenImage);
   elementImage.querySelector('.element__like').addEventListener('click', like);
   elementImage.querySelector(".element__delete-button").addEventListener("click", removeElement);
   return elementImage;
}

initialCards.forEach(function (element) {
   elements.append(createCard(element));
});

function elementSubmitHandler(evt) {
   evt.preventDefault();
   const element = {
      name: elementDescription.value,
      link: elementLink.value,
   };
   elements.prepend(createCard(element));
   closePopup(popupElement);
}

function removeElement(evt) {
   evt.target.closest(".element").remove();
}
function like(evt) {
   evt.target.classList.toggle('element__like_active');
};

addButton.addEventListener('click', openPopupElements);
editButton.addEventListener('click', openPopupDescription);
buttonCloseEdit.addEventListener('click', () => closePopup(popupDescription));
buttonCloseElement.addEventListener('click', () => closePopup(popupElement));
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));
popupFormDescription.addEventListener('submit', formSubmitHandler);
popupFormElement.addEventListener('submit', elementSubmitHandler);
