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
 
    function createCard(
      item,
      element,
      handleCardClick,
      handleCardLike,
      handleDeleteClick
    ) {
      const newCard = new Card(
        item,
        element,
        (handleCardClick = () => {
          popupWithImage.open(item);
        }),
        (handleCardLike = (elem) => {
          if (!elem.classList.contains("element__like_active")) {
            api
              .addLike(elem.closest(".element").id)
              .then((data) => {
                newCard.addLikeMethod(data, elem);
              })
              .catch((err) => console.log(err));
          } else {
            api
              .removeLike(elem.closest(".element").id)
              .then((data) => {
                newCard.removeLikeMethod(data, elem);
              })
              .catch((err) => console.log(err));
          }
        }),
        (handleDeleteClick = (item) => {
          deleteElementHendler.setActionSubmit(() => {
            deleteElementHendler.preloader("Удаление...");
            api
              .removeTasks(item.id)
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
          .then((data) => {
            const newCard = createCard(
              data,
              templateSelector
            );
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
      selector: popupDeleteSelector
    });

    creatElementButton.addEventListener("click", () => {
      addElement.open();
      createElementFormValidator.resetValidation();
    });

    cardsList.renderItems(cardsData, userInfoData["_id"]);
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
