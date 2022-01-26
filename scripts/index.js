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

const profileInfo = document.querySelector('.profile__info');
const popupEdit = document.querySelector('.popup_edit');

const formElementEdit = popupEdit.querySelector('.popup__form');

const profileName = profileInfo.querySelector('.profile__name');
const popupName = popupEdit.querySelector('.popup__input_value_name');

const profileAbout = profileInfo.querySelector('.profile__about');
const popupAbout = popupEdit.querySelector('.popup__input_value_about');

const openPopupEdit = document.querySelector('.profile__edit-button');
const closePopupEdit = popupEdit.querySelector('.popup__close');

// Попап добавления карточки
const popupAdd = document.querySelector('.popup_add');
const openPopupAdd = document.querySelector('.profile__add-button');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const formElementAdd = popupAdd.querySelector('.popup__form');

const cardTemp = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

// Отрисовка карточек на странице
initialCards.forEach(function (item) {
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;
    elements.append(cardElement);
})

function popupOpend(popup) {
    popup.classList.toggle('popup_opend');
    if (popup === popupEdit) {
        popupName.value = profileName.textContent
        popupAbout.value = profileAbout.textContent
    }
}

function popupClosed(popup) {
    popup.classList.toggle('popup_opend');
}

function formSubmitHandlerPopupEdit(evt) {
    evt.preventDefault();

    let namePopupValue = popupName.value;
    let aboutPopupValue = popupAbout.value;

    profileName.textContent = namePopupValue;
    profileAbout.textContent = aboutPopupValue;

    popupClosed(popupEdit)
}



openPopupEdit.addEventListener('click', () => popupOpend(popupEdit))
closePopupEdit.addEventListener('click', () => popupOpend(popupEdit))
formElementEdit.addEventListener('submit', formSubmitHandlerPopupEdit);

openPopupAdd.addEventListener('click', () => popupOpend(popupAdd))
closePopupAdd.addEventListener('click', () => popupOpend(popupAdd))
formElementAdd.addEventListener('submit', formSubmitHandlerPopupAdd);