export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardLike, handleDeleteClick) {

    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteClick = handleDeleteClick;

    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)//(".element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners(); //Call after declaring class variables.
    this._element.id = this._id;
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

  //listens to events in the element.
  _setEventListeners = () => {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleCardLike(this._likeButton);
        //this._switchLike();
      });
      
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._element);
        //this._removeElement();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}

