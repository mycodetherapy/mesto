export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    document.querySelector(this._selector).classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.querySelector(this._selector).classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      //const openedPopup = document.querySelector(".popup_opened");
      this.close();
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
