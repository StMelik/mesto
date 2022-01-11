let profileInfo = document.querySelector('.profile__info');
let popup = document.querySelector('.popup');

let formElement = popup.querySelector('.popup__form');

let profileName = profileInfo.querySelector('.profile__name');
let popupName = popup.querySelector('.popup__name');

let profileAbout = profileInfo.querySelector('.profile__about');
let popupAbout = popup.querySelector('.popup__about');

let openPopup = document.querySelector('.profile__edit-button');
let closePopup = popup.querySelector('.popup__close');

function popupOpend() {
    popup.classList.toggle('popup_opend');
    popupName.value = profileName.textContent
    popupAbout.value = profileAbout.textContent
}

function popupClosed() {
    popup.classList.toggle('popup_opend');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    let namePopupValue = popupName.value;
    let aboutPopupValue = popupAbout.value;

    profileName.textContent = namePopupValue;
    profileAbout.textContent = aboutPopupValue;

    popupOpend()
}

openPopup.addEventListener('click', popupOpend)
closePopup.addEventListener('click', popupClosed)
formElement.addEventListener('submit', formSubmitHandler); 