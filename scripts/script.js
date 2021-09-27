const profileInfo = document.querySelector('.profile__info');
const popup = document.querySelector('.popup');
const editButton = profileInfo.querySelector('.profile__button');
const creatElementButton = document.querySelector('.profile__button-add');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupCreatElement = document.querySelector('.popup_type_creat-element');
const popupTypeImage = document.querySelector('.popup_type_image');
const closePopupProfile = popupProfile.querySelector('.popup__close');
const closePopupCreatElement = popupCreatElement.querySelector('.popup__close');
const formInputName = popup.querySelector('.form__input_type_name');
const formInputProfession = popup.querySelector('.form__input_type_profession');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');
const formElementEditProfile = popup.querySelector('.form');
const formElementCreatElement = popupCreatElement.querySelector('.form');
const elementBox = document.querySelector('.elements__grid-container');
const likeBatton = elementBox.querySelector('.element__like');
const deleteElementButton = elementBox.querySelector('.element__delete');
const elementList = document.querySelector('.elements__grid-container');
const elementTemplate = document.querySelector('.element-template');
const closePopupImage = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__element-image');
const popupImageCaption = popupTypeImage.querySelector('.popup__image-caption');

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

  //Displaying initial content.
 initialCards.forEach(function(element) {
  const startingElement = elementTemplate.content.cloneNode(true);
  startingElement.querySelector('.element__title').textContent = element.name;
  startingElement.querySelector('.element__image').src = element.link;
  startingElement.querySelector('.element__image').alt = element.name;
  elementList.append(startingElement);
});

 //opens and closes the popup.
 function openClosePopup(pop){
    pop.classList.toggle('popup_opened');
    if(pop.classList.contains('popup_type_edit-profile')) {
      fillInputText();
    }
 }

 //Outputs the text from the profile to the input.
 function fillInputText() {
    formInputName.value = profileTitle.textContent;
    formInputProfession.value = profileSubtitle.textContent;
 }

 //Adds a new item.
 function addElement(event) {
    event.preventDefault();
    const newElement = elementTemplate.cloneNode(true);

    let inputPlace =  popupCreatElement.querySelector('.form__input_type_place').value;
    let inputPlaceLink =  popupCreatElement.querySelector('.form__input_type_place-link').value;
    
    let namePlace = newElement.querySelector('.element__title');
    let linkPlace = newElement.querySelector('.element__image');

    namePlace.textContent = inputPlace;
    linkPlace.src = inputPlaceLink;
    linkPlace.alt = inputPlace;
    
    elementList.prepend(newElement);
    openClosePopup(popupCreatElement);
  }

 //Saves the text from the input to the profile.
 function formSubmitHandler (event) {
    event.preventDefault();
    let name = formInputName.value;
    let profession = formInputProfession.value;
    profileTitle.textContent = name;
    profileSubtitle.textContent = profession;
    
    openClosePopup(popupProfile);
 }

 //Switches likes.
 function switchLike(likeBatton) {
  likeBatton.classList.toggle('element__like_active');     
 };

 //Deletes an element.
 function removeElement(deleteElementButton) {
  let listItemRemove = deleteElementButton.closest('.element');
  listItemRemove.remove();
 }

 //Opens the image for viewing.
 function openPopupForImage(pop){
  pop.classList.add('popup_for-image');
}
 
//Catches likes.
 elementBox.addEventListener('click', function (event) {
    let target = event.target;
    if (!target.classList.contains('element__like')) return;
     switchLike(target);
 });

 //Catches the deletion of an element.
 elementBox.addEventListener('click', function (event) {
  let target = event.target;
  if (!target.classList.contains('element__delete')) return;
   removeElement(target);
 }); 

 //Catches clicking on the image.
  elementBox.addEventListener('click', function (event) {
  let target = event.target;
  if (!target.classList.contains('element__image')) return;
  let elementContent = target.parentElement;
  let targetImage = elementContent.querySelector('.element__image');

  popupImage.src = targetImage.src;
  popupImage.alt = targetImage.alt;
  popupImageCaption.textContent = targetImage.alt;

  openPopupForImage(popupTypeImage);
  openClosePopup(popupTypeImage);
 });

 editButton.addEventListener('click', () => openClosePopup(popupProfile)) //Catches a click on the edit button
 creatElementButton.addEventListener('click', () => openClosePopup(popupCreatElement)); //Catches a click on the add element button.
 closePopupProfile.addEventListener('click', () => openClosePopup(popupProfile)) //Catches the closing of the profile editor.
 closePopupCreatElement.addEventListener('click', () => openClosePopup(popupCreatElement));//Catches the closing of the add element editor.
 closePopupImage.addEventListener('click', () => openClosePopup(popupTypeImage)); //Catches the closing of the image viewing mode.
 formElementCreatElement.addEventListener('submit', addElement); //Catches the submission of the form for adding an element.
 formElementEditProfile.addEventListener('submit', formSubmitHandler); //Catches sending the profile editing form.



