export default class UserInfo {
  constructor({ userName, userProfession }) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
    this._name = "";
    this._job = "";
  }

  updateUserInfo = () => {
    this._userName.textContent = this._name;
    this._userProfession.textContent = this._job;
  };

  getUserInfo = () => {
    return {
      name: this._name,
      about: this._job,
      //user_name: this._name,
      //user_profession: this._job,
    };
  };

  setUserInfo = (newName, newJob) => {
    this._name = newName;
    this._job = newJob;
  }
}
