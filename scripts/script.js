const profileInfo = document.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__button');
const creatElementButton = document.querySelector('.profile__button-add');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupCreatElement = document.querySelector('.popup_type_creat-element');
const popupTypeImage = document.querySelector('.popup_type_image');
const closePopupProfile = popupProfile.querySelector('.popup__close');
const closePopupCreatElement = popupCreatElement.querySelector('.popup__close');
const formInputName = popupProfile.querySelector('.form__input_type_name');
const formInputProfession = popupProfile.querySelector('.form__input_type_profession');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');
const formElementEditProfile = popupProfile.querySelector('.form');
const formElementCreatElement = popupCreatElement.querySelector('.form');
const elementBox = document.querySelector('.elements__grid-container');
const likeBatton = elementBox.querySelector('.element__like');
const deleteElementButton = elementBox.querySelector('.element__delete');
const elementList = document.querySelector('.elements__grid-container');
const elementTemplate = document.querySelector('.element-template');
const closePopupImage = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__element-image');
const popupImageCaption = popupTypeImage.querySelector('.popup__image-caption');
const inputPlace =  popupCreatElement.querySelector('.form__input_type_place');
const inputPlaceLink =  popupCreatElement.querySelector('.form__input_type_place-link');

 const initialCards = [
    {
      name: 'Нарьян-Мар',
      link: 'https://live.staticflickr.com/65535/49467519261_64e10478ed_b.jpg'
    },
    {
      name: 'Диксон',
      link: 'https://live.staticflickr.com/4688/38761938434_a8488ff5d9_b.jpg'
    },
    {
      name: 'Дудинка',
      link: 'https://live.staticflickr.com/5525/10904348995_de06885b26_b.jpg'
    },
    {
      name: 'Белушья Губа',
      link: 'https://live.staticflickr.com/4271/34038884623_422f053a4b_c.jpg'
    },
    {
      name: 'Магадан',
      link: 'https://live.staticflickr.com/4037/4382400584_b2a96a3b8d_c.jpg'
    },
    {
      name: 'Тикси',
      link: 'https://live.staticflickr.com/65535/50754839667_8f4ee620a8_b.jpg'
    }
  ];

function createCard() {
  return elementTemplate.content.cloneNode(true);
}

  //Displaying initial content.
 initialCards.forEach(function(element) {
  const startingElements =  createCard();
  startingElements.querySelector('.element__title').textContent = element.name;
  startingElements.querySelector('.element__image').src = element.link;
  startingElements.querySelector('.element__image').alt = element.name;
  elementList.append(startingElements);
});

 //toggles popup.
 function togglePopup(pop){
    pop.classList.toggle('popup_opened');
 }

 //Outputs the text from the profile to the input.
 function fillInputText() {
    formInputName.value = profileTitle.textContent;
    formInputProfession.value = profileSubtitle.textContent;
 }

 //Adds a new item.
 function addElement(event) {
  event.preventDefault();
  const newElement = createCard();
  
  const namePlace = newElement.querySelector('.element__title');
  const linkPlace = newElement.querySelector('.element__image');
  
  namePlace.textContent = inputPlace.value;
  linkPlace.src = inputPlaceLink.value;
  linkPlace.alt = inputPlace.value;
  
  elementList.prepend(newElement);
  togglePopup(popupCreatElement);
  cleanInput(inputPlaceLink, inputPlace);
}

 //Saves the text from the input to the profile.
 function formSubmitHandler (event) {
    event.preventDefault();
    const name = formInputName.value;
    const profession = formInputProfession.value;
    profileTitle.textContent = name;
    profileSubtitle.textContent = profession;
    
    togglePopup(popupProfile);
 }

//Cleans up inputs.
function cleanInput (firstInput, secondInput) {
  firstInput.value = '';
  secondInput.value = '';
}

 //Switches likes.
 function switchLike(likeBatton) {
  likeBatton.classList.toggle('element__like_active');     
 };

 //Deletes an element.
 function removeElement(deleteElementButton) {
  const listItemRemove = deleteElementButton.closest('.element');
  listItemRemove.remove();
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

  // openPopupForImage(popupTypeImage);
  togglePopup(popupTypeImage);
 });

 editButton.addEventListener('click', () => togglePopup(popupProfile), fillInputText()); //Catches a click on the edit button
 creatElementButton.addEventListener('click', () => togglePopup(popupCreatElement)); //Catches a click on the add element button.
 closePopupProfile.addEventListener('click', () => togglePopup(popupProfile)) //Catches the closing of the profile editor.
 closePopupCreatElement.addEventListener('click', () => togglePopup(popupCreatElement));//Catches the closing of the add element editor.
 closePopupImage.addEventListener('click', () => togglePopup(popupTypeImage)); //Catches the closing of the image viewing mode.
 formElementCreatElement.addEventListener('submit', addElement); //Catches the submission of the form for adding an element.
 formElementEditProfile.addEventListener('submit', formSubmitHandler); //Catches sending the profile editing form.



