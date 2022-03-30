import { POPUPS, CARD, FORMS, configForm, userInfoSelectors, optionsApi, cardList } from '../utils/constants.js'
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import "./index.css"
import "../images/no-avatar.png"
import "../images/logo.svg"

const formEditValidator = new FormValidator(configForm, FORMS.EDIT)
const formAddValidator = new FormValidator(configForm, FORMS.ADD)
const formAvatarValidator = new FormValidator(configForm, FORMS.AVATAR)

const popupImage = new PopupWithImage(POPUPS.IMAGE.SELECTOR)
const popupEdit = new PopupWithForm(POPUPS.EDIT.SELECTOR, handleProfileFormSubmit)
const popupAdd = new PopupWithForm(POPUPS.ADD.SELECTOR, handleAddFormSubmit)
const popupDelete = new PopupWithConfirmation(POPUPS.DELETE.SELECTOR, handleConfirmPopup)
const popupAvatar = new PopupWithForm(POPUPS.AVATAR.SELECTOR, handleAvatarFormSubmit)

const userInfo = new UserInfo(userInfoSelectors)
const api = new Api(optionsApi)
const cardsList = new Section(
    {
        renderer: createCard
    },
    CARD.BOX_SELECTOR
)

const userInfoServer = api.getUserInfo()

function createCard(item) {
    const card = new Card(item, CARD.TEMPLATE_SELECTOR, userInfoServer, {
        handleCardClick,
        handleDeleteClick,
        handleAddLikeCard,
        handleDeleteLikeCard
    })
    cardList.push({
        cardElement: card,
        cardId: item._id
    })
    return card.generateCard()
}

// Удаление карточки
function handleConfirmPopup(cardId) {
    api.deleteCard(cardId)
        .catch(err => console.log("Не удалось удалить карточку:", err))

    cardList
        .find(card => card.cardId === cardId)
        .cardElement
        .deleteCard()

    popupDelete.close()
}

function handleDeleteClick(cardId) {
    popupDelete.open(cardId)
}

// Лайки
function handleAddLikeCard(cardId) {
    api.addLikeCard(cardId)
        .then(res => {
            this._likeCount.textContent = res.likes.length
        })
        .catch(err => console.log("Не удалось поставить лайк:", err))
}

function handleDeleteLikeCard(cardId) {
    api.deleteLikeCard(cardId)
        .then(res => {
            this._likeCount.textContent = res.likes.length
        })
        .catch(err => console.log("Не удалось удалить лайк:", err))
}

// Попап картинки
function handleCardClick(data) {
    popupImage.open(data)
}

// Попап Профиля
function handleClickOpenProfilePopup() {
    const userData = userInfo.getUserInfo()
    POPUPS.EDIT.NAME.value = userData.name;
    POPUPS.EDIT.ABOUT.value = userData.about;
    formEditValidator.resetValidation()
    popupEdit.open()
}

function handleProfileFormSubmit(data) {
    popupEdit.loader(true)
    api.editUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res)
            popupEdit.close()
        })
        .catch(err => console.log("Не удалось изменить данные профиля:", err))
        .finally(() => popupEdit.loader(false))
}

// Попап добавления карточки
function handleAddFormSubmit(newCard) {
    popupAdd.loader(true)
    api.addCard(newCard)
        .then(res => {
            cardsList.addItem(createCard(res), 'prepend')
            popupAdd.close()
        })
        .catch(err => console.log("Не удалось добавить карточку:", err))
        .finally(() => popupAdd.loader(false, 'add'))
}

function handleClickOpenAddPopup() {
    formAddValidator.resetValidation()
    popupAdd.open()
}

// Попап аватара
function handleClickOpenAvatarPopup() {
    formAvatarValidator.resetValidation()
    popupAvatar.open()
}

function handleAvatarFormSubmit(data) {
    popupAvatar.loader(true)
    api.editUserAvatar(data)
        .then((res) => {
            userInfo.setAvatar(res)
            popupAvatar.loader(false)
            popupAvatar.close()
        })
        .catch(err => console.log("Не удалось сменить аватар:", err))
        .finally(() => popupAvatar.loader(false))
}

// Валидация форм
formEditValidator.enableValidation()
formAddValidator.enableValidation()
formAvatarValidator.enableValidation()

// Отрисовать страницу со всеми данными с сервера
function renderPage() {
    Promise.all([userInfoServer, api.getInitialCards()])
        .then(res => {
            userInfo.setUserInfo(res[0])
            userInfo.setAvatar(res[0])
            cardsList.renderItems(res[1])
        })
        .catch(err => console.log("Не удалось загрузить страницу:", err))
}

renderPage()

// Обработка событий
POPUPS.EDIT.OPEN.addEventListener('click', handleClickOpenProfilePopup);
POPUPS.ADD.OPEN.addEventListener('click', handleClickOpenAddPopup)
POPUPS.AVATAR.OPEN_BUTTON.addEventListener('click', handleClickOpenAvatarPopup)