import React from "react";
import PopupWithForm from "./PopupWithForm";
import ErrorMessage from "./ErrorMessage";

function ChangeAvatar({ isOpen, closePopup, onSubmitForm, isLoading, handleInputData, inputData }) {
  const popupName = "change-avatar";
  const inputAvatar = React.useRef();

  function handleSubmitForm() {
    onSubmitForm(inputAvatar.current.value);
  }

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputAvatar.current.value = '';
      }, 300)
    }
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      popupName={popupName}
      isOpen={isOpen}
      isLoading={isLoading}
      closePopup={closePopup}
      onSubmitForm={handleSubmitForm}>
      <input
        ref={inputAvatar}
        onChange={handleInputData}
        className={`popup__input popup__input_${popupName}`}
        id={`${popupName}-url-input`}
        type="url"
        name={`${popupName}-url`}
        placeholder="Обновить аватар"
        required />
      <ErrorMessage popupName={popupName} inputData={inputData} name="url" />
    </PopupWithForm>
  )
}

export default ChangeAvatar;