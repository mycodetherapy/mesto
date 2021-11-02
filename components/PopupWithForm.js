import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, formSubmitHandler }) {
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
    this._element = document.querySelector(selector);
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    document.querySelector(this._selector).classList.remove("popup_opened");
    document.removeEventListener("keydown", super._handleEscClose);
    this._element.querySelector(".form").reset();
  }

  setEventListeners(selector) {
    const popup = document.querySelector(selector);
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close(popup);
      }
      if (evt.target.classList.contains("form__button-save")) {
        this._formSubmitHandler(this._getInputValues());
      }
    });
  }
}
