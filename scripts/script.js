let profileInfo = document.querySelector('.profile__info');
let popup = document.querySelector('.popup');
let edit = profileInfo.querySelector('.profile__button');
let closedForm = popup.querySelector('.popup__close');

let profileTitleText = (profileInfo.querySelector('.profile__title')).textContent;
let profileSubtitleText = (profileInfo.querySelector('.profile__subtitle')).textContent;
let formInputName = popup.querySelector('.form__input_type_name');
let formInputProfession = popup.querySelector('.form__input_type_profession');

let formElement = popup.querySelector('.form');

//Функция editProfile при открытии формы выводит в полях ввода значения из профиля.
//В функции editProfile временно используется return, чтобы 
//значения полей ввода не сбрасывлись после повторного вызова функции.
function editProfile() {
    popup.classList.add('popup_opened');
    if(formInputName.value === "" || formInputName.value === profileTitleText){
        formInputName.value = profileTitleText;
        formInputProfession.value = profileSubtitleText;
    }
    else {return;}
}

//Функция formSubmitHandler при сохранении формы меняет текст в профиле.
function formSubmitHandler (evt) {
    evt.preventDefault();
    let name = formInputName.value;
    let profession = formInputProfession.value;
    profileInfo.querySelector('.profile__title').textContent = name;
    profileInfo.querySelector('.profile__subtitle').textContent = profession;
    
    exitProfile();
}

//Функция exitProfile закрывает окно формы.
function exitProfile() { 
    popup.classList.remove('popup_opened');
}

edit.addEventListener('click', editProfile);  //Ловим клик на кнопке редактирования профиля.
closedForm.addEventListener('click', exitProfile); //Ловим клик на кнопке закрытия окна формы
formElement.addEventListener('submit', formSubmitHandler); //Ловим событие сохранения формы.




