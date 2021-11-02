import "./index.css"
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
  formElementEditProfile,
  formElementCreatElement,
  elementList,
  elementListSelector,
  templateSelector,
  popupImageSelector,
} from "../utils/constants.js";

//Return finished card.
const createCard = (item, element, handleCardClick) => {
  return new Card(
    item,
    element,
    (handleCardClick = () => {
      const popupWithImage = new PopupWithImage(item, ".popup_type_image");
      popupWithImage.open();
    })
  );
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, templateSelector).generateCard();
      cardsList.addItem(cardElement);
    },
  },
  elementListSelector
);

cardsList.renderItems();

const addElement = new PopupWithForm({
  selector: popupCreatElementSelector,
  formSubmitHandler: (formData) => {
    // event.preventDefault();
    const newCard = createCard(
      {
        name: formData["place-name"],
        link: formData["link-to-image"],
      },
      templateSelector,
      () => {
        const popupWithImage = new PopupWithImage(item, popupImageSelector);
        popupWithImage.open();
      }
    );
    const addNewCard = newCard.generateCard();
    elementList.prepend(addNewCard);
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
  formSubmitHandler: () => {
    userInfo.setUserInfo();
    editprofile.close();
  },
});

//Click handler edit profile button.
const editprofile = new Popup(popupProfileSelector);
editProfileButton.addEventListener("click", () => {
  editprofile.open();
  editprofile.setEventListeners();
  editprofile.fillInputText(userInfo.getUserInfo());
  editProfileFormValidator.resetValidation();
});

//Click handler add element button.
const creatElement = new Popup(popupCreatElementSelector);
creatElementButton.addEventListener("click", () => {
  creatElement.open();
  creatElement.setEventListeners();
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
formElementCreatElement.addEventListener(
  "submit",
  addElement.setEventListeners(popupCreatElementSelector)
);

//Submit handler edit profile.
formElementEditProfile.addEventListener(
  "submit",
  formSubmitHandlerProfile.setEventListeners(popupProfileSelector)
);
