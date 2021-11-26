import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ selector, formSubmitHandler }) {
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._element.querySelector(".form");
    this._id = "";
  }

  action(item) {
    this._id = item.id
  }

  preloader(text) {
    this._element.querySelector(".form__button-save").textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._id);
    });
  };
}
