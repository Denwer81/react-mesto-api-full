import ButtonClosePopup from "./ButtonClosePopup";
import closeByOverlay from "../utils/closeByOverlay";
import useCloseByEsc from "../hooks/useCloseByEsc";

function ImagePopup({ card, isOpen, closePopup }) {
  useCloseByEsc(isOpen, closePopup);

  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}
        onMouseDown={(evt) => closeByOverlay(evt, closePopup)}>
      <figure className="popup__figure">
        <img className="popup__image" src={card.link} alt={card.title} />
        <figcaption className="popup__image-text">{card.title}</figcaption>
        <ButtonClosePopup closePopup={closePopup} />
      </figure>
    </div>
  )
}

export default ImagePopup;