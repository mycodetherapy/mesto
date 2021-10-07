const profileInfo = document.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__button");
const creatElementButton = document.querySelector(".profile__button-add");
const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupCreatElement = document.querySelector(".popup_type_creat-element");
const popupTypeImage = document.querySelector(".popup_type_image");
const closePopupProfile = popupProfile.querySelector(".popup__close");
const closePopupCreatElement = popupCreatElement.querySelector(".popup__close");
const formInputName = popupProfile.querySelector(".form__input_type_name");
const formInputProfession = popupProfile.querySelector(
  ".form__input_type_profession"
);
const profileTitle = profileInfo.querySelector(".profile__title");
const profileSubtitle = profileInfo.querySelector(".profile__subtitle");
const formElementEditProfile = popupProfile.querySelector(".form");
const formElementCreatElement = popupCreatElement.querySelector(".form");
const elementBox = document.querySelector(".elements__grid-container");
const elementList = document.querySelector(".elements__grid-container");
const elementTemplate = document.querySelector(".element-template");
const closePopupImage = popupTypeImage.querySelector(".popup__close");
const popupImage = popupTypeImage.querySelector(".popup__element-image");
const popupImageCaption = popupTypeImage.querySelector(".popup__image-caption");
const inputPlace = popupCreatElement.querySelector(".form__input_type_place");
const inputPlaceLink = popupCreatElement.querySelector(
  ".form__input_type_place-link"
);
const initialCards = [
  {
    name: "Нарьян-Мар",
    link: "https://live.staticflickr.com/65535/49467519261_64e10478ed_b.jpg",
  },
  {
    name: "Диксон",
    link: "https://live.staticflickr.com/4688/38761938434_a8488ff5d9_b.jpg",
  },
  {
    name: "Дудинка",
    link: "https://live.staticflickr.com/5525/10904348995_de06885b26_b.jpg",
  },
  {
    name: "Белушья Губа",
    link: "https://live.staticflickr.com/4271/34038884623_422f053a4b_c.jpg",
  },
  {
    name: "Магадан",
    link: "https://live.staticflickr.com/4037/4382400584_b2a96a3b8d_c.jpg",
  },
  {
    name: "Тикси",
    link: "https://live.staticflickr.com/65535/50754839667_8f4ee620a8_b.jpg",
  },
];

//Displaying initial content.
addCards(initialCards);

//Сreates element.
function createCard(item) {
  const newCard = elementTemplate.content.cloneNode(true);
  const namePlace = newCard.querySelector(".element__title");
  const linkPlace = newCard.querySelector(".element__image");
  namePlace.textContent = item.name;
  linkPlace.src = item.link;
  linkPlace.alt = item.name;
  setListenerToElement(newCard);
  return newCard;
}

//Adds elements from an array.
function addCards(cards) {
  const newCards = cards.map(createCard);
  elementList.append(...newCards);
}

//toggles popup.
function togglePopup(pop) {
  pop.classList.toggle("popup_opened");
}

//adds element.
function addElement(event) {
  event.preventDefault();
  const newCard = createCard({
    name: inputPlace.value,
    link: inputPlaceLink.value,
  });
  elementList.prepend(newCard);
  togglePopup(popupCreatElement);
  cleanInput(inputPlace, inputPlaceLink);
}

//Saves the text from the input to the profile.
function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = formInputName.value; //name;
  profileSubtitle.textContent = formInputProfession.value; //profession;
  togglePopup(popupProfile);
}

//Outputs the text from the profile to the input.
function fillInputText() {
  formInputName.value = profileTitle.textContent;
  formInputProfession.value = profileSubtitle.textContent;
}

//Cleans up inputs.
function cleanInput(firstInput, secondInput) {
  firstInput.value = "";
  secondInput.value = "";
}

//Toggles likes.
function switchLike(event) {
  const target = event.target;
  target.classList.toggle("element__like_active");
}

//Removes an element.
function removeElement(event) {
  const listItemRemove = event.currentTarget.closest(".element");
  listItemRemove.remove();
}

//Tears off an image for viewing
function viewImage(event) {
  const target = event.target;
  const elementContent = target.parentElement;
  const targetImage = elementContent.querySelector(".element__image");

  popupImage.src = targetImage.src;
  popupImage.alt = targetImage.alt;
  popupImageCaption.textContent = targetImage.alt;

  togglePopup(popupTypeImage);
}

//listens to events in the element.
function setListenerToElement(element) {
  element.querySelector(".element__like").addEventListener("click", switchLike);

  element
    .querySelector(".element__delete")
    .addEventListener("click", removeElement);

  element.querySelector(".element__image").addEventListener("click", viewImage);
}

//Catches a click on the edit button.
editButton.addEventListener(
  "click",
  () => {
    togglePopup(popupProfile); 
    fillInputText();
  });

//Catches a click on the add element button.
creatElementButton.addEventListener("click", () =>
  togglePopup(popupCreatElement)
);
//Catches the closing of the profile editor.
closePopupProfile.addEventListener("click", () => togglePopup(popupProfile));
//Catches the closing of the add element editor.
closePopupCreatElement.addEventListener("click", () =>
  togglePopup(popupCreatElement)
);
//Catches the closing of the image viewing mode.
closePopupImage.addEventListener("click", () => togglePopup(popupTypeImage));
//Catches the submission of the form for adding an element.
formElementCreatElement.addEventListener("submit", addElement);
//Catches sending the profile editing form.
formElementEditProfile.addEventListener("submit", formSubmitHandler);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector('.form__button-save');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__button-save_inactive");
  } else {
    buttonElement.classList.remove("form__button-save_inactive");
  }
}
