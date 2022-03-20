import { initialCards } from "./cards.js"
import { PROFILE, FORMS, POPUPS, configForm, elements, formValidators } from '../utils/constants.js'
import Card from "./Card.js"
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";

import PopupWithForm from "./PopupWithForm.js";

import UserInfo from "./UserInfo.js";

const cardsList = new Section({
    items: initialCards,
    renderer: item => {
        return new Card(item, '#card', handleCardClick)
            .generateCard()
    }
}, '.elements')

function handleCardClick(data) {
    const popupImage = new PopupWithImage('.popup_image')
    popupImage.open(data)
}

function createCard(item) {
    return new Card(item, '#card', handleCardClick).generateCard()
}


const userInfoSelectors = {
    nameElementSelector: '.profile__name',
    aboutElementSelector: '.profile__about'
}

const userInfo = new UserInfo(userInfoSelectors)
const popupEdit = new PopupWithForm('.popup_edit', handleProfileFormSubmit)

function handleClickOpenProfilePopup() {
    const userData = userInfo.getUserInfo()
    POPUPS.EDIT.NAME.value = userData.name;
    POPUPS.EDIT.ABOUT.value = userData.about;
    popupEdit.open()
}

POPUPS.EDIT.OPEN.addEventListener('click', handleClickOpenProfilePopup);


function handleProfileFormSubmit(data) {
    console.log(data);

    userInfo.setUserInfo(data)

    popupEdit.close()
}

// function handleCardFormSubmit() {
//     const newCard = {
//         name: POPUPS.ADD.TITLE.value,
//         link: POPUPS.ADD.LINK.value
//     };
//     initialCards.push(newCard);
//     cardsList.addItem(createCard(newCard));
//     closePopup(POPUPS.ADD.POPUP);
//     FORMS.ADD.reset()
// }

// function enableValidation(config) {
//     const formList = Array.from(document.querySelectorAll(config.formSelector));
//     formList.forEach(formElement => {
//         const validator = new FormValidator(config, formElement);
//         const formName = formElement.getAttribute('name');
//         formValidators[formName] = validator;
//         validator.enableValidation()
//     })
// }

// Включить валидацию форм
// enableValidation(configForm)

// Обрботка событий попапа редактирования профиля
// POPUPS.EDIT.OPEN.addEventListener('click', () => {
//     setDataPopupEdit()
//     formValidators['edit'].resetValidation()
//     openPopup(POPUPS.EDIT.POPUP)
// });

// FORMS.EDIT.addEventListener('submit', handleProfileFormSubmit);





// Обрботка событий попапа добавления карточек
// POPUPS.ADD.OPEN.addEventListener('click', () => {
//     formValidators['add'].resetValidation()
//     openPopup(POPUPS.ADD.POPUP);
// });

// FORMS.ADD.addEventListener('submit', handleCardFormSubmit);





// Отобразить все карточки на странице
cardsList.renderItems()