import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, formSubmitHandler }) {
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
    this._inputList = this._element.querySelectorAll(".form__input");
    this._form = this._element.querySelector(".form");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  preloader(text) {
    this._element.querySelector(".form__button-save").textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      
      this._formSubmitHandler(this._getInputValues());
      
    });
  }
}
