import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector)
        this._handleSubmitForm = handleSubmitForm;

        this._form = this._popup.querySelector('.popup__form')

        this._submitForm = this._submitForm.bind(this)
    }

    _getInputValues() {
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        const data = {};
        inputList.forEach(item => {
            data[item.name] = item.value
        })
        return data
    }

    _submitForm() {
        const data = this._getInputValues()
        this._handleSubmitForm(data)
    }

    _removeEventListeners() {
        super._removeEventListeners()
        this._form.removeEventListener('submit', this._submitForm)
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