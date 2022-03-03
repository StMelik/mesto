import { initialCards } from "./cards.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js";
import { PROFILE, FORMS, POPUPS, configForm, elements, formValidators } from '../utils/constants.js'

function handleCardClick(name, link) {
    POPUPS.IMAGE.IMAGE.src = link;
    POPUPS.IMAGE.IMAGE.alt = name;
    POPUPS.IMAGE.CAPTION.textContent = name;
    openPopup(POPUPS.IMAGE.POPUP)
}

function createCard(item) {
    return new Card(item, '#card', handleCardClick).generateCard()
}

// **************************************
// **************************************
// **************************************
// Не совсем понял вторую часть замечания
// с разделением логики вставки
// **************************************
// **************************************
// **************************************

function addCard(item) {
    elements.prepend(createCard(item))
}

function renderCards() {
    initialCards.forEach(addCard)
}

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

function handleProfileFormSubmit() {
    PROFILE.NAME.textContent = POPUPS.EDIT.NAME.value;
    PROFILE.ABOUT.textContent = POPUPS.EDIT.ABOUT.value;
    closePopup(POPUPS.EDIT.POPUP);
}

function handleCardFormSubmit() {
    const newCard = {
        name: POPUPS.ADD.TITLE.value,
        link: POPUPS.ADD.LINK.value
    };
    initialCards.push(newCard);
    addCard(newCard);
    closePopup(POPUPS.ADD.POPUP);
    FORMS.ADD.reset()
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation()
    })
}

// Включить валидацию форм
enableValidation(configForm)

function setDataPopupEdit() {
    POPUPS.EDIT.NAME.value = PROFILE.NAME.textContent;
    POPUPS.EDIT.ABOUT.value = PROFILE.ABOUT.textContent;
}

// Обрботка событий попапа редактирования профиля
POPUPS.EDIT.OPEN.addEventListener('click', () => {
    setDataPopupEdit()
    formValidators['edit'].resetValidation()
    openPopup(POPUPS.EDIT.POPUP)
});

POPUPS.EDIT.CLOSE.addEventListener('click', () => closePopup(POPUPS.EDIT.POPUP));

FORMS.EDIT.addEventListener('submit', handleProfileFormSubmit);

// Обрботка событий попапа добавления карточек
POPUPS.ADD.OPEN.addEventListener('click', () => {
    formValidators['add'].resetValidation()
    openPopup(POPUPS.ADD.POPUP);
});

POPUPS.ADD.CLOSE.addEventListener('click', () => closePopup(POPUPS.ADD.POPUP));

FORMS.ADD.addEventListener('submit', handleCardFormSubmit);

// Обработка события закрытия попапа картинки
POPUPS.IMAGE.CLOSE.addEventListener('click', () => closePopup(POPUPS.IMAGE.POPUP));

// Отобразить все карточки на странице
renderCards()