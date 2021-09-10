let profileInfo = document.querySelector('.profile__info');
let popup = document.querySelector('.popup');
let edit = profileInfo.querySelector('.profile__button');
let closedForm = popup.querySelector('.form__closed');

let profileTitleText = (profileInfo.querySelector('.profile__title')).textContent;
let profileSubtitleText = (profileInfo.querySelector('.profile__subtitle')).textContent;
let formInputName = popup.querySelector('.form__input_name');
let formInputProfession = popup.querySelector('.form__input_profession');

var profileTitle = profileInfo.querySelector('.profile__title');
var form = document.querySelector('.form');
var buttonSave = popup.querySelector('.form__button');

let elementContainer = document.querySelector('.elements__grid-container');
let elementLike = elementContainer.querySelector('.element__like');

function editProfile() {
    popup.classList.add('popup_opened');
    formInputName.value = profileTitleText;
    formInputProfession.value = profileSubtitleText;
}

function exitProfile() {
    popup.classList.remove('popup_opened');
}

function saveProfile() {
    profileInfo.innerHTML = `
        <p class="profile__title">${formInputName.value}</p>
        <button class="profile__button" onclick="editProfile()"></button>
        <p class="profile__subtitle">${formInputProfession.value}</p>
    `
    // profileTitle.textContent = formInputName.value;
    exitProfile();
}

function like(event) {
    let target = event.target;
    if (target.className != 'element__like') return;
    target.classList.toggle('element__like_active');
}

edit.addEventListener('click', editProfile);
closedForm.addEventListener('click', exitProfile);
buttonSave.addEventListener('click', saveProfile);
elementContainer.addEventListener('click', like);




