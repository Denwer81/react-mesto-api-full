import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, closePopup, onSubmitForm, isLoading }) {
  const popupName = "delete-card";

  return (
    <PopupWithForm
      title="Вы уверены?"
      popupName={popupName}
      isOpen={isOpen}
      isLoading={isLoading}
      closePopup={closePopup}
      onSubmitForm={onSubmitForm}>
    </PopupWithForm>
  )
}

export default DeleteCardPopup;