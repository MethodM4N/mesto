/* validation */

enableValidation = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   inputErrorClass: 'popup__input-error'
};

const enableButton = (button, inactiveButtonClass) => {
   button.disabled = false;
   button.classList.remove(inactiveButtonClass);
};

const disableButton = (button, inactiveButtonClass) => {
   button.disabled = true;
   button.classList.add(inactiveButtonClass);
};

const setButtonState = (button, isValid) => {
   if (isValid) {
      enableButton(button, enableValidation.inactiveButtonClass);
   } else {
      disableButton(button, enableValidation.inactiveButtonClass);
   }
};

const handleInput = (event) => {
   const currentForm = event.currentTarget;
   const input = event.target;
   const submitButton = currentForm.querySelector(enableValidation.submitButtonSelector);
   validateInput(input);
   setButtonState(submitButton, currentForm.checkValidity());
};

const validateInput = (input) => {
   const errorElement = input.parentNode.querySelector(`.${input.id}-error`);
   errorElement.textContent = input.validationMessage;
};
