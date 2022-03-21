export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete').addEventListener('click', () => this._delete())
        this._element.querySelector('.element__heart-icon').addEventListener('click', (evt) => this._like(evt))
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link })
        })
    }

    _like(evt) {
        evt.target.classList.toggle('element__heart-icon_active')
    }

    _delete() {
        this._element.remove()
    }

    generateCard() {
        this._element = this._getTemplate()
        this._cardImage = this._element.querySelector('.element__image')
        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners()
        return this._element
    }
}