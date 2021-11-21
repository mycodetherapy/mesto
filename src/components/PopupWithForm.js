import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, formSubmitHandler }) {
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
    this._inputList = this._element.querySelectorAll(".form__input");
    this._form = this._element.querySelector( ".form");
    //this._api = api;
    //this._serv = serv;
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
    this._form .reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      //  this._api.addTasks(this._getInputValues())
      //  .then(data => this._formSubmitHandler(data))
      //  .catch(err => console.log(err))

      //this._serv(this._getInputValues());
      console.log(this._getInputValues());
      this._formSubmitHandler(this._getInputValues());
      
    });
  }
}
