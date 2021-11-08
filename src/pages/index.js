import "./index.css";
import Card from "../components/Card.js";
import {
  FormValidator,
  validationConfig,
} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  editProfileButton,
  creatElementButton,
  popupCreatElementSelector,
  popupProfileSelector,
  elementListSelector,
  templateSelector,
  nameEditProfile,
  jobEditProfile,
  nameInput,
  jobInput,
} from "../utils/constants.js";

//Return finished card.
const createCard = (item, element, handleCardClick) => {
  return new Card(
    item,
    element,
    (handleCardClick = () => {
      popupWithImage.open(item);
    })
  );
};

const popupWithImage = new PopupWithImage(".popup_type_image");

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, templateSelector).generateCard();
      cardsList.appendItem(cardElement);
    },
  },
  elementListSelector
);

cardsList.renderItems();

const addElement = new PopupWithForm({
  selector: popupCreatElementSelector,
  formSubmitHandler: (formData) => {
    const newCard = createCard(
      {
        name: formData["place-name"],
        link: formData["link-to-image"],
      },
      templateSelector
    );
    const addNewCard = newCard.generateCard();
    cardsList.prependItem(addNewCard);
    addElement.close();
  },
});

const userInfo = new UserInfo({
  userName: ".profile__title",
  userProfession: ".profile__subtitle",
});

//Saves the text from the input to the profile.
const formSubmitHandlerProfile = new PopupWithForm({
  selector: popupProfileSelector,
  formSubmitHandler: (formData) => {
    userInfo.setUserInfo(formData["user_name"], formData["user_profession"]);
    userInfo.updateUserInfo();
    editprofile.close();
  },
});

//Initial form data.
userInfo.setUserInfo(nameEditProfile.textContent, jobEditProfile.textContent);

//Click handler edit profile button.
const editprofile = new Popup(popupProfileSelector);
editProfileButton.addEventListener("click", () => {
  editprofile.open();

  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo["user_name"];
  jobInput.value = getUserInfo["user_profession"];

  editProfileFormValidator.resetValidation();
});

//Click handler add element button.
const creatElement = new Popup(popupCreatElementSelector);
creatElementButton.addEventListener("click", () => {
  creatElement.open();
  createElementFormValidator.resetValidation();
});

//Create instances FormValidator.
const editProfileFormValidator = new FormValidator(
  validationConfig,
  popupProfileSelector
);
const createElementFormValidator = new FormValidator(
  validationConfig,
  popupCreatElementSelector
);

//Start validation.
editProfileFormValidator.enableValidation();
createElementFormValidator.enableValidation();

//Submit handler creat element.
addElement.setEventListeners();

//Submit handler edit profile.
formSubmitHandlerProfile.setEventListeners();

//Submit handler click image.
popupWithImage.setEventListeners();

