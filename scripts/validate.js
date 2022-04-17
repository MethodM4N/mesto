/* validation */

const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   inputErrorClass: '.popup__input-error',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   errorClass: 'popup__input_error-visible'
};


const showInputError = (formElement, inputElement, errorMessage, config) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(config.errorClass);
   errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(config.errorClass);
   errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
   } else {
      hideInputError(formElement, inputElement, config);
   }
};

const toggleButtonState = (inputList, formElement, config) => {
   if (hasInvalidInput(inputList, formElement)) {
      const buttonElement = formElement.querySelector(config.submitButtonSelector);
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
   } else {
      const buttonElement = formElement.querySelector(config.submitButtonSelector);
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
   }
};

const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
};

const setEventListeners = (formElement, config) => {
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   toggleButtonState(inputList, formElement, config);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement, config);
         toggleButtonState(inputList, formElement, config);
      });
   });
};

const enableValidation = (config) => {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      setEventListeners(formElement, config);
   });
};

const resetValidation = (config) => {
   const errorInputList = Array.from(document.querySelectorAll(config.inputErrorClass));
   const errorList = Array.from(document.querySelectorAll(config.inputSelector));
   errorInputList.forEach((element) => {
      element.textContent = "";
   });
   errorList.forEach((error) => {
      error.classList.remove(config.errorClass);
   });
};

enableValidation(validationConfig);

