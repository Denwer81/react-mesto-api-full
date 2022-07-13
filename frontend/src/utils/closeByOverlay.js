function closeByOverlay(evt, closePopup) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

export default closeByOverlay;