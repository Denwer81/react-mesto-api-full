import React from 'react';
import ButtonSubmitForm from './ButtonSubmitForm';
import ButtonClosePopup from "./ButtonClosePopup";
import useCloseByEsc from '../hooks/useCloseByEsc';
import closeByOverlay from '../utils/closeByOverlay';

function PopupWithForm({ title, popupName, children, isOpen, closePopup, onSubmitForm, isLoading }) {
  const form = React.useRef();
  const [isValid, setIsValid] = React.useState(false);

  function setValidityForm() {
    setIsValid(form.current.checkValidity());
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();
    onSubmitForm();
    setTimeout(() => {
      setIsValid(false);
    }, 300);
  }
  
  useCloseByEsc(isOpen, closePopup);

  return (
    <div className={`popup popup_type_${popupName} ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={(evt) => closeByOverlay(evt, closePopup)} >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          ref={form}
          className={`popup__form popup__form_type_${popupName}`}
          name={`${popupName}-form`}
          noValidate
          onInput={setValidityForm}
          onSubmit={handleSubmitForm}>
          {children}
          <ButtonSubmitForm
            popupName={popupName}
            isValid={isValid}
            buttonText={popupName !== "delete-card"
              ? isLoading ? "Сохранение..." : "Сохранить"
              : isLoading ? "Удаление..." : "Да"} />
        </form>
        <ButtonClosePopup closePopup={closePopup} />
      </div>
    </div>
  );
}

export default PopupWithForm;