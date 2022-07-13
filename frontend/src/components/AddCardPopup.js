import React from "react";
import PopupWithForm from "./PopupWithForm";
import ErrorMessage from "./ErrorMessage";

function AddCardPopup({ isOpen, closePopup, onSubmitForm, isLoading, handleInputData, inputData }) {
  const popupName = "add-card";
  const inputPlace = React.useRef();
  const inputUrl = React.useRef();

  function handleSubmitForm() {
    onSubmitForm(inputPlace.current.value, inputUrl.current.value);
  }

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputPlace.current.value = '';
        inputUrl.current.value = '';
      }, 300);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое Место"
      popupName={popupName}
      isOpen={isOpen}
      isLoading={isLoading}
      closePopup={closePopup}
      onSubmitForm={handleSubmitForm}>
      <input
        ref={inputPlace}
        onChange={handleInputData}
        className={`popup__input popup__input_${popupName}`}
        id={`${popupName}-place-input`}
        type="text"
        name={`${popupName}-place`}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required />
      <ErrorMessage popupName={popupName} inputData={inputData} name="place" />
      <input
        ref={inputUrl}
        onChange={handleInputData}
        className={`popup__input popup__input_${popupName}`}
        id={`${popupName}-url-input`}
        type="url"
        name={`${popupName}-url`}
        placeholder="Ссылка на картинку"
        required />
      <ErrorMessage popupName={popupName} inputData={inputData} name="url" />
    </PopupWithForm>
  )
}

export default AddCardPopup;