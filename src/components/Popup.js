export default class Popup {
   constructor(popupSelector) {
      this._popUp = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
   }

   open() {
      this._popUp.classList.add('popup_open');
      this.setEventListeners();
   }

   close() {
      this._popUp.classList.remove('popup_open');
      this._removeEventListeners();
   }

   _handleEscClose(event) {
      if (event.key === 'Escape') {
         this.close();
      }
   }

   _handlerClickClose = (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
         this.close();
      }
   };

   setEventListeners() {
      document.addEventListener('keydown', this._handleEscClose);
      this._popUp.addEventListener('mousedown', this._handlerClickClose);
   }

   _removeEventListeners() {
      document.removeEventListener('keydown', this._handleEscClose);
      this._popUp.removeEventListener('mousedown', this._handlerClickClose);
   }
}