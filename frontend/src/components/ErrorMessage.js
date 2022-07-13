function ErrorMessage({ popupName, name, inputData }) {

  return (
    <span
      className='popup__error'
      id={`${popupName}-${name}-input-error`}>
      {inputData[`${popupName}-${name}`]}
    </span>
  )
}

export default ErrorMessage;