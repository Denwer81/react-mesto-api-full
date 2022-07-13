import React from 'react';
import ErrorMessage from './ErrorMessage';
import ButtonSubmitForm from './ButtonSubmitForm';

function AuthForm({ formName, title, onSubmitForm, handleInputData, inputData, isLoading }) {
  const email = React.useRef();
  const password = React.useRef();
  const form = React.useRef();
  const [isValid, setIsValid] = React.useState(false);

  function setValidityForm() {
    setIsValid(form.current.checkValidity());
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();
    onSubmitForm(email.current.value, password.current.value);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      <form
        ref={form}
        className={`auth__form auth__form_type_login`}
        name={`${formName}-form`}
        noValidate
        onInput={setValidityForm}
        onSubmit={handleSubmitForm}>
        <input
          ref={email}
          onChange={handleInputData}
          className={`auth__input auth__input_${formName}`}
          id={`${formName}-email`}
          type="email"
          name={`${formName}-email`}
          placeholder="Email"
          required />
        <ErrorMessage popupName={formName} inputData={inputData} name="email" />
        <input
          ref={password}
          onChange={handleInputData}
          className={`auth__input auth__input_${formName}`}
          id={`${formName}-password-input`}
          type="password"
          name={`${formName}-password`}
          placeholder="Пароль"
          minLength="3"
          maxLength="30"
          required />
        <ErrorMessage popupName={formName} inputData={inputData} name="password" />
        <ButtonSubmitForm
          type={'type_auth'}
          formName={formName}
          isValid={isValid}
          buttonText={formName === "register"
            ? isLoading ? "Регистрация..." : "Регистрация"
            : isLoading ? "Вход..." : "Войти"
            } />
      </form>
    </div>
  );
}

export default AuthForm;