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

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const closePopupImage = popupImage.querySelector('.popup__close');
const popupBigImg = popupImage.querySelector('.popup__big-img');
const popupTitleImg = popupImage.querySelector('.popup__title-img');

const cardTemp = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

// Открытие попапа
function popupOpened(popup) {
    popup.classList.toggle('popup_opened');
    if (popup === popupEdit) {
        popupEditName.value = profileName.textContent;
        popupEditAbout.value = profileAbout.textContent;
    }
}

// Закрытие попапа
function popupClosed(popup) {
    popup.classList.toggle('popup_opened');
}

// Создание карточки с оброботчиками событий
const createCard = (item) => {
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;

    const buttonLike = cardElement.querySelector('.element__heart-icon');
    const buttonDelete = cardElement.querySelector('.element__delete');
    const image = cardElement.querySelector('.element__image');

    buttonLike.addEventListener('click', function () {
        buttonLike.classList.toggle('element__heart-icon_active');
    })

    buttonDelete.addEventListener('click', function () {
        buttonDelete.closest('.element').remove();
    })

    image.addEventListener('click', function () {
        popupBigImg.src = item.link;
        popupBigImg.alt = item.name;
        popupTitleImg.textContent = item.name;
        popupOpened(popupImage);
    })

    return cardElement;
}

const allCards = initialCards.map(item => createCard(item));

function formSubmitHandlerPopupEdit(evt) {
    evt.preventDefault();
    let namePopupValue = popupEditName.value;
    let aboutPopupValue = popupEditAbout.value;
    profileName.textContent = namePopupValue;
    profileAbout.textContent = aboutPopupValue;
    popupClosed(popupEdit);
}

function formSubmitHandlerPopupAdd(evt) {
    evt.preventDefault();
    const newCard = {
        name: popupAddName.value,
        link: popupAddLink.value
    };
    elements.prepend(createCard(newCard));
    popupClosed(popupAdd);
    popupAddName.value = '';
    popupAddLink.value = '';
}

// Обрботка событий попапа редактирования профиля
openPopupEdit.addEventListener('click', () => popupOpened(popupEdit));
closePopupEdit.addEventListener('click', () => popupOpened(popupEdit));
formElementEdit.addEventListener('submit', formSubmitHandlerPopupEdit);

// Обрботка событий попапа добавления карточек
openPopupAdd.addEventListener('click', () => popupOpened(popupAdd));
closePopupAdd.addEventListener('click', () => popupOpened(popupAdd));
formElementAdd.addEventListener('submit', formSubmitHandlerPopupAdd);

// Обработка событий попапа картинки
closePopupImage.addEventListener('click', () => popupClosed(popupImage));

// Отобразить все карточки на странице
elements.append(...allCards);