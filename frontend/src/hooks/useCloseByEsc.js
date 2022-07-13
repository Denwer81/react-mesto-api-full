import React from "react";

function useCloseByEsc(isOpen, closePopup) {
  React.useEffect(() => {
    function handleEscapeKey(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      }
    }
  }, [isOpen, closePopup]);
}

export default useCloseByEsc;