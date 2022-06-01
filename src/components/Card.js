export default class Card {
   constructor(data, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId) {
      this._name = data.name;
      this._link = data.link;
      this.owner = data.owner;
      this.likes = data.likes;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._handleCardLike = handleCardLike;
      this._userId = userId;
      this.Id = data._id;
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
      this._likeCounter = this._element.querySelector('.element__like-value');
      this._cardImage = this._element.querySelector('.element__photo');
      this._element.querySelector('.element__title').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this.buttonDeleteCard = this._element.querySelector('.element__delete-button');
      this._setEventListeners();
      this.updateLikes(this.likes.length);
      this._checkOwner();
      this.handleToggleLike();
      return this._element;
   };

   removeElement() {
      this._element.remove();
   };

   Liked() {
      return this.likes.some((item) => {
         return item._id === this._userId;
      })
   }

   handleToggleLike() {
      this.Liked() ? this._like.classList.add('element__like_active') :
         this._like.classList.remove('element__like_active');
   };

   updateLikes(likeLength) {
      this._likeCounter.textContent = likeLength;
   }

   _checkOwner() {
      if (this.owner._id !== this._userId) {
         this.buttonDeleteCard.remove();
      }
   }

   _setEventListeners() {
      this._like.addEventListener('click', () => {
         this._handleCardLike(this);
      });

      this.buttonDeleteCard.addEventListener('click', () => {
         this._handleCardDelete(this);
      });

      this._cardImage.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   };
}
