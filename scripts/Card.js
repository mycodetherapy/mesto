export { Card };
import { openPopup } from "./index.js";
import PopupWithImage from "../components/PopupWithImage.js"

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__element-image");
const popupImageCaption = popupTypeImage.querySelector(".popup__image-caption");

// const instancePopupWithImage = new PopupWithImage(".popup_type_image");

class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data; //Временно
    this._handleCardClick = handleCardClick;

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

      //console.log(cardElement)

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
    // console.log(this._link)
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageCaption.textContent = this._name;

    openPopup(popupTypeImage);
  }

  //listens to events in the element.
  _setEventListeners = () => {
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
        this._handleCardClick();
        //this._viewImage();
        //const instancePopupWithImage = new PopupWithImage(this._data, ".popup_type_image");
        //instancePopupWithImage.open();
      });
  }
}

