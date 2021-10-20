export {startenableValidation};

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

class FormValidator {
  constructor(data, cardSelector) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitSelector = data.submitSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

    this._cardSelector = cardSelector;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }

  //Handler input.
  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  //Valid or not valid.
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  //Button activity switch.
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //Validity - true or false.
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Show error text.
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Hide error text.
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
}

//Start validation.
function startenableValidation() {
  const newFormValidator = new FormValidator(validationConfig, ".form");
  newFormValidator.enableValidation();
}
