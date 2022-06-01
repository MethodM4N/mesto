import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
   constructor(submitForm, popupSelector) {
      super(popupSelector);
      this._submitForm = submitForm;
      this._formElement = this._popUp.querySelector('.popup__container');
   }

   open(card) {
      super.open();
      this.card = card;
   };

   _Submit = (evt) => {
      evt.preventDefault();
      this._submitForm(this.card);
   };

   setEventListeners() {
      super.setEventListeners();
      this._formElement.addEventListener('submit', this._Submit);
   };
};