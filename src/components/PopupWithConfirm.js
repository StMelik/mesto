import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleConfirmPopup) {
        super(popupSelector)
        this._handleConfirmPopup = handleConfirmPopup;
        this._confirmButton = this._popup.querySelector('.popup__submit')
        this._confirm = this._confirm.bind(this)
    }

    _confirm() {
        this._handleConfirmPopup(this._cardId)
    }

    _removeEventListeners() {
        super._removeEventListeners()
        this._confirmButton.removeEventListener('click', this._confirm)
    }

    setEventListeners() {
        super.setEventListeners()
        this._confirmButton.addEventListener('click', this._confirm)
    }

    open(cardId) {
        super.open()
        this._cardId = cardId
    }
}