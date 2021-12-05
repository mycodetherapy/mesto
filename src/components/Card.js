export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleCardLike,
    handleDeleteClick
  ) {
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteClick = handleDeleteClick;

    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._likeCounter = this._element.querySelector(".element__like-counter");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard(userData) {
    this._setEventListeners();
    this._removeElement(this._deleteButton, userData);
    this._paintLike(this._likes, userData);

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  }

  toggleLikeView = (dataLike) => {
    this._likeCounter.textContent = dataLike.length;
    this._likeButton.classList.toggle("element__like_active");
  };

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  checkForLike(userData) {
    return this._likes.some(user => user._id === userData._id);//this._likes._id.includes(userData._id);
  }

  setLike(datalikes) {
    this._likes = datalikes;
  }

  _paintLike(arrLikes, userData) {
    arrLikes.forEach((element) => {
      if (element._id == userData._id) {
        this._likeButton.classList.add("element__like_active");
      }
    });
  }

  _removeElement(item, userData) {
    if (this._owner._id !== userData._id) {
      item.remove();
    }
  }

  //listens to events in the element.
  _setEventListeners = () => {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleCardLike();
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  };
}
