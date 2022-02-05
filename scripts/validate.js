// Функция показа ошибки
function showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

// Функция скрывания ошибки
function hideError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
}

// Проверка валидности формы
function isValid(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

// Проверка валидыции всех полей формы
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid
    })
}

// Изменение состояния кнопки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

// Добавить обработчик всем полям ввода
function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        })
    })
}

// Добавить обработчик всем формам
function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        setEventListeners(formElement, obj.inputSelector, obj.submitButtonSelector, obj.inactiveButtonClass, obj.inputErrorClass, obj.errorClass);
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
})