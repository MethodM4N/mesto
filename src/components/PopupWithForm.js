import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitForm) {
      super(popupSelector);
      this._submitForm = submitForm;
      this._popupForm = this._popUp.querySelector('.popup__form');
      this._inputs = this._popupForm.querySelectorAll('.popup__input');
      this._submitButton = this._popUp.querySelector('.popup__save-button');
   }

   _getInputValues() {
      const inputList = {};
      this._inputs.forEach((input) => {
         inputList[input.name] = input.value;
      });
      return inputList;
   }

   close() {
      super.close();
      this._popupForm.reset();
   }

   _submit = (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
   }

   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', this._submit);
   }

   updateTextOnButton(text) {
      this._submitButton.textContent = text;
   }
}