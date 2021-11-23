export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardLike, handleDeleteClick) {

    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteClick = handleDeleteClick;
    //this._handleDelIcon = handleDelIcon;

    this._name = data.name;
    this._link = data.link;
    this._idCard = data._id;
    this._idUser = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._likeElement = this._element.querySelector(".element__like-counter");

    //this._meId = "";
  }

  // getMeId = (item) => {
  //   this._meId = item;
  //   console.log(this._meId);
  // }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)//(".element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners(); //Call after declaring class variables.
    console.log(this._idUser);
    this._removeElement(this._deleteButton);

    this._element.id = this._idCard;
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeElement.textContent = this._likes.length;

    return this._element;
  }

  //Toggles likes.
  // _switchLike() {
  //   this._likeButton.classList.toggle("element__like_active");
  // }

  //Removes an element.
  // _removeElement() {
  //   this._element.remove();
  // }

  _removeElement(item) {
    if(this._idUser != "be37446b0ec3361aa8023c78")
    item.remove();
    //this._handleDelIcon();
    //this._element.remove();
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

