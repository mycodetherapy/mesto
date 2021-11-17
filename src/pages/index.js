import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  initialCards,
  editProfileButton,
  creatElementButton,
  popupCreatElementSelector,
  popupProfileSelector,
  popupImageSelector,
  elementListSelector,
  templateSelector,
  nameEditProfileSelector,
  jobEditProfileSelector,
  nameEditProfile,
  jobEditProfile,
  nameInput,
  jobInput,
  placeName,
  linkToImageName,
  userName,
  userProfessionName,
  validationConfig,
} from "../utils/constants.js";

const user = new Api(); 
//const userData = user.getUserInfo();

user.getUserInfo();

//nameEditProfile.textContent = userData["name"];
//jobEditProfile.textContent = userData["about"];

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

const popupWithImage = new PopupWithImage(popupImageSelector);

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
        name: formData[placeName],
        link: formData[linkToImageName],
      },
      templateSelector
    );
    const addNewCard = newCard.generateCard();
    cardsList.prependItem(addNewCard);
    addElement.close();
  },
});

const userInfo = new UserInfo({
  userName: nameEditProfileSelector,
  userProfession: jobEditProfileSelector,
});

//Saves the text from the input to the profile.
const formSubmitHandlerProfile = new PopupWithForm({
  selector: popupProfileSelector,
  formSubmitHandler: (formData) => {
    userInfo.setUserInfo(formData[userName], formData[userProfessionName]);
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
  nameInput.value = getUserInfo[userName];
  jobInput.value = getUserInfo[userProfessionName];

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
