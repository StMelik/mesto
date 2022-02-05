const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');

// Попап редактирования профиля
const popupEdit = document.querySelector('.popup_edit');
const popupEditOpenBtn = document.querySelector('.profile__edit-button');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close');
const formElementEdit = document.forms.edit;
const popupEditName = formElementEdit.elements.name;
const popupEditAbout = formElementEdit.elements.about;
const popupEditSubmit = formElementEdit.querySelector('.popup__submit');

// Попап добавления карточки
const popupAdd = document.querySelector('.popup_add');
const popupAddOpenBtn = document.querySelector('.profile__add-button');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close');
const formElementAdd = document.forms.add;
const popupAddTitle = formElementAdd.elements.title;
const popupAddLink = formElementAdd.elements.link;

// Попап картинки
const popupImage = document.querySelector('.popup_image');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');
const popupBigImg = popupImage.querySelector('.popup__big-img');
const popupTitleImg = popupImage.querySelector('.popup__title-img');

const cardTemp = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

// Закрытие попапа нажатием на оверлей
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

// Закрытие попапа нажатием на ECS
function downKeyESC(evt) {
    if (evt.key === 'Escape') {
        const popupList = Array.from(document.querySelectorAll('.popup'))
        popupList.forEach(closePopup)
    }
}

// Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', downKeyESC);
}

// Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', downKeyESC);
}

// Создание карточки с оброботчиками событий
const createCard = (item) => {
    const cardElement = cardTemp.querySelector('.element').cloneNode(true);
    const image = cardElement.querySelector('.element__image');
    const buttonLike = cardElement.querySelector('.element__heart-icon');
    const buttonDelete = cardElement.querySelector('.element__delete');

    image.src = item.link;
    image.alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;

    buttonLike.addEventListener('click', function () {
        buttonLike.classList.toggle('element__heart-icon_active');
    })

    buttonDelete.addEventListener('click', function () {
        buttonDelete.closest('.element').remove();
    })

    function openPopupImage() {
        popupBigImg.src = item.link;
        popupBigImg.alt = item.name;
        popupTitleImg.textContent = item.name;
        openPopup(popupImage);
    }

    image.addEventListener('click', openPopupImage)

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
popupEditOpenBtn.addEventListener('click', () => {
    popupEditName.value = profileName.textContent;
    popupEditAbout.value = profileAbout.textContent;
    popupEditSubmit.classList.remove('popup__submit_inactive');
    openPopup(popupEdit)
});
popupEditCloseBtn.addEventListener('click', () => closePopup(popupEdit));
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// Обрботка событий попапа добавления карточек
popupAddOpenBtn.addEventListener('click', () => openPopup(popupAdd));
popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd));
formElementAdd.addEventListener('submit', handleCardFormSubmit);

// Обработка событий попапа картинки
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));

// Отобразить все карточки на странице
elements.append(...allCards);



