(()=>{"use strict";var e={937:(e,t,n)=>{e.exports=n.p+"images/logo.svg"},41:(e,t,n)=>{e.exports=n.p+"images/no-avatar.png"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={EDIT:document.forms.edit,ADD:document.forms.add,AVATAR:document.forms.avatar},t={EDIT:{SELECTOR:".popup_edit",OPEN:document.querySelector(".profile__edit-button"),NAME:document.querySelector(".popup__input_value_name"),ABOUT:document.querySelector(".popup__input_value_about")},ADD:{SELECTOR:".popup_add",OPEN:document.querySelector(".profile__add-button")},IMAGE:{SELECTOR:".popup_image"},DELETE:{SELECTOR:".popup_delete",CONFIRM:document.querySelector(".delete-button")},AVATAR:{SELECTOR:".popup_avatar",OPEN_BUTTON:document.querySelector(".profile__avatar-box")}},r={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},o=[];function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n,r,o){var i=o.handleCardClick,a=o.handleDeleteClick,u=o.handleAddLikeCard,c=o.handleDeleteLikeCard;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._cardSelector=n,this._handleCardClick=i,this._handleDeleteClick=a,this._handleAddLikeCard=u,this._handleDeleteLikeCard=c,this._likeList=t.likes,this._cardId=t._id,this._creatorId=t.owner._id,this._userInfo=r}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._deleteButton.addEventListener("click",(function(){return e._handleDeleteClick(e._cardId)})),this._likeButton.addEventListener("click",(function(t){return e._like(t)})),this._cardImage.addEventListener("click",(function(){e._handleCardClick({name:e._name,link:e._link})}))}},{key:"_like",value:function(e){e.target.classList.contains("element__heart-icon_active")?(e.target.classList.remove("element__heart-icon_active"),this._likeCount.textContent=Number(this._likeCount.textContent)-1,this._handleDeleteLikeCard(this._cardId)):(e.target.classList.add("element__heart-icon_active"),this._likeCount.textContent=Number(this._likeCount.textContent)+1,this._handleAddLikeCard(this._cardId))}},{key:"_checkLikes",value:function(){var e=this;this._userInfo.then((function(t){e._likeList.forEach((function(n){n._id===t._id&&e._likeButton.classList.add("element__heart-icon_active")}))}))}},{key:"_hideDeleteButton",value:function(){var e=this;this._userInfo.then((function(t){t._id!==e._creatorId&&e._deleteButton.remove()}))}},{key:"deleteCard",value:function(){this._delete(this._element)}},{key:"_delete",value:function(e){e.remove(),e=null}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".element__image"),this._likeButton=this._element.querySelector(".element__heart-icon"),this._deleteButton=this._element.querySelector(".element__delete"),this._likeCount=this._element.querySelector(".element__heart-value"),this._element.querySelector(".element__title").textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._likeCount.textContent=this._likeList.length,this._checkLikes(),this._hideDeleteButton(),this._setEventListeners(),this._element}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"_showError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}},{key:"_isValid",value:function(e){e.validity.valid?this._hideError(e):this._showError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disabledButton():(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))}))}},{key:"disabledButton",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)}},{key:"resetValidation",value:function(){var e=this;this.disabledButton(),this._inputList.forEach((function(t){e._hideError(t)}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._container=document.querySelector(n),this._renderer=o,this._items=r}var t,n;return t=e,n=[{key:"renderItems",value:function(){var e=this;this._items.then((function(t){return t.forEach((function(t){e.addItem(e._renderer(t))}))}))}},{key:"addItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"append";switch(t){case"append":this._container.append(e);break;case"prepend":this._container.prepend(e)}}}],n&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleClickClose=this._handleClickClose.bind(this),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleClickClose",value:function(e){var t=e.target.classList.contains("popup"),n=e.target.classList.contains("popup__close");(t||n)&&this.close()}},{key:"_removeEventListeners",value:function(){this._popup.removeEventListener("mousedown",this._handleClickClose),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._popup.addEventListener("mousedown",this._handleClickClose),document.addEventListener("keydown",this._handleEscClose)}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),this.setEventListeners()}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),this._removeEventListeners()}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},_.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}function v(e,t){return v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},v(e,t)}function m(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(o){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return m(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__big-img"),t._popupTitle=t._popup.querySelector(".popup__title-img"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;this._popupImage.src=n,this._popupImage.alt=t,this._popupTitle.textContent=t,_(b(a.prototype),"open",this).call(this)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},g.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=T(e)););return e}function O(e,t){return O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},O(e,t)}function S(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return L(e)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T(e){return T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},T(e)}var P=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=T(r);if(o){var n=T(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleSubmitForm=t,n._form=n._popup.querySelector(".popup__form"),n._submitForm=n._submitForm.bind(L(n)),n._inputList=Array.from(n._form.querySelectorAll(".popup__input")),n._submitButton=n._popup.querySelector(".popup__submit"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"_submitForm",value:function(){this._handleSubmitForm(this._getInputValues())}},{key:"_removeEventListeners",value:function(){g(T(a.prototype),"_removeEventListeners",this).call(this),this._form.removeEventListener("submit",this._submitForm)}},{key:"loader",value:function(e,t){this._submitButton.textContent=e?"Сохранение...":"add"===t?"Создать":"Сохранить"}},{key:"setEventListeners",value:function(){g(T(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._submitForm)}},{key:"close",value:function(){g(T(a.prototype),"close",this).call(this),this._form.reset()}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(){return A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=R(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},A.apply(this,arguments)}function R(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function B(e,t){return B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},B(e,t)}function D(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return x(e)}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var U=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&B(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return D(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleConfirmPopup=t,n._confirmButton=n._popup.querySelector(".popup__submit"),n._confirm=n._confirm.bind(x(n)),n}return t=a,(n=[{key:"_confirm",value:function(){this._handleConfirmPopup(this._cardId)}},{key:"_removeEventListeners",value:function(){A(q(a.prototype),"_removeEventListeners",this).call(this),this._confirmButton.removeEventListener("click",this._confirm)}},{key:"setEventListeners",value:function(){A(q(a.prototype),"setEventListeners",this).call(this),this._confirmButton.addEventListener("click",this._confirm)}},{key:"open",value:function(e){A(q(a.prototype),"open",this).call(this),this._cardId=e}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=function(){function e(t){var n=t.nameElementSelector,r=t.aboutElementSelector,o=t.avatarElementSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._aboutElement=document.querySelector(r),this._avatarElement=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._nameElement.textContent=t,this._aboutElement.textContent=n}},{key:"setAvatar",value:function(e){var t=e.avatar;this._avatarElement.src=t}}])&&N(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function F(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var M=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_fetch",value:function(e,t,n){var r=this._baseUrl+e;return fetch(r,{method:t,headers:this._headers,body:n?n():null}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"getUserInfo",value:function(){return this._fetch("users/me","GET")}},{key:"getInitialCards",value:function(){return this._fetch("cards","GET")}},{key:"editUserInfo",value:function(e){var t=e.name,n=e.about;return this._fetch("users/me","PATCH",(function(){return JSON.stringify({name:t,about:n})}))}},{key:"addCard",value:function(e){var t=e.name,n=e.link;return this._fetch("cards","POST",(function(){return JSON.stringify({name:t,link:n})}))}},{key:"deleteCard",value:function(e){return this._fetch("cards/".concat(e),"DELETE")}},{key:"addLikeCard",value:function(e){return this._fetch("cards/".concat(e,"/likes"),"PUT")}},{key:"deleteLikeCard",value:function(e){return this._fetch("cards/".concat(e,"/likes"),"DELETE")}},{key:"editUserAvatar",value:function(e){var t=e.avatar;return this._fetch("users/me/avatar","PATCH",(function(){return JSON.stringify({avatar:t})}))}}])&&F(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),G=(n(41),n(937),new c(r,e.EDIT)),J=new c(r,e.ADD),$=new c(r,e.AVATAR),H=new E(t.IMAGE.SELECTOR),z=new P(t.EDIT.SELECTOR,(function(e){z.loader(!0),Y.editUserInfo(e).then((function(e){X.setUserInfo(e),z.loader(!1),z.close()}))})),K=new P(t.ADD.SELECTOR,(function(e){K.loader(!0),Y.addCard(e).then((function(e){Z.addItem(te(e),"prepend"),K.loader(!1,"add"),K.close()}))})),Q=new U(t.DELETE.SELECTOR,(function(e){Y.deleteCard(e),o.find((function(t){return t.cardId===e})).cardElement.deleteCard(),Q.close()})),W=new P(t.AVATAR.SELECTOR,(function(e){W.loader(!0),Y.editUserAvatar(e).then((function(e){X.setAvatar(e),W.loader(!1),W.close()}))})),X=new V({nameElementSelector:".profile__name",aboutElementSelector:".profile__about",avatarElementSelector:".profile__avatar"}),Y=new M({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-39/",headers:{authorization:"b287dd23-5596-4869-8607-85a6badb8cad","Content-Type":"application/json"}}),Z=new s({items:Y.getInitialCards(),renderer:te},".elements"),ee=Y.getUserInfo();function te(e){var t=new a(e,"#card",ee,{handleCardClick:ie,handleDeleteClick:ne,handleAddLikeCard:re,handleDeleteLikeCard:oe});return o.push({cardElement:t,cardId:e._id}),t.generateCard()}function ne(e){Q.open(e)}function re(e){var t=this;Y.addLikeCard(e).then((function(e){t._likeCount.textContent=e.likes.length}))}function oe(e){var t=this;Y.deleteLikeCard(e).then((function(e){t._likeCount.textContent=e.likes.length}))}function ie(e){H.open(e)}G.enableValidation(),J.enableValidation(),$.enableValidation(),ee.then((function(e){X.setUserInfo(e),X.setAvatar(e)})),Z.renderItems(),t.EDIT.OPEN.addEventListener("click",(function(){var e=X.getUserInfo();t.EDIT.NAME.value=e.name,t.EDIT.ABOUT.value=e.about,G.resetValidation(),z.open()})),t.ADD.OPEN.addEventListener("click",(function(){J.resetValidation(),K.open()})),t.AVATAR.OPEN_BUTTON.addEventListener("click",(function(){$.resetValidation(),W.open()}))})()})();