import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

import {
  initialCards,
  editProfileButton,
  creatElementButton,
  popupCreatElementSelector,
  popupProfileSelector,
  popupImageSelector,
  popupDeleteSelector,
  popupAvatarSelector,
  elementListSelector,
  templateSelector,
  nameEditProfileSelector,
  jobEditProfileSelector,
  avatarSelector,
  nameEditProfile,
  jobEditProfile,
  avatarProfile,
  editAvatarCliker,
  nameInput,
  jobInput,
  placeName,
  linkToImageName,
  userName,
  userProfessionName,
  validationConfig,
  urlUser,
  urlCards,
  tocenUser,
  configApi,
  newUserInfo,
  avatar,
  elementDeleteButton,
  elementList,
} from "../utils/constants.js";

//import { reject, resolve } from "../../node_modules/core-js/es/promise";

const api = new Api(configApi);

let userInfoData = null;

//Return finished card.
function createCard(
  item,
  element,
  handleCardClick,
  handleCardLike,
  handleDeleteClick
) {
  return new Card(
    item,
    element,
    (handleCardClick = () => {
      popupWithImage.open(item);
    }),
    (handleCardLike = (elem) => {
      const likeContainer = elem.closest(".element__like-container");
      const likeCounter = likeContainer.querySelector(".element__like-counter");
      if (!elem.classList.contains("element__like_active")) {
        api
          .addleLike(elem.closest(".element").id)
          .then((data) => {
            likeCounter.textContent = data.likes.length;
            elem.classList.add("element__like_active");
          })
          .catch((err) => console.log(err));
      } else {
        api
          .removeLike(elem.closest(".element").id)
          .then((data) => {
            likeCounter.textContent = data.likes.length;
            elem.classList.remove("element__like_active");
          })
          .catch((err) => console.log(err));
      }
    }),
    (handleDeleteClick = (item) => {
      deleteElementHendler.action(item);
      deleteCard.open();
    })
  );
}

// //function initialRenderCard(data) {
const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item, templateSelector).generateCard(userInfoData._id);
      cardsList.appendItem(cardElement);
    },
  },
  elementListSelector
);

const userInfo = new UserInfo({
  userName: nameEditProfileSelector,
  userProfession: jobEditProfileSelector,
  userAvatar: avatarSelector,
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
const editAvatarFormValidator = new FormValidator(
  validationConfig,
  popupAvatarSelector
);

const addElement = new PopupWithForm({
  selector: popupCreatElementSelector,
  formSubmitHandler: (formData) => {
    api
      .addTasks(formData)
      .then((formData) => {
        console.log(formData);
        const newCard = createCard(
          {
            name: formData.name,
            link: formData.link,
            _id: formData._id,
            likes: formData.likes,
            owner: formData.owner,
          },

          templateSelector
        );
        console.log(formData);
        const addNewCard = newCard.generateCard();
        cardsList.prependItem(addNewCard);
        addElement.close();
      })
      .catch((err) => console.log(err));
  },
});

const deleteElementHendler = new PopupWithSubmit({
  selector: popupDeleteSelector,
  formSubmitHandler: (formData) => {
    api
      .removeTasks(formData)
      .then(() => {
        document.getElementById(formData).remove();
        deleteCard.close();
      })
      .catch((err) => console.log(err));
  },
});

const popupWithImage = new PopupWithImage(popupImageSelector);

//Saves the text from the input to the profile.
const formSubmitHandlerProfile = new PopupWithForm({
  selector: popupProfileSelector,
  formSubmitHandler: (formData) => {
    api.setUserInfo(formData).then(() => {
      api
        .getUserInfo()
        .then((data) => {
          userInfo.setUserInfo(data.name, data.about);
          console.log(data);
          editprofile.close();
        })
        .catch((err) => console.log(err));
    });
  },
});

const popupWithAvatar = new PopupWithForm({
  selector: popupAvatarSelector,
  formSubmitHandler: (formData) => {
    api
      .setAvatar(formData)
      .then(() => {
        userInfo.setAvatar(formData.avatar);
        editAvatar.close();
      })
      .catch((err) => console.log(err));
  },
});

const deleteCard = new Popup(popupDeleteSelector);
const editprofile = new Popup(popupProfileSelector);
const creatElement = new Popup(popupCreatElementSelector);
const editAvatar = new Popup(popupAvatarSelector);

api
  .getUserInfo()
  .then((data) => {
    userInfoData = data;
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setAvatar(data.avatar);
    
  }).catch(err => console.log(err))
  .then(() =>
    api.getCards().then((data) => {
      console.log(data);
      addElement.setEventListeners();
      //console.log(userInfoData._id);
      cardsList.renderItems(data);
    })
  ).catch(err => console.log(err));

editProfileButton.addEventListener("click", () => {
  editprofile.open();

  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.about;

  editProfileFormValidator.resetValidation();
});

creatElementButton.addEventListener("click", () => {
  creatElement.open();
  createElementFormValidator.resetValidation();
});

editAvatarCliker.addEventListener("click", () => {
  editAvatar.open();
  editAvatarFormValidator.resetValidation();
});

//Start validation.
editProfileFormValidator.enableValidation();
createElementFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

//Submit handlers.
// addElement.setEventListeners();
deleteElementHendler.setEventListeners();
formSubmitHandlerProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithAvatar.setEventListeners();