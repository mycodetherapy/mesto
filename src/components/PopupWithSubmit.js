import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ selector, formSubmitHandler }) {
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._element.querySelector(".form__button-save");
    this._id = "";
  }

  open = (elemId) => {
    super.open();
    this._id = elemId.id
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      console.log(this._id);
      this._formSubmitHandler(this._id);
    });
  };
}
