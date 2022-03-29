const userInfoSelectors = {
    nameElementSelector: '.profile__name',
    aboutElementSelector: '.profile__about',
    avatarElementSelector: '.profile__avatar'
}

const FORMS = {
    EDIT: document.forms.edit,
    ADD: document.forms.add,
    AVATAR: document.forms.avatar
}

const POPUPS = {
    EDIT: {
        SELECTOR: '.popup_edit',
        OPEN: document.querySelector('.profile__edit-button'),
        NAME: document.querySelector('.popup__input_value_name'),
        ABOUT: document.querySelector('.popup__input_value_about'),
    },
    ADD: {
        SELECTOR: '.popup_add',
        OPEN: document.querySelector('.profile__add-button'),
    },
    IMAGE: {
        SELECTOR: '.popup_image',
    },
    DELETE: {
        SELECTOR: '.popup_delete',
        CONFIRM: document.querySelector('.delete-button')
    },
    AVATAR: {
        SELECTOR: '.popup_avatar',
        OPEN_BUTTON: document.querySelector('.profile__avatar-box')
    }
}

const CARD = {
    BOX_SELECTOR: '.elements',
    TEMPLATE_SELECTOR: '#card'
}

const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const optionsApi = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
    headers: {
        authorization: 'b287dd23-5596-4869-8607-85a6badb8cad',
        'Content-Type': 'application/json'
    }
}

const cardList = [];

export { POPUPS, CARD, FORMS, configForm, userInfoSelectors, optionsApi, cardList }