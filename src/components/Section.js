export default class Section {
   constructor({ renderer }, formSelector) {
      this.renderer = renderer;
      this._formSelector = document.querySelector(formSelector);
   }

   render(cardArr) {
      cardArr.forEach(item => {
         this.renderer(item);
      });
   }

   addItem(element, typeOfCard) {
      if (typeOfCard === 'newCard') {
         this._formSelector.prepend(element);
      } else if (typeOfCard === 'serverCards') {
         this._formSelector.append(element);
      }
   }
}


