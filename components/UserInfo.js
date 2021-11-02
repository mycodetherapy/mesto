export default class UserInfo {
  constructor({ userName, userProfession }) {
    this._userName = userName;
    this._userProfession = userProfession;

    const  inputsUserInfo = document.forms["edit_profile"];
    const { user_name, user_profession } = inputsUserInfo;

    this._user_name = user_name;
    this._user_profession = user_profession;
  }
  getUserInfo() {
    const profileInfo = {
      user_name: document.querySelector(this._userName).textContent,
      user_profession: document.querySelector(this._userProfession).textContent,
    };
    return profileInfo;
  }
  setUserInfo() {
    document.querySelector(this._userName).textContent = this._user_name.value;
    document.querySelector(this._userProfession).textContent = this._user_profession.value;
  }
}
