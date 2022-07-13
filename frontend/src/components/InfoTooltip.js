import ButtonClosePopup from "./ButtonClosePopup";
import closeByOverlay from "../utils/closeByOverlay";
import useCloseByEsc from "../hooks/useCloseByEsc";

function InfoTooltip({ isOpen, closePopup, errorMessage, isResponseOk }) {
  useCloseByEsc(isOpen, closePopup);

  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={(evt) => closeByOverlay(evt, closePopup)} >
      <div className="popup__container">
        <div className={`popup__icon ${isResponseOk ? 'popup__icon_type_ok' : 'popup__icon_type_not'}`}></div>
        <h2 className="popup__message">
          {isResponseOk ? 'Вы успешно зарегистрировались!' : errorMessage}
        </h2>
        <ButtonClosePopup closePopup={closePopup} />
      </div>
    </div>
  )
}

export default InfoTooltip;