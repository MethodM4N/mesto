/* validation */

const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   inputErrorClass: '.popup__input-error',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   errorClass: 'popup__input_error-visible'
};


const showInputError = (formElement, inputElement, errorMessage) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(validationConfig.errorClass);
   errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(validationConfig.errorClass);
   errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
   } else {
      hideInputError(formElement, inputElement);
   }
};

const toggleButtonState = (inputList, formElement) => {
   if (hasInvalidInput(inputList, formElement)) {
      const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
   } else {
      const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
   }
};

const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
};

const setEventListeners = (formElement) => {
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   toggleButtonState(inputList, formElement);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement);
         toggleButtonState(inputList, formElement);
      });
   });
};

const enableValidation = () => {
   const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      setEventListeners(formElement);
   });
};

const resetValidation = () => {
   const errorInputList = Array.from(document.querySelectorAll(validationConfig.inputErrorClass));
   const errorList = Array.from(document.querySelectorAll(validationConfig.inputSelector));
   errorInputList.forEach((element) => {
      element.textContent = "";
   });
   errorList.forEach((error) => {
      error.classList.remove(validationConfig.errorClass);
   });
};

enableValidation();
