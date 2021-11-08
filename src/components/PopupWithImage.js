import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._element.querySelector(".popup__element-image");
    this.imageCaption = this._element.querySelector(".popup__image-caption");
  }

  open = (data) => {
    super.open();
    this._image.src = data.link;
    this._image.alt = data.name;
    this.imageCaption.textContent = data.name;
  };
}
