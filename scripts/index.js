import {Card, crateCards} from './Card.js';
export {openPopup, focusElement};

const profileInfo = document.querySelector(".profile__info");
const editProfileButton = profileInfo.querySelector(".profile__button");
const creatElementButton = document.querySelector(".profile__button-add");
const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupCreatElement = document.querySelector(".popup_type_creat-element");
const popupTypeImage = document.querySelector(".popup_type_image");
const formInputName = popupProfile.querySelector(".form__input_type_name");
const formInputProfession = popupProfile.querySelector(
  ".form__input_type_profession"
);
const profileTitle = profileInfo.querySelector(".profile__title");
const profileSubtitle = profileInfo.querySelector(".profile__subtitle");
const formElementEditProfile = popupProfile.querySelector(".form");
const formElementCreatElement = popupCreatElement.querySelector(".form");
const elementList = document.querySelector(".elements__grid-container");
const elementTemplate = document.querySelector(".element-template");
const popups = Array.from(document.querySelectorAll(".popup"));
const inputPlace = popupCreatElement.querySelector(".form__input_type_place");
const inputPlaceLink = popupCreatElement.querySelector(
  ".form__input_type_place-link"
);
const buttonSaveCard =
  formElementCreatElement.querySelector(".form__button-save");  
const buttonSaveProfile = formElementEditProfile.querySelector(".form__button-save");

//add element.
const addElement = (event) => {
  event.preventDefault();
  const newCard = new Card({
    name: inputPlace.value,
    link: inputPlaceLink.value
  }, '.element-template');
  const addNewCard = newCard.generateCard();
  elementList.prepend(addNewCard);
  closePopup(popupCreatElement);
  cleanInput(inputPlace, inputPlaceLink);
}

//Saves the text from the input to the profile.
const formSubmitHandler = (event) => {
  event.preventDefault();
  profileTitle.textContent = formInputName.value; //name;
  profileSubtitle.textContent = formInputProfession.value; //profession;
  closePopup(popupProfile);
}

//Makes the button inactive
const inactiveButton = (button) => {
  button.classList.add("form__button-save_inactive");
}

//Outputs the text from the profile to the input.
const fillInputText = () => {
  formInputName.value = profileTitle.textContent;
  formInputProfession.value = profileSubtitle.textContent;
}

//Cleans up inputs.
const cleanInput = (firstInput, secondInput) => {
  firstInput.value = "";
  secondInput.value = "";
}

//Set focus.
const focusElement = (element) => {
  element.querySelector(".popup__container").focus();
};

//Close handler popup.
const closeHandler = () => {
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        closePopup(popup);
      }
    });
  });
};

//Close handler popup by escape.
const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//Open popup.
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("keydown", closeByEscape);
};

//Close popup.
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("keydown", closeByEscape);
};


//Hide errors.
const hideError = (popup) => {
  const inputElements = Array.from(popup.querySelectorAll(".form__input_type_error"));
  const errorElements = Array.from(popup.querySelectorAll(".form__input-error"));
  inputElements.forEach((element) => {
    element.classList.remove("form__input_type_error");
  });
  errorElements.forEach((element) => {
    element.classList.remove("form__input-error_active");
    element.textContent = "";
  });
}

//Click handler edit profile button.
editProfileButton.addEventListener("click", () => {
  openPopup(popupProfile);
  fillInputText();
  focusElement(popupProfile);
  inactiveButton(buttonSaveProfile);
  hideError(popupProfile);
});

//Click handler add element button.
creatElementButton.addEventListener("click", () => {
  openPopup(popupCreatElement);
  cleanInput(inputPlace, inputPlaceLink);
  focusElement(popupCreatElement);
  inactiveButton(buttonSaveCard);
  hideError(popupCreatElement);
});

//Submit handler creat element.
formElementCreatElement.addEventListener("submit", addElement);

//Submit handler edit profile.
formElementEditProfile.addEventListener("submit", formSubmitHandler);

//Displaying initial content.
crateCards();

//Start close handler popup.
closeHandler();

