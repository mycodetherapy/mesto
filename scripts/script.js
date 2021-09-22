let profileInfo = document.querySelector('.profile__info');
let popup = document.querySelector('.popup');
let editButton = profileInfo.querySelector('.profile__button');
let creatElementButton = document.querySelector('.profile__button-add');
let popupProfile = document.querySelector('.popup_type_edit-profile');
let popupCreatElement = document.querySelector('.popup_type_creat-element');
let closePopupProfile = popupProfile.querySelector('.popup__close');
let closePopupCreatElement = popupCreatElement.querySelector('.popup__close');
//let closeForm = popup.querySelector('.popup__close');

let popups = document.querySelector('.popups');


let formInputName = popup.querySelector('.form__input_type_name');
let formInputProfession = popup.querySelector('.form__input_type_profession');

let profileTitle = profileInfo.querySelector('.profile__title');
let profileSubtitle = profileInfo.querySelector('.profile__subtitle');

let formElement = popup.querySelector('.form');

//Функция editProfile при открытии формы выводит в полях ввода значения из профиля.
// function editProfile() {
//     popup.classList.add('popup_opened');
//     formInputName.value = profileTitle.textContent;
//     formInputProfession.value = profileSubtitle.textContent;
// }

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




// function creatElement() {
//     popups.children[1].classList.add('popup_opened');
// }

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


function close() {
      let x = popup.querySelectorAll('.popup__close');

      for (let i = 0; i < x.length; i++) {
        popup[i].classList.toggle('popup_opened');
      }
    //   x.forEach(function (item){
    //       x.classList.remove('popup_opened')
    // })
}
    

//editButton.addEventListener('click', editProfile);  //Ловим клик на кнопке редактирования профиля.
//closeForm.addEventListener('click', closePopup); //Ловим клик на кнопке закрытия окна формы
formElement.addEventListener('submit', formSubmitHandler); //Ловим событие сохранения формы.
//creatElementButton.addEventListener('click', creatElement);



