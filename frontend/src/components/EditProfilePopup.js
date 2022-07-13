import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import ErrorMessage from "./ErrorMessage";

function EditProfilePopup({ isOpen, closePopup, onSubmitForm, isLoading, handleInputData, inputData }) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const currentUser = React.useContext(CurrentUserContext);
  const popupName = "edit-profile";

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.description);
  }, [currentUser, isOpen]);

  function handleInputUserName(evt) {
    setUserName(evt.target.value);
    handleInputData(evt);
  }

  function handleInputUserDescription(evt) {
    setUserDescription(evt.target.value);
    handleInputData(evt);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      popupName={popupName}
      isOpen={isOpen}
      closePopup={closePopup}
      isLoading={isLoading}
      onSubmitForm={() => onSubmitForm(userName, userDescription)}>
      <input
        className={`popup__input popup__input_${popupName}`}
        id={`${popupName}-userName-input`}
        type="text"
        name={`${popupName}-userName`}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={userName || ''}
        onChange={handleInputUserName} 
        required />
      <ErrorMessage popupName={popupName} inputData={inputData} name="userName" />
      <input
        className={`popup__input popup__input_${popupName}`}
        id={`${popupName}-userDescription-input`}
        type="text"
        name={`${popupName}-userDescription`}
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        value={userDescription || ''}
        onChange={handleInputUserDescription} 
        required />
      <ErrorMessage popupName={popupName} inputData={inputData} name="userDescription" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;