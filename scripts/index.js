import { initialCards } from "./cards.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js";

// Профиль
const PROFILE = {
    NAME: document.querySelector('.profile__name'),
    ABOUT: document.querySelector('.profile__about'),
}

// Формы
const FORMS = {
    EDIT: document.forms.edit,
    ADD: document.forms.add,
}

// Попап редактирования профиля
const POPUP_EDIT = {
    NAME: FORMS.EDIT.elements.name,
    ABOUT: FORMS.EDIT.elements.about,
    SUBMIT_BTN: FORMS.EDIT.querySelector('.popup__submit'),
}

// Попап добавления карточки
const POPUP_ADD = {
    TITLE: FORMS.ADD.elements.title,
    LINK: FORMS.ADD.elements.link,
    SUBMIT_BTN: FORMS.ADD.querySelector('.popup__submit')
}

// Попап картинки
const POPUP_IMAGE = {
    IMAGE: document.querySelector('.popup__big-img'),
    CAPTION: document.querySelector('.popup__title-img'),
}

const configForm = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

// Включить валидацию формы редактирования профиля
new FormValidator(configForm, FORMS.EDIT).enableValidation()

// Включить валидацию формы добовления карточек
new FormValidator(configForm, FORMS.ADD).enableValidation()

const elements = document.querySelector('.elements');

// Отобразить все карточки на странице
initialCards.forEach(item => {
    const cardElement = new Card(item, '#card', '.popup_image').generateCard()
    elements.append(cardElement)
})


class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close')
    }

    _escClose(evt) {
        if (evt.key === 'Escape') this._close()
    }

    _overlayClose(evt) {
        if (evt.target === evt.currentTarget) this._close()
    }

    _open() {
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', (evt) => this._escClose(evt))
    }

    _close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', (evt) => this._escClose(evt))
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => this._overlayClose(evt))
        this._buttonClose.addEventListener('click', () => this._close())
    }
}

// Попап редактирования
class PopupEdit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._profileName = PROFILE.NAME;
        this._profileAbout = PROFILE.ABOUT;
        this._form = FORMS.EDIT;
        this._popupName = POPUP_EDIT.NAME;
        this._popupAbout = POPUP_EDIT.ABOUT;
        this._popupSubmitBtn = POPUP_EDIT.SUBMIT_BTN;
        this._popupOpenBtn = document.querySelector(`${popupSelector}-open-btn`);
    }

    _enabledButton() {
        this._popupSubmitBtn.classList.remove('popup__submit_inactive')
        this._popupSubmitBtn.removeAttribute('disabled')
    }

    _removeClassError() {
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        const errorList = Array.from(this._form.querySelectorAll('.popup__input-error'));
        for (let i = 0; i < inputList.length; i++) {
            inputList[i].classList.remove('popup__input_type_error');
            errorList[i].classList.remove('popup__input-error_active');
        }
    }

    _open() {
        this._popupName.value = this._profileName.textContent
        this._popupAbout.value = this._profileAbout.textContent
        this._enabledButton()
        this._removeClassError()
        super._open()
    }

    _submit() {
        this._profileName.textContent = this._popupName.value;
        this._profileAbout.textContent = this._popupAbout.value;
        this._close()
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', () => this._submit())
        this._popupOpenBtn.addEventListener('click', () => this._open())
    }
}

// Попап добавления карточки
class PopupAdd extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._form = FORMS.ADD;
        this._popupName = POPUP_ADD.TITLE;
        this._popupLink = POPUP_ADD.LINK;
        this._popupSubmitBtn = POPUP_ADD.SUBMIT_BTN;
        this._listCard = elements;
        this._popupOpenBtn = document.querySelector(`${popupSelector}-open-btn`);
    }

    _disabledButton() {
        this._popupSubmitBtn.classList.add('popup__submit_inactive');
        this._popupSubmitBtn.setAttribute('disabled', 'true')
    }

    _submit() {
        const newCard = {
            name: this._popupName.value,
            link: this._popupLink.value,
        }
        initialCards.unshift(newCard);
        const cardElement = new Card(newCard, '#card').generateCard();
        this._listCard.prepend(cardElement);
        this._close();
        this._form.reset();
        this._disabledButton();
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', () => this._submit())
        this._popupOpenBtn.addEventListener('click', () => this._open())
    }
}

// Попап картинки
class PopupImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._bigIMG = POPUP_IMAGE.IMAGE;
        this._caption = POPUP_IMAGE.CAPTION;
    }

    _open(img) {
        super._open();
        this._bigIMG.src = img.src;
        this._bigIMG.alt = img.alt;
        this._caption.textContent = img.alt;
    }

    setEventListeners() {
        super.setEventListeners()
        elements.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('element__image')) {
                this._open(evt.target)
            }
        })
    }
}

// Добавить обработчики событий попапам
new PopupEdit('.popup_edit').setEventListeners();
new PopupAdd('.popup_add').setEventListeners();
new PopupImage('.popup_image').setEventListeners();