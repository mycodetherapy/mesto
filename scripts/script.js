let profileInfo = document.querySelector('.profile__info');
let popup = document.querySelector('.popup');
let editButton = profileInfo.querySelector('.profile__button');
let creatElementButton = document.querySelector('.profile__button-add');
let popupProfile = document.querySelector('.popup_type_edit-profile');
let popupCreatElement = document.querySelector('.popup_type_creat-element');
let closePopupProfile = popupProfile.querySelector('.popup__close');
let closePopupCreatElement = popupCreatElement.querySelector('.popup__close');

let popups = document.querySelector('.popups');


let formInputName = popup.querySelector('.form__input_type_name');
let formInputProfession = popup.querySelector('.form__input_type_profession');

let profileTitle = profileInfo.querySelector('.profile__title');
let profileSubtitle = profileInfo.querySelector('.profile__subtitle');

let formElement = popup.querySelector('.form');
let formElementCreatElement = popupCreatElement.querySelector('.form');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

 const elementList = document.querySelector('.elements__grid-container');
 const elementTemplate = document.querySelector('.element-template').content;

 initialCards.forEach(function(element) {
    const startingElement = elementTemplate.cloneNode(true);
    startingElement.querySelector('.element__title').textContent = element.name;
    startingElement.querySelector('.element__image').src = element.link;
    startingElement.querySelector('.element__image').alt = element.name;
    elementList.append(startingElement);
  });


  function addElement(evt) {
    evt.preventDefault();
    const newElement = elementTemplate.cloneNode(true);

    const inputPlace =  popupCreatElement.querySelector('.form__input_type_place').value;
    const inputPlaceLink =  popupCreatElement.querySelector('.form__input_type_place-link').value;
    
    let namePlace = newElement.querySelector('.element__title');
    let linkPlace = newElement.querySelector('.element__image');

    namePlace.textContent = inputPlace;
    linkPlace.src = inputPlaceLink;
    linkPlace.alt = inputPlace;
    
    elementList.append(newElement);
  }

//Открывает окно popup
const openPopup = function(pop){
    pop.classList.toggle('popup_opened');
    if(pop.classList.contains('popup_type_edit-profile')) {
        formInputName.value = profileTitle.textContent;
        formInputProfession.value = profileSubtitle.textContent;
    }
}

editButton.addEventListener('click', () => openPopup(popupProfile))
creatElementButton.addEventListener('click', () => openPopup(popupCreatElement));
closePopupProfile.addEventListener('click', () => openPopup(popupProfile))
closePopupCreatElement.addEventListener('click', () => openPopup(popupCreatElement));


//Функция formSubmitHandler при сохранении формы меняет текст в профиле.
function formSubmitHandler (evt) {
    evt.preventDefault();
    let name = formInputName.value;
    let profession = formInputProfession.value;
    profileTitle.textContent = name;
    profileSubtitle.textContent = profession;
    
    closePopup();
}

//Функция закрывает окно popup.
function closePopup() { 
    popup.classList.remove('popup_opened');
}

    
formElementCreatElement.addEventListener('submit', addElement);
//closeForm.addEventListener('click', closePopup); //Ловим клик на кнопке закрытия окна формы
formElement.addEventListener('submit', formSubmitHandler); //Ловим событие сохранения формы.



