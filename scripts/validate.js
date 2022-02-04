enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});

function enableValidation(obj) {
    setEventListenersForm()

    // Функция показа ошибки
    function showError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(obj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(obj.errorClass);
    }

    // Функция скрывания ошибки
    function hideError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(obj.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(obj.errorClass);
    }

    // Проверка валидности формы
    function isValid(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            showError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideError(formElement, inputElement);
        }
    }

    // Добавить обработчик всем полям ввода
    function setEventListenersInput(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
        const buttonElement = formElement.querySelector(obj.submitButtonSelector);
        toggleButtonState(inputList, buttonElement);
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            })
        })
    }

    // Добавить обработчик всем формам
    function setEventListenersForm() {
        const formList = Array.from(document.querySelectorAll(obj.formSelector));
        formList.forEach(formElement => {
            formElement.addEventListener('submit', evt => {
                evt.preventDefault();
            });
            setEventListenersInput(formElement);
        })
    }

    // Проверка валидыции всех полей формы
    function hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    }

    // Изменение состояния кнопки
    function toggleButtonState(inputList, buttonElement) {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(obj.inactiveButtonClass);
        } else {
            buttonElement.classList.remove(obj.inactiveButtonClass);
        }
    }
}