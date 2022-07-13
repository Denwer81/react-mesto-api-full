import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

function Register({ onSubmitForm, handleInputData, inputData, isLoading}) {

  return (
    <>
      <AuthForm
        formName="register"
        title="Регистрация"
        handleInputData={handleInputData}
        inputData={inputData}
        onSubmitForm={onSubmitForm}
        isLoading={isLoading} />
      <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </>
  );
}

export default Register;