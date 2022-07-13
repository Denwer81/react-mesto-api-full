function ButtonClosePopup({ closePopup }) {
  return (
    <button
      className="popup__closed-btn"
      type="button"
      aria-label="закрыть popup"
      onClick={closePopup}>
    </button>
  );
}

export default ButtonClosePopup;