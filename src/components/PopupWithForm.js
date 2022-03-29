import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector)
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form')
        this._submitForm = this._submitForm.bind(this)
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
        this._submitButton = this._popup.querySelector('.popup__submit')
    }

    _getInputValues() {
        const data = {};
        this._inputList.forEach(item => {
            data[item.name] = item.value
        })
        return data
    }

    _submitForm() {
        this._handleSubmitForm(this._getInputValues())
    }

    _removeEventListeners() {
        super._removeEventListeners()
        this._form.removeEventListener('submit', this._submitForm)
    }

    loader(isLoading, popup) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            if (popup === 'add') {
                this._submitButton.textContent = 'Создать'
            } else {
                this._submitButton.textContent = 'Сохранить'
            }
        }
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._submitForm)
    }

    close() {
        super.close();
        this._form.reset()
    }
}