export default class UserInfo {
   constructor({ userNameSelector, userInfoSelector }) {
      this._userName = userNameSelector;
      this._userInfo = userInfoSelector;
   }

   getUserInfo() {
      return {
         name: this._userName.textContent,
         info: this._userInfo.textContent
      }
   }

   setUserInfo(newName, newInfo) {
      this._userName.textContent = newName;
      this._userInfo.textContent = newInfo;
   }
}

