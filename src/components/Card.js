export default class Card {
   constructor(data, cardSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this.handleCardClick = handleCardClick;
   };

   _getTemplate() {
      const cardElement = document
         .querySelector(this._cardSelector)
         .content.querySelector('.element')
         .cloneNode(true);
      return cardElement;
   };

   generateCard() {
      this._element = this._getTemplate();
      this._like = this._element.querySelector('.element__like');
      this._cardImage = this._element.querySelector('.element__photo');
      this._element.querySelector('.element__title').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this.buttonDeleteCard = this._element.querySelector('.element__delete-button');
      this._setEventListeners();
      return this._element;
   };

   _removeElement() {
      this._element.remove();
   };
   _handleToggleLike() {
      this._like.classList.toggle('element__like_active');
   };

   _setEventListeners() {
      this._like.addEventListener('click', () => {
         this._handleToggleLike();
      });

      this.buttonDeleteCard.addEventListener('click', () => {
         this._removeElement();
      });

      this._cardImage.addEventListener('click', () => {
         this.handleCardClick(this._name, this._link);
      });
   };
};

