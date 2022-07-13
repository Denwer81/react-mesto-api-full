function ButtonSubmitForm({ type, popupName, buttonText, isValid }) {
  return (
    <button
      className={`submit-btn submit-btn_${type} ${popupName === "delete-card"
        ? '' : !isValid ? 'submit-btn_disabled' : ''}`}
      type="submit"
      aria-label={`${popupName}_button`}
      disabled={popupName === "delete-card" ? false : isValid ? false : true}>
      {buttonText}
    </button>
  );
}

export default ButtonSubmitForm;