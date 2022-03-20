export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleClickClose = this._handleClickClose.bind(this)
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        const isKeyEscape = evt.key === 'Escape'
        if (isKeyEscape) {
            this.close()
        }
    }

    _handleClickClose(evt) {
        const isOverlay = evt.target.classList.contains('popup');
        const isButtonClose = evt.target.classList.contains('popup__close');
        if (isOverlay || isButtonClose) {
            this.close();
        }
    }

    _removeEventListeners() {
        this._popup.removeEventListener('mousedown', this._handleClickClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleClickClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners()
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners()
    }
}