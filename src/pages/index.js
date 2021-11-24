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
  elementListSelector,
  templateSelector,
  nameEditProfileSelector,
  jobEditProfileSelector,
  nameEditProfile,
  jobEditProfile,
  avatarProfile,
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
        api.addleLike(elem.closest(".element").id).then((data) => {
          likeCounter.textContent = data.likes.length;
          elem.classList.add("element__like_active");
        });
      } else {
        api.removeLike(elem.closest(".element").id).then((data) => {
          likeCounter.textContent = data.likes.length;
          elem.classList.remove("element__like_active");
        });
      }
    }),
    (handleDeleteClick = (item) => {
      deleteElementHendler.action(item)
      deleteCard.open();
      deleteElementHendler.showId();
      //deleteElementHendler.setEventListeners();
    })
  );
}

//function initialRenderCard(data) {
const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item, templateSelector).generateCard();
      cardsList.appendItem(cardElement);
    },
  },
  elementListSelector
);

// function fillUserInfo(data) {
//   console.log(data);
//   nameEditProfile.textContent = data["name"];
//   jobEditProfile.textContent = data["about"];
//   avatarProfile.src = data["avatar"];
// }

const userInfo = new UserInfo({
  userName: nameEditProfileSelector,
  userProfession: jobEditProfileSelector,
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

const addElement = new PopupWithForm({
  selector: popupCreatElementSelector,
  formSubmitHandler: (formData) => {
    api.addTasks(formData).then((formData) => {
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
    });
  },
});


const deleteElementHendler = new PopupWithSubmit({
  selector: ".popup_type_delete-element",
  formSubmitHandler: (formData) => {
    
    api.removeTasks(formData).then(() => {
      document.getElementById(formData).remove();
      deleteCard.close();
      // api.getUserInfo().then((data) => {
      //   userInfo.setUserInfo(data.name, data.about);
      //   console.log(data);
      //   userInfo.updateUserInfo();
      //   editprofile.close();
      // });
    });
  },
});

const popupWithImage = new PopupWithImage(popupImageSelector);

//Saves the text from the input to the profile.
const formSubmitHandlerProfile = new PopupWithForm({
  selector: popupProfileSelector,
  formSubmitHandler: (formData) => {
    api.setUserInfo(formData).then(() => {
      api.getUserInfo().then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        console.log(data);
        userInfo.updateUserInfo();
        editprofile.close();
      });
    });
  },
});

const deleteCard = new Popup(".popup_type_delete-element");
const editprofile = new Popup(popupProfileSelector);
const creatElement = new Popup(popupCreatElementSelector);

api
  .getUserInfo()
  .then((data) => {
    userInfoData = data;
    userInfo.setUserInfo(data.name, data.about);
    userInfo.updateUserInfo();
    deleteElementHendler.setEventListeners();
  })
  .then(
    (
      deleteElementHendler,
      popupWithImage,
      addElement,
      formSubmitHandlerProfile,
      editprofile,
      creatElement,
      editProfileFormValidator,
      createElementFormValidator
    ) =>
      api.getCards().then((data) => {
        console.log(data);
        cardsList.renderItems(data);
      })
    //  .then(() => deleteElementHendler.setEventListeners())
  );

editProfileButton.addEventListener("click", () => {
  editprofile.open();

  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name; //[userName];
  jobInput.value = getUserInfo.about; //[userProfessionName];

  editProfileFormValidator.resetValidation();
});

creatElementButton.addEventListener("click", () => {
  creatElement.open();
  createElementFormValidator.resetValidation();
});

//Start validation.
editProfileFormValidator.enableValidation();
createElementFormValidator.enableValidation();

//Submit handler creat element.
addElement.setEventListeners();

//Submit handler edit profile.
formSubmitHandlerProfile.setEventListeners();

//Submit handler click image.
popupWithImage.setEventListeners();

// deleteElementHendler.setEventListeners();

// .then(api.setAvatar(avatar));
//.then(api.setUserInfo(newUserInfo));

//Initial form data.

//userInfo.setUserInfo(nameEditProfile.textContent, jobEditProfile.textContent);

//Click handler edit profile button.
// const editprofile = new Popup(popupProfileSelector);

//Click handler add element button.
// const creatElement = new Popup(popupCreatElementSelector);
