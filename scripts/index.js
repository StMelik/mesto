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
    // {
    //     name: 'Байкал',
    //     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    // }
];

let profileInfo = document.querySelector('.profile__info');
let popup = document.querySelector('.popup');

let formElement = popup.querySelector('.popup__form');

let profileName = profileInfo.querySelector('.profile__name');
let popupName = popup.querySelector('.popup__input_value_name');

let profileAbout = profileInfo.querySelector('.profile__about');
let popupAbout = popup.querySelector('.popup__input_value_about');

let openPopup = document.querySelector('.profile__edit-button');
let closePopup = popup.querySelector('.popup__close');

const cardTemp = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

initialCards.forEach(function (item) {
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;

    elements.append(cardElement);
})

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