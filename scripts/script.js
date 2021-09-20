let profileInfo = document.querySelector('.profile__info');
let popup = document.querySelector('.popup');
let edit = profileInfo.querySelector('.profile__button');
let closeForm = popup.querySelector('.popup__close');

let formInputName = popup.querySelector('.form__input_type_name');
let formInputProfession = popup.querySelector('.form__input_type_profession');

let profileTitle = profileInfo.querySelector('.profile__title');
let profileSubtitle = profileInfo.querySelector('.profile__subtitle');

let formElement = popup.querySelector('.form');

//Функция editProfile при открытии формы выводит в полях ввода значения из профиля.
function editProfile() {
    popup.classList.add('popup_opened');
    formInputName.value = profileTitle.textContent;
    formInputProfession.value = profileSubtitle.textContent;
}

//Функция formSubmitHandler при сохранении формы меняет текст в профиле.
function formSubmitHandler (evt) {
    evt.preventDefault();
    let name = formInputName.value;
    let profession = formInputProfession.value;
    profileTitle.textContent = name;
    profileSubtitle.textContent = profession;
    
    closePopup();
}

//Функция exitProfile закрывает окно popup.
function closePopup() { 
    popup.classList.remove('popup_opened');
}

edit.addEventListener('click', editProfile);  //Ловим клик на кнопке редактирования профиля.
closeForm.addEventListener('click', closePopup); //Ловим клик на кнопке закрытия окна формы
formElement.addEventListener('submit', formSubmitHandler); //Ловим событие сохранения формы.




