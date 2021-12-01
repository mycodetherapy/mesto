const profileInfo = document.querySelector(".profile__info");

export const editProfileButton = profileInfo.querySelector(".profile__button");
export const creatElementButton = document.querySelector(
  ".profile__button-add"
);
export const popupCreatElement = document.querySelector(
  ".popup_type_creat-element"
);
export const popupProfile = document.querySelector(".popup_type_edit-profile");
export const formElementEditProfile = popupProfile.querySelector(".form");
export const formElementCreatElement = popupCreatElement.querySelector(".form");
export const editAvatarCliker = document.querySelector(".profile__hidden-avatar");
export const nameInput = document.querySelector(".form__input_type_name");
export const jobInput = document.querySelector(".form__input_type_profession");

export const templateSelector = ".element-template";
export const popupCreatElementSelector = ".popup_type_creat-element";
export const popupProfileSelector = ".popup_type_edit-profile";
export const popupImageSelector = ".popup_type_image";
export const popupDeleteSelector = ".popup_type_delete-element";
export const popupAvatarSelector = ".popup_type_edit-avatar";
export const nameEditProfileSelector = ".profile__title";
export const jobEditProfileSelector = ".profile__subtitle";
export const avatarSelector = ".profile__avatar";
export const elementListSelector = ".elements__grid-container";

export const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-30/",
  headers: {
    authorization: "c5a5cb5f-db7e-4ac2-924a-a6deb50d8693",
    "content-type": "application/json",
  },
};

export const validationConfig = {
  inputSelector: ".form__input",
  submitSelector: ".form__button-save",
  spanErrorSelector: ".form__input-error",
  inactiveButtonClass: "form__button-save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
