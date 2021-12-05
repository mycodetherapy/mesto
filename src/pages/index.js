import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardsData]) => {
    userInfoData = userData;
    userInfo.setUserInfo({ name: "", about: "" }, userData);
    userInfo.setAvatar({ avatar: "" }, userData);

    //console.log(cardsData);

    function createCard(
      dataCard,
      element,
      handleCardClick,
      handleCardLike,
      handleDeleteClick
    ) {
      const newCard = new Card(
        dataCard,
        element,
        (handleCardClick = () => {
          popupWithImage.open(dataCard);
        }),
        (handleCardLike = () => {
          if (!newCard.checkForLike(userData)) { 
            api
              .toggleLike("PUT", dataCard["_id"])
              .then((data) => {
                newCard.setLike(data.likes);
                newCard.toggleLikeView(data.likes);
              })
              .catch((err) => console.log(err));
          } else {
            api
              .toggleLike("DELETE", dataCard["_id"])
              .then((data) => {
                newCard.setLike(data.likes);
                newCard.toggleLikeView(data.likes);
              })
              .catch((err) => console.log(err));
          }
        }),
        (handleDeleteClick = () => {
          deleteElementHendler.setActionSubmit(() => {
            deleteElementHendler.preloader("Удаление...");
            api
              .removeTasks(dataCard["_id"])
              .then(() => {
                newCard.removeCard();
                deleteElementHendler.close();
              })
              .catch((err) => console.log(err))
              .finally(() => {
                deleteElementHendler.preloader("Да");
              });
          });
          deleteElementHendler.open();
        })
      );
      return newCard;
    }

    //function RenderCard
    const cardsList = new Section(
      {
        renderer: (dataCard) => {
          const cardElement = createCard(dataCard, templateSelector).generateCard(
            userData
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
          .then((data) => {
            const newCard = createCard(
              data,
              templateSelector
            );
            const addNewCard = newCard.generateCard(userData);
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
      selector: popupDeleteSelector
    });

    creatElementButton.addEventListener("click", () => {
      addElement.open();
      createElementFormValidator.resetValidation();
    });

    cardsList.renderItems(cardsData, userData);
    addElement.setEventListeners();
    deleteElementHendler.setEventListeners();
  })
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
