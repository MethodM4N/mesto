// save and edit description
const popupDescription = document.querySelector('.popup_type_description');
const editButton = document.querySelector('.profile__button-edit');
const closeEdit = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupContainer = popupDescription.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('#popupName');
const descriptionInput = popupContainer.querySelector('#popupDescription');
const formElement = document.querySelector('.popup__form');
const formElementE = document.querySelector('.popup__form_e');
const ESC_KEY = "Escape";
// add delete and edit places
const popupElements = document.querySelector('.popup_type_add-elements');
const popupImage = document.querySelector('.popup_type_image');
const addButton = document.querySelector('.profile__add-button');
const closeButtonElement = document.querySelector('.popup__close-button_element');
const closeButtonImage = document.querySelector('.popup__close-button_image');
const elementDescription = document.querySelector('#elementDescription');
const elementLink = document.querySelector('#elementLink');
const elementTemplate = document.querySelector('#elementTemplate').content;
const elements = document.querySelector('.elements');
const popupCaption = document.querySelector('.popup__image-caption');
const popupPhoto = document.querySelector('.popup__image');


// save and edit description
function openPopup() {
   nameInput.value = profileName.textContent;
   descriptionInput.value = profileDescription.textContent;
   popupDescription.classList.add('popup_open');
   document.addEventListener('keyup', onDocumentKeyUp);
}
function onDocumentKeyUp(event) {
   if (event.key === ESC_KEY) {
      closePopup();
   }
}

function formSubmitHandler(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = descriptionInput.value;
   closePopup();
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

initialCards.forEach(function (element) {
   const elementImage = elementTemplate.cloneNode(true);
   elementImage.querySelector('.element__title').textContent = element.name;
   elementImage.querySelector('.element__photo').src = element.link;
   elementImage.querySelector('.element__photo').alt = element.name;
   elementImage.querySelector('.element__like').addEventListener('click', like);
   elementImage.querySelector(".element__delete-button").addEventListener("click", removeElement);
   elementImage.querySelector(".element__photo").addEventListener("click", popupOpenImage);
   elements.append(elementImage);
});

function elementSubmitHandler(evt) {
   evt.preventDefault();
   const elementImage = elementTemplate.cloneNode(true);
   elementImage.querySelector('.element__title').textContent = elementDescription.value;
   elementImage.querySelector('.element__photo').src = elementLink.value;
   elementImage.querySelector('.element__photo').alt = elementDescription.value;
   elementImage.querySelector('.element__like').addEventListener('click', like);
   elementImage.querySelector(".element__delete-button").addEventListener("click", removeElement);
   elementImage.querySelector(".element__photo").addEventListener("click", popupOpenImage);
   elements.prepend(elementImage);
   closePopup();
}

function removeElement(evt) {
   evt.target.closest(".element").remove();
}
function like(evt) {
   evt.target.classList.toggle('element__like_active');
};

function openPopupElements() {
   elementDescription.value = "";
   elementLink.value = "";
   popupElements.classList.add('popup_open');
   document.addEventListener('keyup', onDocumentKeyUp);
}

function popupOpenImage(evt) {
   popupImage.classList.add('popup_open');
   popupPhoto.src = evt.target.src;
   popupCaption.textContent = evt.target.alt;
   document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
   popupDescription.classList.remove('popup_open');
   popupElements.classList.remove('popup_open');
   popupImage.classList.remove('popup_open');
   document.removeEventListener('keyup', onDocumentKeyUp);
}

addButton.addEventListener('click', openPopupElements);
editButton.addEventListener('click', openPopup);
closeEdit.addEventListener('click', closePopup);
closeButtonElement.addEventListener('click', closePopup);
closeButtonImage.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElementE.addEventListener('submit', elementSubmitHandler);
