const userInfoSelectors = {
    nameElementSelector: '.profile__name',
    aboutElementSelector: '.profile__about'
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

const formValidators = {}

export { POPUPS, CARD, configForm, formValidators, userInfoSelectors }