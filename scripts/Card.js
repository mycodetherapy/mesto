export { Card };
import { openPopup } from "./index.js";

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__element-image");
const popupImageCaption = popupTypeImage.querySelector(".popup__image-caption");

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners(); //Call after declaring class variables.

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  //Toggles likes.
  _switchLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  //Removes an element.
  _removeElement() {
    this._element.remove();
  }

  //Tears off an image for viewing
  _viewImage() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageCaption.textContent = this._name;

    openPopup(popupTypeImage);
  }

  //listens to events in the element.
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._switchLike();
      });
      
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._removeElement();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._viewImage();
      });
  }
}

