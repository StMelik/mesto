export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // Показ ошибки
    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    // Скрыть ошибки
    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    // Проверка валидности формы
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }

    // Проверка валидности всех полей формы
    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    }

    // Изменение состояния кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disabledButton()
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    // Добавить обработчик всем полям ввода
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            })
        })
    }

    disabledButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true)
    }

    resetValidation() {
        this.disabledButton()
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement)
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._setEventListeners()
    }
}