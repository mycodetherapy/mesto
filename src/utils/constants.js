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
export const creatElementButton = document.querySelector(".profile__button-add");
export const popupCreatElement = document.querySelector(".popup_type_creat-element");
export const popupProfile = document.querySelector(".popup_type_edit-profile");
export const popupCreatElementSelector = ".popup_type_creat-element";
export const popupProfileSelector = ".popup_type_edit-profile";

export const formElementEditProfile = popupProfile.querySelector(".form");
export const formElementCreatElement = popupCreatElement.querySelector(".form");
export const elementList = document.querySelector(".elements__grid-container");
export const elementListSelector = ".elements__grid-container";
export const templateSelector = ".element-template";
export const popupImageSelector = ".popup_type_image";

export const nameEditProfile = document.querySelector(".profile__title");
export const jobEditProfile = document.querySelector(".profile__subtitle");
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_profession');

