export default class UserInfo {
  constructor({ userName, userProfession, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
    this._userAvatar = document.querySelector(userAvatar);
    this._name = "";
    this._job = "";
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

  setUserInfo = (newName, newJob) => {
    this._name = newName;
    this._job = newJob;
    this._updateUserInfo();
  };

  setAvatar = (avatar) => {
    this._updateAvatar(avatar);
  };
}
