export default class UserInfo {
  constructor({ userName, userProfession, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
    this._userAvatar = document.querySelector(userAvatar);
    this._name = null;
    this._job = null;
  }

  _updateUserInfo() {
    this._userName.textContent = this._name;
    this._userProfession.textContent = this._job;
  }

  _updateAvatar = (avatar) => {
    this._userAvatar.src = avatar;
  };

  getUserInfo = () => {
    return {
      name: this._name,
      about: this._job,
    };
  };

  _validationKeyObj = (dispatchedObj, receivedObj) => {
    let bul = null;
    const dispArr = Object.getOwnPropertyNames(dispatchedObj);
    for (let i = 0; i < dispArr.length; i++) {
      if (receivedObj.hasOwnProperty(dispArr[i])) {
        bul = true;
      } else {
        bul = false;
        break;
      }
    }
    return bul;
  };

  setUserInfo = (formData, data) => {
    if (this._validationKeyObj(formData, data)) {
      this._name = data.name;
      this._job = data.about;
      this._updateUserInfo();
    } else {
      console.log("Ответ не содержит необходимых свойств...");
    }
  };

  setAvatar = (formData, data) => {
    if (this._validationKeyObj(formData, data)) {
      this._updateAvatar(data.avatar);
    } else {
      console.log("Ответ не содержит необходимых свойств...");
    }
  };
}
