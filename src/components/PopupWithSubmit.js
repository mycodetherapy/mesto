import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ selector }) {
    super(selector);
    this._formSubmitHandler = null;
    this._form = this._element.querySelector(".form");
  }

  setActionSubmit(action){
    this._formSubmitHandler = action;
  }

  preloader(text) {
    this._element.querySelector(".form__button-save").textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler();
    });
  };
}
