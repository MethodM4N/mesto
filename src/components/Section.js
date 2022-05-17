export default class Section {
   constructor({ items, renderer }, formSelector) {
      this._items = items;
      this.renderer = renderer;
      this._formSelector = document.querySelector(formSelector);
   }

   render() {
      this._items.forEach(item => {
         this.renderer(item);
      });
   }

   addItem(element, typeOfCard) {
      if (typeOfCard === 'newCard') {
         this._formSelector.prepend(element);
      } else if (typeOfCard === 'initialCard') {
         this._formSelector.append(element);
      }
   }
}


