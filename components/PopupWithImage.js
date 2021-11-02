import Popup from "./Popup.js";

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__element-image");
const popupImageCaption = popupTypeImage.querySelector(".popup__image-caption");

export default class PopupWithImage extends Popup {
  constructor(data, selector) {
    super(selector);
    this._link = data.link;
    this._name = data.name;
  }

  open = () => { 
    document.querySelector(this._selector).classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageCaption.textContent = this._name;
    super.setEventListeners();
  }
}
