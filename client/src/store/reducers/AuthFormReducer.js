import { FORM_ERROR, INPUT_STATE, MODAL } from "../types"

export const formState = {
  email: '',
  password: '',
  username: '',
  errors: [],
  modal: 'closed',
  button: true
}

export const formReducer = (state, action) => {
  switch(action.type) {
    case INPUT_STATE:
      return {...state, [action.payload.key]: action.payload.value}
    case FORM_ERROR:
      return {...state, errors: action.payload }
    case MODAL:
      return {...state, modal: action.payload, email: '', password: '', username: '', errors: []}
    default:
      return state
  }
}