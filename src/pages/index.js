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
  editAvatarCliker,
  nameInput,
  jobInput,
  validationConfig,
  configApi,
} from "../utils/constants.js";

//import { reject, resolve } from "../../node_modules/core-js/es/promise";

const api = new Api(configApi);

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

const popupWithImage = new PopupWithImage(popupImageSelector);

//Saves the text from the input to the profile.
const formSubmitHandlerProfile = new PopupWithForm({
  selector: popupProfileSelector,
  formSubmitHandler: (formData) => {
    formSubmitHandlerProfile.preloader("Сохранение...");
    api.setUserInfo(formData).then(() => {
      api
        .getUserInfo()
        .then((data) => {
          //console.log(formData, data);
          userInfo.setUserInfo(formData, data);
          formSubmitHandlerProfile.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          formSubmitHandlerProfile.preloader("Сохранить");
        });
    });
  },
});

const popupWithAvatar = new PopupWithForm({
  selector: popupAvatarSelector,
  formSubmitHandler: (formData) => {
    popupWithAvatar.preloader("Сохранение...");
    api
      .setAvatar(formData)
      .then((data) => {
        userInfo.setAvatar(formData, data);
        popupWithAvatar.close(formData, data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithAvatar.preloader("Сохранить");
      });
  },
});

let userInfoData = null;

const pomiseAll = [
  api.getUserInfo().then((data) => {
    userInfoData = data;
    userInfo.setUserInfo({ name: "", about: "" }, data);
    userInfo.setAvatar({ avatar: "" }, data);
  }),
];

Promise.all(pomiseAll)
  .then(() =>
    api.getCards().then((data) => {

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
            const likeCounter = likeContainer.querySelector(
              ".element__like-counter"
            );
            if (!elem.classList.contains("element__like_active")) {
              api
                .addLike(elem.closest(".element").id)
                .then((data) => {
                  createCard(data, templateSelector).addLikeMethod(data, elem);
                })
                .catch((err) => console.log(err));
            } else {
              api
                .removeLike(elem.closest(".element").id)
                .then((data) => {
                  createCard(data, templateSelector).removeLikeMethod(
                    data,
                    elem
                  );
                })
                .catch((err) => console.log(err));
            }
          }),
          (handleDeleteClick = (item) => {
            deleteElementHendler.action(item);
            deleteElementHendler.open();
          })
        );
      }

      //function initialRenderCard(data) {
      const cardsList = new Section(
        {
          renderer: (item, meId) => {
            const cardElement = createCard(item, templateSelector).generateCard(
              meId
            );
            cardsList.appendItem(cardElement);
          },
        },
        elementListSelector
      );

      const addElement = new PopupWithForm({
        selector: popupCreatElementSelector,
        formSubmitHandler: (formData) => {
          addElement.preloader("Сохранение...");
          api
            .addTasks(formData)
            .then((formData) => {
              //console.log(formData);
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
              //console.log(formData);
              const addNewCard = newCard.generateCard(userInfoData["_id"]);
              cardsList.prependItem(addNewCard);
              addElement.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              addElement.preloader("Создать");
            });
        },
      });

      const deleteElementHendler = new PopupWithSubmit({
        selector: popupDeleteSelector,
        formSubmitHandler: (formData) => {
          deleteElementHendler.preloader("Удаление...");
          api
            .removeTasks(formData)
            .then(() => {
              createCard(
                formData, 
                templateSelector
              ).removeCard(formData);
              deleteElementHendler.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              deleteElementHendler.preloader("Да");
            });
        },
      });

      creatElementButton.addEventListener("click", () => {
        addElement.open();
        createElementFormValidator.resetValidation();
      });

      cardsList.renderItems(data, userInfoData["_id"]);
      addElement.setEventListeners();
      deleteElementHendler.setEventListeners();
    })
  )
  .catch((err) => console.log(err));

editProfileButton.addEventListener("click", () => {
  formSubmitHandlerProfile.open();
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.about;
  editProfileFormValidator.resetValidation();
});

editAvatarCliker.addEventListener("click", () => {
  popupWithAvatar.open();
  editAvatarFormValidator.resetValidation();
});

//Start validation.
editProfileFormValidator.enableValidation();
createElementFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

//Submit handlers.
formSubmitHandlerProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithAvatar.setEventListeners();
