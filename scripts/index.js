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
const formElementEdit = document.forms.edit;
const popupEditName = formElementEdit.elements.name;
const popupEditAbout = formElementEdit.elements.about;
const popupEditButton = formElementEdit.querySelector('.popup__submit');

// Попап добавления карточки
const popupAdd = document.querySelector('.popup_add');
const openPopupAdd = document.querySelector('.profile__add-button');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const formElementAdd = document.forms.add;
const popupAddTitle = formElementAdd.elements.title;
const popupAddLink = formElementAdd.elements.link;

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const closePopupImage = popupImage.querySelector('.popup__close');
const popupBigImg = popupImage.querySelector('.popup__big-img');
const popupTitleImg = popupImage.querySelector('.popup__title-img');

const cardTemp = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

// Закрытие попапа нажатием на оверлей
function closePopupOverlay(popup) {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach(popupElement => {
        popupElement.addEventListener('click', evt => {
            if (evt.target === evt.currentTarget) {
                closePopup(popup)
            }
        })
    })
}

// Закрытие попапа ESC
function closePopupESC(popup) {
    const downKeyESC = evt => {
        if (evt.key === 'Escape') {
            closePopup(popup);
            document.removeEventListener('keydown', downKeyESC);
        }
    }
    document.addEventListener('keydown', downKeyESC);
}

// Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    closePopupESC(popup);
}

// Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Создание карточки с оброботчиками событий
const createCard = (item) => {
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);
    const image = cardElement.querySelector('.element__image');

    image.src = item.link;
    image.alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;

    image.addEventListener('click', function () {
        popupBigImg.src = item.link;
        popupBigImg.alt = item.name;
        popupTitleImg.textContent = item.name;
        openPopup(popupImage);
    })

    return cardElement;
}

const allCards = initialCards.map(createCard);

function handleProfileFormSubmit() {
    profileName.textContent = popupEditName.value;
    profileAbout.textContent = popupEditAbout.value;
    closePopup(popupEdit);
}

function handleCardFormSubmit() {
    const newCard = {
        name: popupAddTitle.value,
        link: popupAddLink.value
    };
    elements.prepend(createCard(newCard));
    closePopup(popupAdd);
    formElementAdd.reset()
}

// Обрботка событий попапа редактирования профиля
openPopupEdit.addEventListener('click', () => {
    popupEditName.value = profileName.textContent;
    popupEditAbout.value = profileAbout.textContent;
    popupEditButton.classList.remove('popup__submit_inactive');
    openPopup(popupEdit)
});
closePopupEdit.addEventListener('click', () => closePopup(popupEdit));
closePopupOverlay(popupEdit);
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// Обрботка событий попапа добавления карточек
openPopupAdd.addEventListener('click', () => openPopup(popupAdd));
closePopupAdd.addEventListener('click', () => closePopup(popupAdd));
closePopupOverlay(popupAdd);
formElementAdd.addEventListener('submit', handleCardFormSubmit);

// Обработка событий попапа картинки
closePopupImage.addEventListener('click', () => closePopup(popupImage));
closePopupOverlay(popupImage);

// Слушатель события нажатия на лайк
elements.addEventListener('click', evt => {
    if (evt.target.classList.contains('element__heart-icon')) {
        evt.target.classList.toggle('element__heart-icon_active')
    }
})

// Слушатель события нажатия на удалить
elements.addEventListener('click', evt => {
    if (evt.target.classList.contains('element__delete')) {
        evt.target.closest('.element').remove();
    }
})

// Отобразить все карточки на странице
elements.append(...allCards);



