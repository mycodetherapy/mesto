const profileInfo = document.querySelector(".profile__info");
const editProfileButton = profileInfo.querySelector(".profile__button");
const creatElementButton = document.querySelector(".profile__button-add");
const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupCreatElement = document.querySelector(".popup_type_creat-element");
const popupTypeImage = document.querySelector(".popup_type_image");
//const closePopupProfile = popupProfile.querySelector(".popup__close");
//const closePopupCreatElement = popupCreatElement.querySelector(".popup__close");
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
const popups = Array.from(document.querySelectorAll(".popup"));

//const closePopupImage = popupTypeImage.querySelector(".popup__close");
const popupImage = popupTypeImage.querySelector(".popup__element-image");
const popupImageCaption = popupTypeImage.querySelector(".popup__image-caption");
const inputPlace = popupCreatElement.querySelector(".form__input_type_place");
const inputPlaceLink = popupCreatElement.querySelector(
  ".form__input_type_place-link"
);
const buttonSaveCard =
  formElementCreatElement.querySelector(".form__button-save");  
const buttonSaveProfile = formElementEditProfile.querySelector(".form__button-save");
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

//adds element.
function addElement(event) {
  event.preventDefault();
  const newCard = createCard({
    name: inputPlace.value,
    link: inputPlaceLink.value,
  });
  elementList.prepend(newCard);
  closePopup(popupCreatElement);
  cleanInput(inputPlace, inputPlaceLink);
  //inactiveButton(formButtonSave);
}

//Saves the text from the input to the profile.
function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = formInputName.value; //name;
  profileSubtitle.textContent = formInputProfession.value; //profession;
  closePopup(popupProfile);
}

//Tears off an image for viewing
function viewImage(event) {
  const target = event.target;
  const elementContent = target.parentElement;
  const targetImage = elementContent.querySelector(".element__image");

  popupImage.src = targetImage.src;
  popupImage.alt = targetImage.alt;
  popupImageCaption.textContent = targetImage.alt;

  openPopup(popupTypeImage);
  focusElement(popupTypeImage);
  //keydownHandler(popupTypeImage);
}

//toggles popup.
// function togglePopup(popup) {
//   popup.classList.toggle("popup_opened");
// }

function inactiveButton(button) {
  button.classList.add("form__button-save_inactive");
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

const focusElement = (element) => {
  element.querySelector(".popup__container").focus();
};

//listens to events in the element.
function setListenerToElement(element) {
  element.querySelector(".element__like").addEventListener("click", switchLike);

  element
    .querySelector(".element__delete")
    .addEventListener("click", removeElement);

  element.querySelector(".element__image").addEventListener("click", viewImage);
}

//Catches a click on the edit button.
editProfileButton.addEventListener("click", () => {
  openPopup(popupProfile);
  fillInputText();
  focusElement(popupProfile);
  inactiveButton(buttonSaveProfile);
});

//Catches a click on the add element button.
creatElementButton.addEventListener("click", () => {
  openPopup(popupCreatElement);
  cleanInput(inputPlace, inputPlaceLink);
  focusElement(popupCreatElement);
  inactiveButton(buttonSaveCard);
});

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

//forms close handler.
// const closeClickHandler = () => {
//   popups.forEach((button) => {
//     button.querySelector(".popup__close").addEventListener("click", (event) => {
//       const targetForm = event.currentTarget.closest(".popup");
//       togglePopup(targetForm);
//       hideInputErrorIfClose(
//         targetForm,
//         Array.from(targetForm.querySelectorAll(".form__input"))
//       );
//     });
//   });
// };

// //Click overlay handler.
// const clickOverlayHandler = () => {
//   popups.forEach((popup) => {
//     popup
//       .querySelector(".popup__container")
//       .parentElement.addEventListener("click", (event) => {
//         if (!event.target.classList.contains("popup")) return;
//         const targetPopup = event.target;
//         togglePopup(targetPopup);
//         hideInputErrorIfClose(
//           targetPopup,
//           Array.from(targetPopup.querySelectorAll(".form__input"))
//         );
//       });
//   });
// };

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("keydown", closeByEscape);
};

//Keydown esc handler.
// const keydownHandler = (popup) => {
//   popup.addEventListener("keydown", function escListener(event) {
//     if (event.key === "Escape") {
//       const targetPopup = event.target.closest(".popup_opened");
//       togglePopup(targetPopup);
//       hideInputErrorIfClose(
//         targetPopup,
//         Array.from(targetPopup.querySelectorAll(".form__input"))
//       );
//       popup.removeEventListener("keydown", escListener);
//     }
//   });
// };

//Reset error.
const hideInputErrorIfClose = (formElements, inputElements) => {
  const errorElements = Array.from(
    formElements.querySelectorAll(".form__input-error")
  );
  inputElements.forEach((element) => {
    element.classList.remove("form__input_type_error");
  });
  errorElements.forEach((element) => {
    element.classList.remove("form__input-error_active");
    element.textContent = "";
  });
};

//Catches the submission of the form for adding an element.
formElementCreatElement.addEventListener("submit", addElement);
//Catches sending the profile editing form.
formElementEditProfile.addEventListener("submit", formSubmitHandler);

//Displaying initial content.
addCards(initialCards);

closeHandler();
//closeClickHandler();
//clickOverlayHandler();
