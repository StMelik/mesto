import { initialCards } from "../utils/cards.js"
import { POPUPS, CARD, FORMS, configForm, formValidators, userInfoSelectors } from '../utils/constants.js'
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css"
import "../images/avatar.jpg"
import "../images/logo.svg"

const formEditValidator = new FormValidator(configForm, FORMS.EDIT)
const formAddValidator = new FormValidator(configForm, FORMS.ADD)
const popupImage = new PopupWithImage(POPUPS.IMAGE.SELECTOR)
const popupEdit = new PopupWithForm(POPUPS.EDIT.SELECTOR, handleProfileFormSubmit)
const popupAdd = new PopupWithForm(POPUPS.ADD.SELECTOR, handleAddFormSubmit)
const userInfo = new UserInfo(userInfoSelectors)
const cardsList = new Section(
    {
        items: initialCards,
        renderer: createCard
    },
    CARD.BOX_SELECTOR
)

function createCard(item) {
    return new Card(item, CARD.TEMPLATE_SELECTOR, handleCardClick).generateCard()
}

function handleCardClick(data) {
    popupImage.open(data)
}

function handleClickOpenProfilePopup() {
    const userData = userInfo.getUserInfo()
    POPUPS.EDIT.NAME.value = userData.name;
    POPUPS.EDIT.ABOUT.value = userData.about;
    formEditValidator.resetValidation()
    popupEdit.open()
}

function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data)
    popupEdit.close()
}

function handleAddFormSubmit(newCard) {
    cardsList.addItem(createCard(newCard))
    popupAdd.close()
}

function handleClickOpenAddPopup() {
    formAddValidator.resetValidation()
    popupAdd.open()
}

formEditValidator.enableValidation()
formAddValidator.enableValidation()

cardsList.renderItems()

POPUPS.EDIT.OPEN.addEventListener('click', handleClickOpenProfilePopup);
POPUPS.ADD.OPEN.addEventListener('click', handleClickOpenAddPopup)