export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
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
    }

    _like(evt) {
        const isLike = evt.target.classList.contains('element__heart-icon_active')
        if (!isLike) {
            evt.target.classList.add('element__heart-icon_active')
            console.log('Лайк +');
        } else {
            evt.target.classList.remove('element__heart-icon_active')
            console.log('Лайк -');
        }
    }

    _delete() {
        this._element.remove()
    }

    generateCard() {
        this._element = this._getTemplate()
        this._setEventListeners()
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        return this._element
    }
}