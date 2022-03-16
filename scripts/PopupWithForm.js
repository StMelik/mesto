import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector)
        this._handleSubmitForm = handleSubmitForm;

        this._form = this._popup.querySelector('.popup__form')
    }

    _getInputValues() {
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        const data = {};
        inputList.forEach(item => {
            data[item.name] = item.value
        })
        return data
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._handleSubmitForm)
    }

    close() {
        super.close();
        this._form.reset()
    }
}