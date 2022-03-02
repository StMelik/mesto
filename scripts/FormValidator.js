export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    // Показ ошибки
    _showError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    // Скрыть ошибки
    _hideError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    // Проверка валидности формы
    _isValid(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideError(formElement, inputElement);
        }
    }

    // Проверка валидыции всех полей формы
    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    }

    // Изменение состояния кнопки
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    // Добавить обработчик всем полям ввода
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._setEventListeners(this._formElement)
    }
}
