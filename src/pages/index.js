import { initialCards } from "../utils/cards.js"
import { POPUPS, CARD, configForm, formValidators, userInfoSelectors } from '../utils/constants.js'
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css"
import "../images/avatar.jpg"
import "../images/logo.svg"

const cardsList = new Section({
    items: initialCards,
    renderer: item => {
        return new Card(item, CARD.TEMPLATE_SELECTOR, handleCardClick)
            .generateCard()
    }
}, CARD.BOX_SELECTOR)

function handleCardClick(data) {
    const popupImage = new PopupWithImage(POPUPS.IMAGE.SELECTOR)
    popupImage.open(data)
}

function createCard(item) {
    return new Card(item, CARD.TEMPLATE_SELECTOR, handleCardClick).generateCard()
}

// Попап редактирования
const userInfo = new UserInfo(userInfoSelectors)
const popupEdit = new PopupWithForm(POPUPS.EDIT.SELECTOR, handleProfileFormSubmit)

function handleClickOpenProfilePopup() {
    const userData = userInfo.getUserInfo()
    POPUPS.EDIT.NAME.value = userData.name;
    POPUPS.EDIT.ABOUT.value = userData.about;
    formValidators['edit'].resetValidation()
    popupEdit.open()
}

function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data)
    popupEdit.close()
}

POPUPS.EDIT.OPEN.addEventListener('click', handleClickOpenProfilePopup);

// Попап добавления карточки
const popupAdd = new PopupWithForm(POPUPS.ADD.SELECTOR, handleAddFormSubmit)

function handleAddFormSubmit(newCard) {
    cardsList.addItem(createCard(newCard))
    popupAdd.close()
}

function handleClickOpenAddPopup() {
    formValidators['add'].resetValidation()
    popupAdd.open()
}

POPUPS.ADD.OPEN.addEventListener('click', handleClickOpenAddPopup)

// Валидация форм
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

// Отобразить все карточки на странице
cardsList.renderItems()