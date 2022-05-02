
export default class FormValidator {
   constructor(validationConfig, form) {
      this._form = form;
      this._submitButtonSelector = validationConfig.submitButtonSelector;
      this._button = form.querySelector(this._submitButtonSelector);
      this._inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
      this._inactiveButtonClass = validationConfig.inactiveButtonClass;
      this._errorClass = validationConfig.errorClass;
      this._errorMessageClass = validationConfig.inputErrorClass;
   }

   enableValidation = () => {
      this._setEventListeners();
   };

   _setEventListeners = () => {
      this._form.addEventListener('input', () => {
         this._checkFormValidity();
      });
      this._inputList.forEach(input => {
         input.addEventListener('input', () => {
            this._checkInputValidity(input);
         });
      });
   };

   _checkFormValidity = () => {
      if (this._inputList.some(input => !input.validity.valid)) {
         this._disableSubmit();
      } else {
         this._enableSubmit();
      }
   };

   _disableSubmit = () => {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
   };
   _enableSubmit = () => {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
   };

   _checkInputValidity = (input) => {
      const errorElement = this._getErrorElement(input);
      errorElement.textContent = input.validationMessage;
      if (!input.validity.valid) {
         this._showInputError(input, errorElement);
      } else {
         this._hideInputError(input, errorElement);
      }
   };

   _getErrorElement = (input) => {
      return this._form.querySelector(`.${input.id}-error`);
   };

   _showInputError = (input, errorElement) => {
      input.classList.add(this._errorClass);
      errorElement.classList.add(this._errorMessageClass);
   };

   _hideInputError = (input, errorElement) => {
      errorElement.textContent = '';
      input.classList.remove(this._errorClass);
      errorElement.classList.remove(this._errorMessageClass);
   };

   resetValidation = () => {
      this._inputList.forEach(input => {
         this._checkFormValidity(input);
         const error = this._getErrorElement(input);
         this._hideInputError(input, error);
      });
   }
}






