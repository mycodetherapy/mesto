export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(selector);
  }

  open() {
    document.querySelector(this._selector).classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  fillInputText({user_name, user_profession}) {
    this._element.querySelector('.form__input_type_name').value = user_name;
    this._element.querySelector('.form__input_type_profession').value = user_profession;
  }

  close() {
    document.querySelector(this._selector).classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      if (this._selector == ".popup_type_image") {
        this.close();
      } else {
        this.close();
        this._element.querySelector(".form").reset();
      }
    }
  };

  setEventListeners() {
    const popups = Array.from(document.querySelectorAll(".popup"));
    popups.forEach((popup) => {
      popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          this.close(popup);
        }
        if (evt.target.classList.contains("popup__close")) {
          this.close(popup);
        }
      });
    });
  }
}
