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
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard(meId) {
    this._setEventListeners();
    this._removeElement(this._deleteButton, meId);
    this._toggleLike(this._likes, meId);

    this._element.id = this._idCard;
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeElement.textContent = this._likes.length;

    return this._element;
  }

  _toggleLike(arrLikes, meId) {
    arrLikes.forEach((element) => {
      if (element._id == meId) {
        this._likeButton.classList.add("element__like_active");
      }
    });
  }

  _removeElement(item, meId) {
    if (this._idUser !== meId) {
      item.remove();
    }
  }

  //listens to events in the element.
  _setEventListeners = () => {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleCardLike(this._likeButton);
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._element);
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  };
}
