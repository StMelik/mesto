import { initialCards } from "./cards.js"
import { PROFILE, FORMS, POPUPS, configForm, elements, formValidators } from '../utils/constants.js'
import Card from "./Card.js"
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";

const cardsList = new Section({
    items: initialCards,
    renderer: item => {
        return new Card(item, '#card', handleCardClick)
            .generateCard()
    }
}, '.elements')

function handleCardClick(name, link) {
    POPUPS.IMAGE.IMAGE.src = link;
    POPUPS.IMAGE.IMAGE.alt = name;
    POPUPS.IMAGE.CAPTION.textContent = name;
    openPopup(POPUPS.IMAGE.POPUP)
}

function createCard(item) {
    return new Card(item, '#card', handleCardClick).generateCard()
}

// Закрытие попапа нажатием на оверлей
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

// Закрытие попапа нажатием на ECS
function handleEscKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}

// Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', closePopupOverlay);
    document.addEventListener('keydown', handleEscKey);
}

// Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', closePopupOverlay);
    document.removeEventListener('keydown', handleEscKey);
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
    cardsList.addItem(createCard(newCard));
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

// Закрытие попапа через крестик (добавляет событие для всех попапов)
POPUPS.ALL.forEach(popup => {
    popup.addEventListener('click', evt => {
        const isButtonClosePopup = evt.target.classList.contains(POPUPS.CLOSE_SELECTOR)
        if (isButtonClosePopup) {
            closePopup(popup)
        }
    })
})

// Обрботка событий попапа редактирования профиля
POPUPS.EDIT.OPEN.addEventListener('click', () => {
    setDataPopupEdit()
    formValidators['edit'].resetValidation()
    openPopup(POPUPS.EDIT.POPUP)
});

FORMS.EDIT.addEventListener('submit', handleProfileFormSubmit);

// Обрботка событий попапа добавления карточек
POPUPS.ADD.OPEN.addEventListener('click', () => {
    formValidators['add'].resetValidation()
    openPopup(POPUPS.ADD.POPUP);
});

FORMS.ADD.addEventListener('submit', handleCardFormSubmit);

// Отобразить все карточки на странице
cardsList.renderItems()