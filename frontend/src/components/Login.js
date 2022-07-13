import AuthForm from "./AuthForm";

function Login({ onSubmitForm, handleInputData, inputData, isLoading }) {

  return (
    <AuthForm
      formName="login"
      title="Вход"
      handleInputData={handleInputData}
      inputData={inputData}
      onSubmitForm={onSubmitForm}
      isLoading={isLoading} />
  );
}

export default Login;