export const initialCards = [
  {
    name: "Нарьян-Мар",
    link: "https://live.staticflickr.com/65535/49467519261_64e10478ed_b.jpg",
  },
  {
    name: "Диксон",
    link: "https://live.staticflickr.com/4688/38761938434_a8488ff5d9_b.jpg",
  },
  {
    name: "Дудинка",
    link: "https://live.staticflickr.com/5525/10904348995_de06885b26_b.jpg",
  },
  {
    name: "Белушья Губа",
    link: "https://live.staticflickr.com/4271/34038884623_422f053a4b_c.jpg",
  },
  {
    name: "Магадан",
    link: "https://live.staticflickr.com/4037/4382400584_b2a96a3b8d_c.jpg",
  },
  {
    name: "Тикси",
    link: "https://live.staticflickr.com/65535/50754839667_8f4ee620a8_b.jpg",
  },
];

const profileInfo = document.querySelector(".profile__info");

export const editProfileButton = profileInfo.querySelector(".profile__button");
export const creatElementButton = document.querySelector(
  ".profile__button-add"
);
export const popupCreatElement = document.querySelector(
  ".popup_type_creat-element"
);
export const elementDeleteButton = document.querySelector(".element__delete");
export const popupProfile = document.querySelector(".popup_type_edit-profile");
export const formElementEditProfile = popupProfile.querySelector(".form");
export const formElementCreatElement = popupCreatElement.querySelector(".form");
export const elementList = document.querySelector(".elements__grid-container");
export const nameEditProfile = document.querySelector(".profile__title");
export const jobEditProfile = document.querySelector(".profile__subtitle");
export const avatarProfile = document.querySelector(".profile__avatar");
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

export const placeName = "place_name";
export const linkToImageName = "link_to_image";
export const userName = "user_name";
export const userProfessionName = "user_profession";
export const cohort = "cohort-30";
export const urlUser = `https://mesto.nomoreparties.co/v1/${cohort}/users/me`;
export const urlCards = `https://mesto.nomoreparties.co/v1/${cohort}/cards`;
export const tocenUser = "c5a5cb5f-db7e-4ac2-924a-a6deb50d8693";
export const avatar =  "https://live.staticflickr.com/65535/51690994284_734f3c7700_m.jpg";

export const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-30/",
  headers: {
    authorization: "c5a5cb5f-db7e-4ac2-924a-a6deb50d8693",
    "content-type": "application/json",
  },
};


export const newUserInfo = {
  name: "Жак-Ив Кусто",
  about: "Исследователь океана",
};


// export const newUserInfo = {
//   name: "Marie Brante",
//   about: "Social ecologist",
// };

export const validationConfig = {
  inputSelector: ".form__input",
  submitSelector: ".form__button-save",
  spanErrorSelector: ".form__input-error",
  inactiveButtonClass: "form__button-save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
