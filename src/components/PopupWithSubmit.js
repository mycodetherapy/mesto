import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ selector, formSubmitHandler }) {
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._element.querySelector( ".form");
  }

  open = () => {
    super.open();
    const elemId = evt.target.closest("element")
    return elemId.id;
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      //console.log(this._getInputValues());
      this._formSubmitHandler();
    });
  };
}
