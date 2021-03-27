const validateField = (fieldName, value) => {
  let fieldValidationErrors = {email: '', password: '', username: ''};
  let emailValid = false;
  let passwordValid = false;

  switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : 'Not a valid email';
      break;
    case 'password':
      passwordValid = value.length >= 8;
      fieldValidationErrors.password = passwordValid ? '': 'Password must be at least 8 characters';
      break;
    default:
      break;
  }
  return fieldValidationErrors[fieldName];
}

export default validateField;