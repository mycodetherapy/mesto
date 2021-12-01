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
    const dispArr = Object.keys(dispatchedObj);
    const recArr = Object.keys(receivedObj);
    return dispArr.every((currentValue) => {
      return recArr.includes(currentValue);
    });
  };

  setUserInfo = (formData, data) => {
    if (this._validationKeyObj(formData, data)) {
      this._name = data.name;
      this._job = data.about;
      this._updateUserInfo();
    } else {
      console.log("The answer does not contain the required properties...");
    }
  };

  setAvatar = (formData, data) => {
    if (this._validationKeyObj(formData, data)) {
      this._updateAvatar(data.avatar);
    } else {
      console.log("The answer does not contain the required properties...");
    }
  };
}
