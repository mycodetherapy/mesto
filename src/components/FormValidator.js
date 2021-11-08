export { FormValidator, validationConfig };

const validationConfig = {
  inputSelector: ".form__input",
  submitSelector: ".form__button-save",
  spanErrorSelector: ".form__input-error",
  inactiveButtonClass: "form__button-save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitSelector = data.submitSelector;
    this._spanErrorSelector = data.spanErrorSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

    this._formSelector = formSelector;
    this._form = document.querySelector(this._formSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitSelector);
  }

  //Start validation.
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //Handler input.
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Valid or not valid.
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Reset error.
  resetValidation() {
    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  //Hide errors.
  _hideError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.nextElementSibling.classList.remove(this._errorClass);
    inputElement.nextElementSibling.textContent = "";
  }

  //Button activity switch.
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false
    }
  }

  //Validity - true or false.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Show error text.
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Hide error text.
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
}
