export default class UserInfo {
  constructor({ userName, userProfession }) {
    this._userName = userName;
    this._userProfession = userProfession;
  }
  getUserInfo() {
    const profileInfo = {
      user: document.querySelector(this._userName).value,
      profession: document.querySelector(this._userProfession).value,
    };
    return profileInfo;
  }
  setUserInfo() {
    const  inputsUserInfo = document.forms["edit-profile"];
    const { user_name, user_profession } = inputsUserInfo;
    //console.log(user_name.value);
    // const x = document.querySelector(this._userName);
    // const y = document.querySelector(this._userProfession);
    document.querySelector(this._userName).textContent = user_name.value;
    document.querySelector(this._userProfession).textContent = user_profession.value;
    // x.textContent = user_name.value;
    // y.textContent = user_profession.value;
  }
}
