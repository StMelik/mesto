export default class Card {
    constructor(data, cardSelector, userInfo, { handleCardClick, handleDeleteClick, likeCard, dislikeCard }) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._likeCard = likeCard;
        this._dislikeCard = dislikeCard;
        this._likeList = data.likes;
        this._cardId = data._id;
        this._creatorId = data.owner._id
        this._userInfo = userInfo
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
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._cardId))

        this._likeButton.addEventListener('click', (evt) => this._like(evt))

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link })
        })
    }

    _like(evt) {
        const hasLike = evt.target.classList.contains('element__heart-icon_active')
        if (!hasLike) {
            this._likeCard(this._cardId)
                .then(res => {
                    this._likeCount.textContent = res.likes.length
                    evt.target.classList.add('element__heart-icon_active')
                })
                .catch(err => console.log("Не удалось поставить лайк:", err))
        } else {
            this._dislikeCard(this._cardId)
                .then(res => {
                    this._likeCount.textContent = res.likes.length
                    evt.target.classList.remove('element__heart-icon_active')
                })
                .catch(err => console.log("Не удалось удалить лайк:", err))
        }
    }

    _checkLikes() {
        this._userInfo.then(res => {
            this._likeList.forEach(item => {
                if (item._id === res._id) {
                    this._likeButton.classList.add('element__heart-icon_active')
                }
            })
        })
    }

    _hideDeleteButton() {
        this._userInfo.then(res => {
            if (res._id !== this._creatorId) {
                this._deleteButton.remove()
            }
        })
    }

    deleteCard() {
        this._delete(this._element)
    }

    _delete(elem) {
        elem.remove()
        elem = null
    }

    generateCard() {
        this._element = this._getTemplate()
        this._cardImage = this._element.querySelector('.element__image')
        this._likeButton = this._element.querySelector('.element__heart-icon');
        this._deleteButton = this._element.querySelector('.element__delete');
        this._likeCount = this._element.querySelector('.element__heart-value')
        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeCount.textContent = this._likeList.length
        this._checkLikes()

        this._hideDeleteButton()

        this._setEventListeners()
        return this._element
    }
}