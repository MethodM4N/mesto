export default class Api {
   constructor(link, token) {
      this._link = link;
      this._token = token;
   };

   getUserInfo() {
      return fetch(`${this._link}/users/me`, {
         headers: {
            authorization: this._token
         }
      })
         .then(this._getStatus);
   }

   getInitialCards() {
      return fetch(`${this._link}/cards`, {
         headers: {
            authorization: this._token
         }
      })
         .then(this._getStatus);
   }

   updateUserInfo(name, about) {
      return fetch(`${this._link}/users/me`, {
         method: 'PATCH',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: name,
            about: about
         })
      })
         .then(this._getStatus);
   }

   addNewCard(name, link) {
      return fetch(`${this._link}/cards`, {
         method: 'POST',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: name,
            link: link
         })
      })
         .then(this._getStatus);
   }

   deleteCard(cardId) {
      return fetch(`${this._link}/cards/${cardId}`, {
         method: 'DELETE',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
         .then(this._getStatus);
   }

   addLikeUpdate(cardId) {
      return fetch(`${this._link}/cards/likes/${cardId}`, {
         method: 'PUT',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
         .then(this._getStatus);
   }

   deleteLikeUpdate(cardId) {
      return fetch(`${this._link}/cards/likes/${cardId}`, {
         method: 'DELETE',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
         .then(this._getStatus);
   }

   updateAvatar(avatar) {
      return fetch(`${this._link}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar: avatar
         })
      })
         .then(this._getStatus);
   }

   _getStatus(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }
}


