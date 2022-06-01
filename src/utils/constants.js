export const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   inputErrorClass: '.popup__input-error',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   errorClass: 'popup__input_error-visible'
};

export const editButton = document.querySelector('.profile__button-edit');
export const editAvatarButton = document.querySelector('.profile__overlay-button');
export const userNameSelector = document.querySelector('.profile__name');
export const userInfoSelector = document.querySelector('.profile__description');
export const userAvatarSelector = document.querySelector('.profile__avatar');
export const nameInput = document.querySelector('#popupName');
export const descriptionInput = document.querySelector('#popupDescription');
export const popupFormElement = document.querySelector('.popup__form_element');
export const popupFormDescription = document.querySelector('.popup__form_description');
export const popupFormAvatar = document.querySelector('.popup__form_avatar');
export const addButton = document.querySelector('.profile__add-button');
export const popupImage = '.popup_type_image';
export const elements = '.elements';
export const popupDescription = '.popup_type_description';
export const popupAddCard = '.popup_type_add-element';
export const popupDeleteCard = '.popup_type_delete-element';
export const popupEditAvatar = '.popup_type_edit-avatar';