import { Card } from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
export { openPopup };

const profileInfo = document.querySelector(".profile__info");
const editProfileButton = profileInfo.querySelector(".profile__button");
const creatElementButton = document.querySelector(".profile__button-add");
const popupCreatElement = document.querySelector(".popup_type_creat-element");
const popupProfile = document.querySelector(".popup_type_edit-profile");
const formInputName = popupProfile.querySelector(".form__input_type_name");
const formInputProfession = popupProfile.querySelector(
  ".form__input_type_profession"
);
const profileTitle = profileInfo.querySelector(".profile__title");
const profileSubtitle = profileInfo.querySelector(".profile__subtitle");
const formElementEditProfile = popupProfile.querySelector(".form");
const formElementCreatElement = popupCreatElement.querySelector(".form");
const elementList = document.querySelector(".elements__grid-container");
const elementListSection = ".elements__grid-container";
const popups = Array.from(document.querySelectorAll(".popup"));

export const inputPlace = popupCreatElement.querySelector(
  ".form__input_type_place"
);
export const inputPlaceLink = popupCreatElement.querySelector(
  ".form__input_type_place-link"
);

const handleCardClick = () => {
  const instancePopupWithImage = new PopupWithImage(
    item,
    ".popup_type_image"
  );
  instancePopupWithImage.open();
};

//Return finished card.
const createCard = (item, element, handleCardClick = () => {
  const instancePopupWithImage = new PopupWithImage(
    item,
    ".popup_type_image"
  );
  instancePopupWithImage.open();
}) => {
  return new Card(item, element, handleCardClick);
};

const cardsList = new Section(
  {
    items: initialCards, //Массив с карточками т.е. это "data"
    renderer: (item) => {
      const cardElement = createCard(item, ".element-template").generateCard();
      cardsList.addItem(cardElement); //Заменили elementList на cardsList
    },
  },
  //".elements__grid-container"
  elementListSection //Контейнер в который будут рендериться карточки.
);

cardsList.renderItems();

//add element.
const addElement = (event) => {
  event.preventDefault();
  const newCard = createCard(
    {
      name: inputPlace.value,
      link: inputPlaceLink.value,
    },
    ".element-template",
    handleCardClick()
  );
  const addNewCard = newCard.generateCard();
  elementList.prepend(addNewCard);
  //closePopup(popupCreatElement);
  instanceCreatElement.close();
  cleanInput(inputPlace, inputPlaceLink);
};

//Saves the text from the input to the profile.
const formSubmitHandler = (event) => {
  event.preventDefault();
  profileTitle.textContent = formInputName.value; //name;
  profileSubtitle.textContent = formInputProfession.value; //profession;
  //closePopup(popupProfile);
  instanceEditprofile.close();
};

//Outputs the text from the profile to the input.
const fillInputText = () => {
  formInputName.value = profileTitle.textContent;
  formInputProfession.value = profileSubtitle.textContent;
};

//Cleans up inputs.
const cleanInput = (firstInput, secondInput) => {
  firstInput.value = "";
  secondInput.value = "";
};

//Close handler popup.
// const closeHandler = () => {
//   popups.forEach((popup) => {
//     popup.addEventListener("click", (evt) => {
//       if (evt.target.classList.contains("popup_opened")) {
//         closePopup(popup);
//       }
//       if (evt.target.classList.contains("popup__close")) {
//         closePopup(popup);
//       }
//     });
//   });
// };

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
  document.addEventListener("keydown", closeByEscape);
};

//Close popup.
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

//Add cards in DOM
// const addCards = () => {
//   initialCards.forEach((item) => {
//     const cardElement = createCard(item, ".element-template").generateCard();
//     elementList.append(cardElement);
//   });
// };

//Click handler edit profile button.
const instanceEditprofile = new Popup(".popup_type_edit-profile");
editProfileButton.addEventListener("click", () => {
  //openPopup(popupProfile);
  instanceEditprofile.open();
  instanceEditprofile.setEventListeners();
  fillInputText();
  editProfileFormValidator.resetValidation();
});

//Click handler add element button.
const instanceCreatElement = new Popup(".popup_type_creat-element");
creatElementButton.addEventListener("click", () => {
  //openPopup(popupCreatElement);
  instanceCreatElement.open();
  instanceCreatElement.setEventListeners();
  cleanInput(inputPlace, inputPlaceLink);
  createElementFormValidator.resetValidation();
});

//Create instances FormValidator.
const editProfileFormValidator = new FormValidator(
  validationConfig,
  ".popup_type_edit-profile"
);
const createElementFormValidator = new FormValidator(
  validationConfig,
  ".popup_type_creat-element"
);

//Start validation.
editProfileFormValidator.enableValidation();
createElementFormValidator.enableValidation();

//Submit handler creat element.
formElementCreatElement.addEventListener("submit", addElement);
//formElementCreatElement.addEventListener("submit", cardsList); //а с cardsList

//Submit handler edit profile.
formElementEditProfile.addEventListener("submit", formSubmitHandler);

//Displaying initial content.
//addCards();

//Start close handler popup.
//closeHandler();
