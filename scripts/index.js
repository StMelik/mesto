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
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

// Попап редактирования профиля
const popupEdit = document.querySelector('.popup_edit');
const openPopupEdit = document.querySelector('.profile__edit-button');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const formElementEdit = popupEdit.querySelector('.popup__form');
const popupEditName = popupEdit.querySelector('.popup__input_value_name');
const popupEditAbout = popupEdit.querySelector('.popup__input_value_about');

// Попап добавления карточки
const popupAdd = document.querySelector('.popup_add');
const openPopupAdd = document.querySelector('.profile__add-button');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const formElementAdd = popupAdd.querySelector('.popup__form');
const popupAddName = popupAdd.querySelector('.popup__input_value_name');
const popupAddLink = popupAdd.querySelector('.popup__input_value_link');

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

let buttonsLike = document.querySelectorAll('.element__heart-icon');
for (let buttonLike of buttonsLike) {
    buttonLike.addEventListener('click', function () {
        buttonLike.classList.toggle('element__heart-icon_active')
    })
}

// Открытие попапа
function popupOpend(popup) {
    popup.classList.toggle('popup_opend');
    if (popup === popupEdit) {
        popupEditName.value = profileName.textContent
        popupEditAbout.value = profileAbout.textContent
    }
}

// Закрытие попапа
function popupClosed(popup) {
    popup.classList.toggle('popup_opend');
}

// Добавить новую карточку
function addCard() {
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = initialCards[initialCards.length - 1].link;
    cardElement.querySelector('.element__image').alt = initialCards[initialCards.length - 1].name;
    cardElement.querySelector('.element__title').textContent = initialCards[initialCards.length - 1].name;
    elements.prepend(cardElement);
}

function formSubmitHandlerPopupEdit(evt) {
    evt.preventDefault();

    let namePopupValue = popupEditName.value;
    let aboutPopupValue = popupEditAbout.value;
    profileName.textContent = namePopupValue;
    profileAbout.textContent = aboutPopupValue;

    popupClosed(popupEdit)
}

function formSubmitHandlerPopupAdd(evt) {
    evt.preventDefault();

    let newCard = {
        name: popupAddName.value,
        link: popupAddLink.value
    }
    initialCards.push(newCard)

    addCard()
    popupClosed(popupAdd)

    popupAddName.value = '';
    popupAddLink.value = '';
}

// Обрботка событий попапа редактирования профиля
openPopupEdit.addEventListener('click', () => popupOpend(popupEdit))
closePopupEdit.addEventListener('click', () => popupOpend(popupEdit))
formElementEdit.addEventListener('submit', formSubmitHandlerPopupEdit);

// Обрботка событий попапа добавления карточек
openPopupAdd.addEventListener('click', () => popupOpend(popupAdd))
closePopupAdd.addEventListener('click', () => popupOpend(popupAdd))
formElementAdd.addEventListener('submit', formSubmitHandlerPopupAdd);