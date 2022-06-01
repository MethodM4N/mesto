export default class UserInfo {
   constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
      this._userName = userNameSelector;
      this._userInfo = userInfoSelector;
      this._userAvatar = userAvatarSelector;
   }

   getUserInfo() {
      return {
         name: this._userName.textContent,
         info: this._userInfo.textContent
      }
   }

   setUserInfo(newName, newInfo, id) {
      this._userName.textContent = newName;
      this._userInfo.textContent = newInfo;
      this._userId = id;
   }

   setUserAvatar(avatar) {
      this._userAvatar.src = avatar;
   }

}

