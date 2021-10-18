//Show error text.
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

//Hide error text.
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// const handlerEnterSubmit = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(".form__input"));
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener(
//       "keydown",
//       function disableEnterSubmit(event) {
//         if (event.key === "Enter") event.preventDefault();
//       }
//     );
//   });
// };

const toggleEnterState = (inputList, config) => {
  if (hasInvalidForm(inputList)) { console.log('qqq');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener(
        "keydown",
        function disableEnterSubmit(event) {
          if (event.key === "Enter") event.preventDefault();
        }
      );
    });
  } else { console.log('www');
    // inputList.forEach((inputElement) => {
    //   inputElement.removeEventListener("keydown", disableEnterSubmit);
    // });
   }
};

const hasInvalidForm = (inputList) => {
 return inputList.every(xxx(inputList));
  // return inputList.every((inputElement) => {
  //   return !inputElement.validity.valid;
  // });
};

const xxx = (inputList) => {
  inputList.forEach((elem) => {
    return !elem.validity.valid;
  });
}

//console.log(hasInvalidForm(formElem));

//Validity - true or false.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Button activity switch.
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    //console.log(hasInvalidForm(inputList));
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    //console.log(hasInvalidForm(inputList));
  }
};

//Valid or not valid.
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

//Handler input.
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
      toggleEnterState(inputList, config);
    });
  });
};

//Start validation.
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);
